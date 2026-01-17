"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";

const appointmentSchema = z.object({
  tutorName: z.string().toUpperCase(),
  petName: z.string().toUpperCase(),
  phone: z.string(),
  description: z.string().toUpperCase(),
  scheduleAt: z.date()
});

type AppointmentData = z.infer<typeof appointmentSchema>;

export async function createAppointment(data: AppointmentData) {
  try {
    const parseData = appointmentSchema.parse(data);
    const { scheduleAt } = parseData;
    const hour = scheduleAt.getHours();

    const isMornig = hour >= 9 && hour < 12;
    const isAfternoon = hour >= 13 && hour < 18;
    const isEvening = hour >= 19 && hour < 21;

    if (!isMornig && !isAfternoon && !isEvening) {
      return {
        ok: false,
        error: "Agendamentos só podem ser feitos entre 9 e 12h, 13 e 18h e entre às 19 e 21h"
      }
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        scheduleAt,
      }
    });

    if (existingAppointment) {
      return {
        ok: false,
        error: "Este horário já está reservado"
      }
    }

    await prisma.appointment.create({
      data: {
        ...parseData
      }
    });

    revalidatePath("/");

    return { ok: true };
  } catch (error) {
    console.log(error);
  }

}