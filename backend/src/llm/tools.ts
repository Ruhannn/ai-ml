import { TavilySearch } from "@langchain/tavily";
import { config } from "../config";

export const webSearch = new TavilySearch({
  maxResults: 3,
  tavilyApiKey: config.LLM.TAVILY_API_KEY,
});
