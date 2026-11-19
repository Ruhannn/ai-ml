import { PromptTemplate } from "@langchain/core/prompts";

type SummarizePromptInput = {
  carName: string;
  reviews: string;
};
// Summarize these car reviews.

// {reviews}

export const SUMMARIZE_PROMPT = PromptTemplate.fromTemplate<SummarizePromptInput>(/* xml */`
    You are helping shoppers who want to buy a car.

    Task:
    Summarize the customer reviews below in 3 to 5 sentences (max 100 words).

    Include:
    1. Are the reviews good, mixed, or bad?
    2. What do people like?
    3. What do people not like?

    Rules:
    - Use only the information in the reviews. Do not add your own ideas.
    - Do not use reviewer names.
    - If there are no reviews, write exactly: "Not enough review data to summarize."
    - Write only the summary. No title, no extra words.

    <car>{carName}</car>

    <reviews>
    {reviews}
    </reviews>
`);
