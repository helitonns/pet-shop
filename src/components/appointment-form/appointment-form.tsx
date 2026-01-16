"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dog, User } from "lucide-react";
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField control={form.control} name="tutorName" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-label-medium-size text-content-primary">Nome do tutor</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1.5 transform text-content-brand" size={20} />
                    <Input placeholder="Nome do tutor" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="petName" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-label-medium-size text-content-primary">Nome do pet</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Dog className="absolute left-3 top-1/2 -translate-y-1.5 transform text-content-brand" size={20} />
                    <Input placeholder="Nome do tutor" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-label-medium-size text-content-primary">Descrição do serviço</FormLabel>
                <FormControl>
                  <Textarea placeholder="Descrição do serviçor" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />


            <Button type="submit" variant="brand" className="mt-8">Salvar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}