"use client";

import { useState } from "react";
import { useStickToBottom } from "use-stick-to-bottom";
import { ChatMarkdown } from "@/components/chat-markdown";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useChat, type ChatMessage } from "@/hooks/useChat";

export function Chat() {
  const { messages, loading, send, stop } = useChat();
  const [question, setQuestion] = useState("");
  const { scrollRef, contentRef, scrollToBottom } = useStickToBottom();

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = question.trim();
    if (!text || loading) return;
    setQuestion("");
    send(text);
    scrollToBottom();
  }

  return (
    <div className="flex h-[calc(100dvh-4.5rem)] flex-col overflow-hidden bg-background text-foreground">
      <main className="flex min-h-0 flex-1 flex-col">
        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 sm:px-8"
        >
          <div ref={contentRef} className="mx-auto flex min-h-full max-w-3xl flex-col">
            {messages.length === 0 ? (
              <h2 className="my-auto py-12 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Ask about a car.
              </h2>
            ) : (
              <>
                <section className="space-y-10 py-8">
                  {messages.map((message, i) => (
                    <Message
                      key={i}
                      message={message}
                      streaming={loading && i === messages.length - 1}
                    />
                  ))}
                </section>
              </>
            )}
          </div>
        </div>

        <footer className="shrink-0 border-t px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-8 sm:pb-6">
          <form onSubmit={onSubmit} className="mx-auto max-w-3xl">
            <Card className="gap-0 overflow-hidden rounded-[1.5rem] py-0 shadow-sm focus-within:ring-2 focus-within:ring-ring/25">
              <Textarea
                aria-label="Your message"
                placeholder="Ask about a car…"
                rows={2}
                value={question}
                disabled={loading}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    e.currentTarget.form?.requestSubmit();
                  }
                }}
                className="max-h-40 min-h-20 rounded-[1.5rem] border-0 bg-transparent px-5 py-4 text-base shadow-none focus-visible:ring-0 dark:bg-transparent"
              />
              <div className="flex items-center justify-between px-5 pb-4">
                <span className="text-sm text-muted-foreground">Enter to send</span>
                {loading ? (
                  <Button type="button" variant="outline" onClick={stop}>
                    Stop
                  </Button>
                ) : (
                  <Button type="submit" disabled={!question.trim()}>
                    Send
                  </Button>
                )}
              </div>
            </Card>
          </form>
        </footer>
      </main>
    </div>
  );
}

function Message({ message, streaming }: { message: ChatMessage; streaming: boolean }) {
  const isUser = message.role === "user";

  return (
    <article className={isUser ? "ml-auto flex max-w-[88%] flex-col items-end" : ""}>
      <p className="mb-2 text-sm font-semibold text-muted-foreground">
        {isUser ? "You" : "Nubcar"}
      </p>

      {isUser ? (
        <p className="max-w-full whitespace-pre-wrap wrap-anywhere rounded-[1.5rem] rounded-br-[0.5rem] bg-primary px-5 py-3.5 leading-relaxed text-primary-foreground shadow-md shadow-primary/15">
          {message.text}
        </p>
      ) : (
        <div className="w-fit max-w-full rounded-[1.5rem] rounded-bl-[0.5rem] border border-border/50 bg-card px-5 py-4 text-card-foreground shadow-sm shadow-foreground/5 sm:px-6 [&_.prose>:first-child]:mt-0 [&_.prose>:last-child]:mb-0">
          {message.text ? (
            <ChatMarkdown text={message.text} streaming={streaming} />
          ) : (
            <p role="status" className="text-muted-foreground">
              Thinking
              <span className="thinking-dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            </p>
          )}
        </div>
      )}
    </article>
  );
}
