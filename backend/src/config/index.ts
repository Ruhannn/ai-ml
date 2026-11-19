import "dotenv/config";
import { env } from "node:process";

export const config = {
  DATABASE_URL: env.DATABASE_URL!,
  LLM: {
    // ? API KEYS
    ANTHROPIC_API_KEY: env.ANTHROPIC_API_KEY!,
    OPENROUTER_API_KEY: env.OPENROUTER_API_KEY!,
    TAVILY_API_KEY: env.TAVILY_API_KEY!,
    // ?  MODEL SETTINGS
    MAX_DISTANCE: 0.4,
    MAX_HISTORY_MESSAGES: 20,
  },
};
