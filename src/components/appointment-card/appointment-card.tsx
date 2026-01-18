"use client";
import { deleteAppointmet } from "@/app/actions";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Appointment } from "@/types/appointments";
import { Trash2 as DeleteIcon, Pen as EditIcon, Loader2 as LoadingIcon } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";
import { AppointmentForm } from "../appointment-form/appointment-form";

type AppointmentCardProps = {
  appointment: Appointment;
  isFirstInSection?: boolean;
}

export function AppointmentCard({ appointment, isFirstInSection = false }: AppointmentCardProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  async function handleDelete() {
    setIsDeleting(true);

    const result = await deleteAppointmet(appointment.id);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
      return;
    }

    setIsDeleting(false);
  }

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-[15%_35%_30%_20%] items-center py-3", !isFirstInSection && "border-t border-border-divisor")}>
      <div className="text-left pr-4 md:pr-0">
        <span className="text-label-small-size text-content-primary font-semibold">{appointment.scheduleAt.toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}</span>
        {" / "}
        <span className="text-label-small-size text-content-primary font-semibold">{appointment.time}</span>
      </div>

      <div className="text-right md:text-left md:pr-4">
        <div className="flex items-center justify-end md:justify-start gap-1">
          <span className="text-label-small-size text-content-primary font-semibold">{appointment.petName}</span>
          <span className="text-label-small-size text-content-secondary">/</span>
          <span className="text-label-small-size text-content-secondary">{appointment.tutorName}</span>
        </div>
      </div>

      <div className="text-left pr-4 hidden md:block mt-1 md:mt-0 col-span-2 md:col-span-1">
        <span className="text-paragraph-small-size text-content-secondary">{appointment.description}</span>
      </div>

      <div className="text-right mt-2 md:mt-0 col-span-2 md:col-span-1 flex justify-end items-center gap-2">
        <AppointmentForm appointment={appointment}>
          <Button variant="edit" size="icon">
            <EditIcon size={16} />
          </Button>
        </AppointmentForm>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="remove" size="icon">
              <DeleteIcon size={16} />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apagar agendamento</AlertDialogTitle>
              <AlertDialogDescription>Tem cesteza que deseja apagar este agendaento?</AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                {isDeleting && (
                  <LoadingIcon size={16} className="animete-spin" />
                )}Apagar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}