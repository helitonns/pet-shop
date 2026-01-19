"use server";

import { Appointment } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";
import { failure, ServiceResult, success } from "./service-result";

const appointmentSchema = z.object({
  tutorName: z.string().toUpperCase(),
  petName: z.string().toUpperCase(),
  phone: z.string(),
  description: z.string().toUpperCase(),
  scheduleAt: z.date()
});

type AppointmentData = z.infer<typeof appointmentSchema>;

function calculatePeriod(hour: number) {
  const isMornig = hour >= 9 && hour < 12;
  const isAfternoon = hour >= 13 && hour < 18;
  const isEvening = hour >= 19 && hour < 21;

  return {
    isMornig,
    isAfternoon,
    isEvening
  }
}

export async function createAppointment(data: AppointmentData): Promise<ServiceResult<Appointment>> {
  try {
    const parseData = appointmentSchema.parse(data);
    const { scheduleAt } = parseData;
    const hour = scheduleAt.getHours();

    const { isMornig, isAfternoon, isEvening } = calculatePeriod(hour);

    if (!isMornig && !isAfternoon && !isEvening) {
      return failure("Agendamentos só podem ser feitos entre 9 e 12h, 13 e 18h e entre às 19 e 21h.");
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        scheduleAt,
      }
    });

    if (existingAppointment) {
      return failure("Este horário já está reservado.");
    }

    const created = await prisma.appointment.create({
      data: {
        ...parseData
      }
    });

    revalidatePath("/");

    return success(created, "Agendamento criado com sucesso.");
  } catch (error) {
    console.log(error);
    return failure("Erro ao salvar agendamento.");
  }
}

export async function updateAppointment(id: string, data: AppointmentData): Promise<ServiceResult<Appointment>> {
  try {
    const parseData = appointmentSchema.parse(data);
    const { scheduleAt } = parseData;
    const hour = scheduleAt.getHours();

    const { isMornig, isAfternoon, isEvening } = calculatePeriod(hour);

    if (!isMornig && !isAfternoon && !isEvening) {
      return failure("Agendamentos só podem ser feitos entre 9 e 12h, 13 e 18h e entre às 19 e 21h.");
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        scheduleAt,
        id: {
          not: id
        }
      }
    });

    if (existingAppointment) {
      return failure("Este horário já está reservado.");
    }

    const updated = await prisma.appointment.update({
      where: {
        id
      },
      data: {
        ...parseData
      }
    });

    revalidatePath("/");

    return success(updated, "Agendamento editado com sucesso.");
  } catch (error) {
    console.log(error);
    return failure("Erro ao salvar agendamento.");
  }
}

export async function deleteAppointmet(id: string): Promise<ServiceResult<Appointment>> {
  try {
    const deleted = await prisma.appointment.delete({
      where: {
        id
      }
    });

    revalidatePath("/");

    return success(deleted, "Agendamento apagado com sucesso.");
  } catch (error) {
    console.log(error);
    return failure("Erro ao apagar agendamento.");
  }
}