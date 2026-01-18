import { AppointmentForm } from "@/components/appointment-form/appointment-form";
import { DatePicker } from "@/components/date-picker/date-picker";
import { PeriodSection } from "@/components/period-section";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { groupAppointmentByPeriod } from "@/utils/appointments-utils";

export default async function Home() {
  const appointments = await prisma.appointment.findMany({
    orderBy: {
      scheduleAt: "desc"
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

      <div className="
        fixed bottom-0 left-0 right-0 flex justify-center bg-background-tertiary py-4.5 px-6
        md:botton-6 md:right-6 md:left-auto md:top-auto md:w-auto md:bg-transparent md:p-0 md:mt-4 md:mb-4"
      >
        <AppointmentForm>
          <Button variant="brand">Novo Agendamento</Button>
        </AppointmentForm>
      </div>
    </div>
  );
}
