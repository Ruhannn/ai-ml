import { Document } from "langchain";
import type { Car } from "../prisma/generated/prisma/client";
import { prisma } from "../src/lib/db";
import { vectorDB } from "../src/lib/vectorDB";


export function carToDocument(car: Car) {
  return new Document({
    pageContent: `
    ${car.year} ${car.name}
    Body type: ${car.bodyType}
    Fuel type: ${car.fuelType}
    Price: $${car.price}
    Overview: ${car.description}
    Features: ${car.features}
    `.trim(),
    metadata: {
      type: "profile",
      carId: car.id,
      bodyType: car.bodyType,
    },
  });
}

try {
  const cars = await prisma.car.findMany();

  cars
    .map((car) => carToDocument(car))
    .forEach(async (doc) => {
      await vectorDB.addDocuments([doc]);
    });

    console.log("Vector index updated.");
} catch (err) {
  console.log(err);
  process.exit(1);
}
