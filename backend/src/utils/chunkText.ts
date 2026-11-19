import type { MessageContent } from "@langchain/core/messages";

export function chunkText(content: MessageContent): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";

  return content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("");
}
