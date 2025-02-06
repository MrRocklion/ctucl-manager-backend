import { charging_points } from "@prisma/client";


export type CreateChargingPointDto = Omit<charging_points,'id'|'createdAt'|'updatedAt'|'uuid'>

