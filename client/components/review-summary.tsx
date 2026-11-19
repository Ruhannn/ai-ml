"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/api-url";

async function fetchSummary(carId: string): Promise<string> {
  const res = await fetch(`${API_URL}/cars/${encodeURIComponent(carId)}/summary`);
  if (!res.ok) throw new Error("Couldn’t create the AI summary. Try again.");
  const data: { summary: string } = await res.json();
  return data.summary;
}

export function ReviewSummary({ carId, reviewCount }: { carId: string; reviewCount: number }) {
  const { mutate, data, error, isIdle, isPending, isError } = useMutation({
    mutationFn: () => fetchSummary(carId),
  });

  return (
    <aside className="lg:sticky lg:top-24">
      <h3 className="text-xl font-semibold tracking-tight">Review summary</h3>

      <Button
        size="lg"
        className="mt-4"
        onClick={() => mutate()}
        disabled={!reviewCount || isPending}
      >
        {isPending
          ? "Creating AI summary…"
          : isError
            ? "Try again"
            : data
              ? "Create new summary"
              : "Create AI summary"}
      </Button>

      <div aria-live="polite" className="mt-5 min-h-28 border-t pt-4 text-muted-foreground">
        {isIdle && <p>{reviewCount ? "No summary yet." : "No owner reviews to summarize."}</p>}
        {isPending && (
          <div role="status" aria-label="Summarizing owner reviews" className="space-y-3 py-2">
            <div className="h-3 w-full animate-pulse rounded bg-primary/15 motion-reduce:animate-none" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-primary/15 motion-reduce:animate-none" />
            <div className="h-3 w-3/5 animate-pulse rounded bg-primary/15 motion-reduce:animate-none" />
          </div>
        )}
        {isError && <p role="alert">{error.message}</p>}
        {data && (
          <blockquote className="whitespace-pre-wrap rounded-lg border border-primary/20 bg-primary/5 p-4 font-serif text-lg font-semibold italic text-foreground">
            {data}
          </blockquote>
        )}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">Read the full reviews for context.</p>
    </aside>
  );
}
