import { AppointmentForm } from "@/components/appointment-form/appointment-form";
import { DatePicker } from "@/components/date-picker/date-picker";
import { PeriodSection } from "@/components/period-section";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { groupAppointmentByPeriod } from "@/utils/appointments-utils";
import { endOfDay, parseISO, startOfDay } from "date-fns";

export default async function Home({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
  const { date } = await searchParams;
  const selectedDate = date ? parseISO(date) : new Date();
  const appointments = await prisma.appointment.findMany({
    where: {
      scheduleAt: {
        gte: startOfDay(selectedDate),
        lte: endOfDay(selectedDate)
      }
    },
    orderBy: {
      scheduleAt: "asc"
    }
  });
  const periods = groupAppointmentByPeriod(appointments);

  return (
    <div className="bg-background-primary p-6">
      <div className="flex flex-col md:flex-row justify-start md:justify-between mb-8">
        <div>
          <h1 className="text-title-size text-content-primary">Sua Agenda</h1>
          <p className="text-paragraph-medium-size text-content-secondary">
            Aqui você pode ver todos os clientes e serviços agendados para hoje.
          </p>
        </div>

        <div className="flex mt-4 md:mt-0">
          <DatePicker />
        </div>
      </div>

      <div className="pb-24 md:pb-0">
        {periods.map((period, index) => (
          <PeriodSection period={period} key={index} />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background-tertiary/50 backdrop-blur supports-backdrop-filter:bg-background/60 md:bg-transparent">
        <div className="max-w-3xl mx-auto">
          <div className="w-full flex items-center justify-center p-4 md:justify-end">
            <AppointmentForm>
              <Button variant="brand">Novo Agendamento</Button>
            </AppointmentForm>
          </div>
        </div>
      </div>

    </div>
  );
}
