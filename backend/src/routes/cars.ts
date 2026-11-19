import { Router } from "express";
import { summarizeCarReviews } from "../services/car-summary";
import { prisma } from "../lib/db";


export const carsRouter = Router();

carsRouter.get("/", async (req, res) => {
  try {
    const cars = await prisma.car.findMany({
      orderBy: { name: "asc" },
    });

    return res.json({ cars });
  } catch {
    return res.status(500).json({ error: "Failed to retrieve cars" });
  }
});

carsRouter.get("/:id", async (req, res) => {
  try {
    const car = await prisma.car.findUnique({
      where: { id: req.params.id },
      include: {
        reviews: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    return res.json({ car });
  } catch {
    return res.status(500).json({ error: "Failed to retrieve car" });
  }
});

carsRouter.get("/:id/summary", async (req, res) => {
  try {
    const summary = await summarizeCarReviews(req.params.id);

    if (!summary) {
      return res.status(404).json({ error: "Car not found" });
    }

    return res.json(summary);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to summarize car reviews" });
  }
});
