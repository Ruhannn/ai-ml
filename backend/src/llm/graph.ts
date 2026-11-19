import {
  END,
  MemorySaver,
  MessagesValue,
  START,
  StateGraph,
  StateSchema,
} from "@langchain/langgraph";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { z } from "zod";
import { webSearch } from "./tools";
import { llm } from "./model";
import { chunkText } from "../utils/chunkText";
import { SUPPORT_PROMPT } from "./prompts/chat";
import { vectorDB } from "../lib/vectorDB";
import { config } from "../config";

export const ANSWER_NODE = "generateAnswer" as const;

const State = new StateSchema({
  messages: MessagesValue,
  question: z.string(),
  context: z.string().default(""),
  source: z.string().default(""),
});

type S = typeof State.State;

async function searchDb({ question }: S) {
  const results = await vectorDB.similaritySearchWithScore(question, 5);

  const context = results
    .filter(([doc]) => doc.metadata._distance < config.LLM.MAX_DISTANCE)
    .map(([doc]) => doc.pageContent)
    .join("\n---\n");

  return { context };
}

async function searchWeb({ question }: S) {
  const results = await webSearch.invoke({ query: question });
  return { context: JSON.stringify(results), source: "web search" };
}

async function generateAnswer(state: S) {
  const messages = await SUPPORT_PROMPT.formatMessages({
    source: state.source,
    context: state.context || "No relevant context was found.",
    history: state.messages.slice(-config.LLM.MAX_HISTORY_MESSAGES),
    question: state.question,
  });

  const answer = chunkText((await llm.invoke(messages)).content);

  return {
    messages: [new HumanMessage(state.question), new AIMessage(answer)],
  };
}

export const graph = new StateGraph(State)
  .addNode("searchDb", searchDb)
  .addNode("searchWeb", searchWeb)
  .addNode(ANSWER_NODE, generateAnswer)
  .addEdge(START, "searchDb")
  .addConditionalEdges("searchDb", (state: S) => (state.context ? ANSWER_NODE : "searchWeb"))
  .addEdge("searchWeb", ANSWER_NODE)
  .addEdge(ANSWER_NODE, END)
  .compile({ checkpointer: new MemorySaver() });
