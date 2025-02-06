/*
  Warnings:

  - You are about to drop the `ChargingPoint` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ChargingPoint";

-- CreateTable
CREATE TABLE "charging_points" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "ruc" TEXT NOT NULL,
    "ci" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "device_id" TEXT,
    "user" TEXT,
    "business_name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "imei" TEXT,
    "address" TEXT NOT NULL,

    CONSTRAINT "charging_points_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "charging_points_uuid_key" ON "charging_points"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "charging_points_device_id_key" ON "charging_points"("device_id");
