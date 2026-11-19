import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Element, Root, Text } from "hast";

const PROSE =
  "prose prose-base min-w-0 max-w-none wrap-anywhere dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-7 prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground prose-a:text-primary prose-a:underline-offset-4 prose-code:text-foreground prose-code:wrap-anywhere prose-code:before:content-none prose-code:after:content-none prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:bg-muted prose-pre:text-foreground prose-blockquote:text-muted-foreground";

function wrapWords(parent: Root | Element) {
  for (let index = 0; index < parent.children.length; index++) {
    const child = parent.children[index];
    if (child.type === "element") {
      wrapWords(child);
    } else if (child.type === "text" && child.value.trim()) {
      const parts: (Text | Element)[] = child.value.split(/(\s+)/).filter(Boolean).map((part) =>
        part.trim()
          ? { type: "element", tagName: "span", properties: { className: ["motion-safe:animate-[token-reveal_160ms_cubic-bezier(0.23,1,0.32,1)_both]"] }, children: [{ type: "text", value: part }] }
          : { type: "text", value: part },
      );
      parent.children.splice(index, 1, ...parts);
      index += parts.length - 1;
    }
  }
}

function rehypeTokenReveal() {
  return (tree: Root) => wrapWords(tree);
}

export function ChatMarkdown({ text, streaming }: { text: string; streaming: boolean }) {
  return (
    <div className={PROSE} aria-live={streaming ? "off" : undefined}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={streaming ? [rehypeTokenReveal] : undefined}
        components={{ a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" /> }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
