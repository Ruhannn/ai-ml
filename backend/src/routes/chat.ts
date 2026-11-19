import { AIMessageChunk } from "@langchain/core/messages";
import { createSession } from "better-sse";
import { randomUUID } from "node:crypto";
import { Router } from "express";
import { z } from "zod";
import { chunkText } from "../utils/chunkText";
import { ANSWER_NODE, graph } from "../llm/graph";

const chatBody = z.object({
  question: z.string().min(1),
  sessionId: z.string().optional(),
});

export const chatRouter = Router();

chatRouter.post("/", async (req, res) => {
  const parsed = chatBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: z.treeifyError(parsed.error) });
  }

  const { question, sessionId = randomUUID() } = parsed.data;

  const abort = new AbortController();
  const session = await createSession(req, res);


  session.once("disconnected", () => abort.abort());

  try {
    session.push({ sessionId }, "session");

    const stream = await graph.stream(
      { question },
      {
        configurable: { thread_id: sessionId },
        streamMode: "messages",
        signal: abort.signal,
      },
    );

    for await (const [message, metadata] of stream) {
      if (metadata.langgraph_node !== ANSWER_NODE || !AIMessageChunk.isInstance(message)) continue;

      const text = chunkText(message.content);
      if (text) session.push({ text }, "token");
    }

    if (!abort.signal.aborted) session.push({}, "done");
  } catch (e) {
    if (!abort.signal.aborted) {
      console.error(e);
      session.push({ message: "Failed to generate answer" }, "error");
    }
  } finally {
    if (!res.writableEnded && !res.destroyed) res.end();
  }
});
