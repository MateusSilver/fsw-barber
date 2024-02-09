"use server";

import { db } from "@/app/_lib/prisma";

interface saveBookingParams {
    barbershopId: string;
    serviceId: string;
    userId: string;
    date: Date;
}

export const saveBooking = async (params: saveBookingParams) => {
    await db.booking.create({
        data: {
            userId: params.userId,
            serviceId: params.serviceId,
            date: params.date,
            barbershopId: params.barbershopId
        },
    })
}