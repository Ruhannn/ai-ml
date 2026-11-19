import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import { config } from "../config";

export const llm = new ChatAnthropic({
  model: "claude-haiku-5-5",
  apiKey: config.LLM.ANTHROPIC_API_KEY,
});

// TODO
export const embeddings = new OpenAIEmbeddings({
  model: "openai/text-embedding-3-small",
  apiKey: config.LLM.OPENROUTER_API_KEY,
  configuration: { baseURL: "https://openrouter.ai/api/v1" },
});
