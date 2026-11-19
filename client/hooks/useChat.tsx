"use client";

import { useEffect, useRef, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { API_URL } from "@/lib/api-url";

export type ChatMessage = { role: "user" | "assistant"; text: string };

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const sessionId = useRef<string>(undefined);
  const request = useRef<AbortController | null>(null);

  useEffect(() => () => request.current?.abort(), []);

  const editLast = (edit: (text: string) => string) =>
    setMessages((old) =>
      old.map((m, i) => (i === old.length - 1 ? { ...m, text: edit(m.text) } : m)),
    );

  async function send(question: string) {
    if (request.current) return;

    const controller = new AbortController();
    request.current = controller;
    setLoading(true);
    setMessages((old) => [
      ...old,
      { role: "user", text: question },
      { role: "assistant", text: "" },
    ]);

    let finished = false;
    try {
      await fetchEventSource(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, sessionId: sessionId.current }),
        signal: controller.signal,
        openWhenHidden: true,
        onmessage({ event, data }) {
          if (controller.signal.aborted) return;
          if (event === "session") sessionId.current = JSON.parse(data).sessionId;
          if (event === "text") editLast((text) => text + JSON.parse(data).text);
          if (event === "error") editLast((text) => text + JSON.parse(data).message);
          if (event === "error" || event === "done") finished = true;
        },
        onclose() {
          if (!finished) throw new Error("Stream ended early.");
        },
        onerror(error) {
          throw error;
        },
      });
    } catch {
      if (!controller.signal.aborted)
        editLast((text) => `${text}\n\nConnection failed. Please try again.`);
    } finally {
      if (request.current === controller) {
        request.current = null;
        setLoading(false);
      }
    }
  }

  function stop() {
    request.current?.abort();
    editLast((text) => text || "Response stopped.");
  }

  return { messages, loading, send, stop };
}
