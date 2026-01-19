"use client";

import { createAppointment, updateAppointment } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Appointment } from "@/types/appointments";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, setHours, setMinutes, startOfToday } from "date-fns";
import { CalendarIcon, ChevronDownIcon, Clock, Dog, Loader2, Phone, User } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { toast } from "react-toastify";
import z from "zod";

const appointmentFormSchema = z.object({
  tutorName: z.string().min(3, "O nome do tutor deve ter no mínimo 3 caracteres"),
  petName: z.string().min(3, "O nome do pet deve ter no mínimo 3 caracteres"),
  phone: z.string().min(11, "O telefone deve ter no mínimo 11 carcteres"),
  description: z.string().min(3, "A descrição deve ter no mínimo 3 carcteres"),
  scheduleAt: z.date({
    error: "Escolha uma data válida"
  }).min(startOfToday(), { message: "Só é permitido agendamentos futuros" }),
  time: z.string().min(1, "Hora obrigatória")
}).refine((data) => {
  const [hour, minute] = data.time.split(":");
  const scheduleDateTime = setMinutes(
    setHours(data.scheduleAt, Number(hour)),
    Number(minute)
  );

  return scheduleDateTime > new Date();
}, {
  path: ["time"],
  error: "Só é permitido agendamentos futuros"
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

type AppointmentFormProps = {
  appointment?: Appointment;
  children?: React.ReactNode;
}

export function AppointmentForm({ appointment, children }: AppointmentFormProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      tutorName: "",
      petName: "",
      phone: "",
      description: "",
      scheduleAt: undefined,
      time: "",
    }
  });

  async function onSubmit(data: AppointmentFormValues) {
    const [hour, minute] = data.time.split(":");
    const scheduleAt = setMinutes(
      setHours(data.scheduleAt, Number(hour)),
      Number(minute)
    );

    const isEdit = !!appointment?.id;

    const result = isEdit ?
      await updateAppointment(appointment.id, {
        ...data,
        scheduleAt
      })
      :
      await createAppointment({
        ...data,
        scheduleAt
      });

    if (result.success) {
      toast.success(result.message);
      form.reset();
      setIsOpen(false);
    } else {
      toast.error(result.message);
    }
  }

  React.useEffect(() => {
    form.reset(appointment);
  }, [appointment, form]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children && (
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
      )}

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

            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-label-medium-size text-content-primary">Telefone</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1.5 transform text-content-brand" size={20} />
                    <IMaskInput
                      placeholder="(99) 99999-9999"
                      mask="(00) 00000-0000"
                      className="pl-10 flex h-12 w-full rounded-md border border-border-primary 
                        bg-background-tertiary px-3 py-2 text-sm text-content-primary ring-offset-background 
                        file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-content-secondary 
                        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-border-brand 
                        disabled:cursor-not-allowed disabled:opacity-50 hover:border-border-secondary 
                        focus:border-border-brand focus-visible:border-border-brand aria-invalid:ring-destructive/20 
                        aria-invalid:border-destructive"
                      {...field}
                    />
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

            <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
              <FormField control={form.control} name="scheduleAt" render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-label-medium-size text-content-primary">Data</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-between text-left font-normal bg-background-tertiary border-border-primar text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand", !field.value && "text-content-secondary")}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                              <CalendarIcon size={20} className="text-content-brand" />
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                            </div>
                            <ChevronDownIcon />
                          </div>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < startOfToday()}
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="time" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-label-medium-size text-content-primary">Hora</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} >
                      <SelectTrigger>
                        <div className="flex items-center gap-2">
                          <Clock size={20} className="text-content-brand" />
                          <SelectValue placeholder="--:--" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_OPTIONS.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="brand" className="w-full md:w-min" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                Agendar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

const generateTimeOptions = (): string[] => {
  const times = [];

  for (let hour = 9; hour <= 21; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 21 && minute > 0) break;

      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      times.push(timeString);

    }
  }

  return times;
}

const TIME_OPTIONS = generateTimeOptions();