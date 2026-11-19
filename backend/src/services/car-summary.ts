import { addDays, isAfter } from "date-fns";
import { llm } from "../llm/model";
import { SUMMARIZE_PROMPT } from "../llm/prompts/summarize";
import { chunkText } from "../utils/chunkText";
import { prisma } from "../lib/db";

export async function summarizeCarReviews(carId: string) {
  const car = await prisma.car.findUnique({
    where: { id: carId },
    include: { summary: true },
  });

  if (!car) return null;

  const now = new Date();

  if (car.summary && isAfter(car.summary.expiredAt, now)) {
    return {
      summary: car.summary.content,
      generatedAt: car.summary.generatedAt,
      expiresAt: car.summary.expiredAt,
      cached: true,
    };
  }

  const reviews = await prisma.review.findMany({
    where: { carId },
    orderBy: { createdAt: "desc" },
    take: 10,
    select: { author: true, rating: true, content: true },
  });

  if (reviews.length === 0) {
    return {
      summary: "No reviews available yet.",
      generatedAt: null,
      expiresAt: null,
      cached: false,
    };
  }

  const prompt = await SUMMARIZE_PROMPT.format({
    carName: car.name,
    reviews: reviews
      .map(
        (review, index) =>
          `${index + 1}. Rating: ${review.rating}/5; Author: ${review.author}\n${review.content}`,
      )
      .join("\n\n"),
  });

  const result = await llm.invoke(prompt);

  const content = chunkText(result.content).trim();

  if (!content) {
    throw new Error("The model returned an empty summary");
  }

  const expiresAt = addDays(now, 7);

  const summary = await prisma.summary.upsert({
    where: { carId },
    create: { carId, content, generatedAt: now, expiredAt: expiresAt },
    update: { content, generatedAt: now, expiredAt: expiresAt },
  });

  return {
    summary: summary.content,
    generatedAt: summary.generatedAt,
    expiresAt: summary.expiredAt,
    cached: false,
  };
}
