CREATE TABLE "Summary" (
    "id" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiredAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Summary_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Summary_carId_key" ON "Summary"("carId");

ALTER TABLE "Summary"
ADD CONSTRAINT "Summary_carId_fkey"
FOREIGN KEY ("carId") REFERENCES "Car"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
