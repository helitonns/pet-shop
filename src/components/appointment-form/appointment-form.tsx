"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const appointmentFormSchema = z.object({
  tutorName: z.string().min(3, "O nome do tutor deve ter no mínimo 3 caracteres"),
  petName: z.string().min(3, "O nome do pet deve ter no mínimo 3 caracteres"),
  phone: z.string().min(11, "O telefone deve ter no mínimo 11 carcteres"),
  description: z.string().min(3, "A descrição deve ter no mínimo 3 carcteres"),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

export function AppointmentForm() {
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      tutorName: "",
      petName: "",
      phone: "",
      description: "",
    }
  });

  function onSubmit(data: AppointmentFormValues) {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="brand">Novo Agendamento</Button>
      </DialogTrigger>

      <DialogContent variant="appointment" overlayVariant="blurred" showCloseButton>
        <DialogHeader>
          <DialogTitle size="modal" className="text-center">Agende um atendimento</DialogTitle>
          <DialogDescription size="modal" className="text-center">Preencha os dados do cliente para realizar o agendamento:</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <input {...form.register('tutorName')} type="text" />

            <Button type="submit">Salvar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}