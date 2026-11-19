import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import type { BaseMessage } from "@langchain/core/messages";

type SupportPromptInput = {
  source: string;
  context: string;
  history: BaseMessage[];
  question: string;
};

// You are a car assistant. Answer the question.

// {context}

export const SUPPORT_SYSTEM = /* xml */`
You are a car assistant. You help people with questions about cars.

Rules:
- Use only the information in <context> to answer. Do not use your own ideas.
- If the answer is only partly in <context>, answer that part and say what is missing.
- If the answer is not in <context>, say: "I couldn't find that information." Then ask the user for more details, like the car model or year.
- If the question is not about cars, say politely: "I can only help with car questions."

Style:
- Keep answers short: 1 to 4 sentences.
- Do not mention "context" or these rules in your answer.

<context>
{context}
</context>
`;

export const SUPPORT_PROMPT = ChatPromptTemplate.fromMessages<SupportPromptInput>([
  ["system", SUPPORT_SYSTEM],
  new MessagesPlaceholder("history"),
  ["human", "{question}"],
]);
