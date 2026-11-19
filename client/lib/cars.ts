import { API_URL } from "@/lib/api-url";

export type CarReview = {
  id: string;
  author: string;
  rating: number;
  content: string;
};

export type Car = {
  id: string;
  name: string;
  year: number;
  bodyType: string;
  fuelType: "Petrol" | "Hybrid" | "Electric";
  price: number;
  description: string;
  features: string;
  imageUrl: string | null;
  reviews?: CarReview[];
};

export async function getCars(): Promise<Car[]> {
  const response = await fetch(`${API_URL}/cars`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Could not load the car inventory.");
  }

  const data: { cars: Car[] } = await response.json();
  return data.cars;
}

export async function getCar(id: string): Promise<Car | null> {
  const response = await fetch(`${API_URL}/cars/${encodeURIComponent(id)}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error("Could not load this car.");
  }

  const data: { car: Car } = await response.json();
  return data.car;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
