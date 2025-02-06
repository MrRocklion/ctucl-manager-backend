-- CreateTable
CREATE TABLE "ChargingPoint" (
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

    CONSTRAINT "ChargingPoint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChargingPoint_uuid_key" ON "ChargingPoint"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "ChargingPoint_device_id_key" ON "ChargingPoint"("device_id");
