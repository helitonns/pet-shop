"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { addDays, format, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function DatePicker() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dataParam = searchParams.get("date");

  const getInicialDate = useCallback(() => {
    if (!dataParam) return;

    const [year, month, day] = dataParam.split("-").map(Number);
    const parsedDate = new Date(year, month - 1, day);

    if (!isValid(parsedDate)) return new Date();

    return parsedDate;
  }, [dataParam]);

  const [date, setDate] = useState<Date | undefined>(getInicialDate);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  function updateURLWithDate(selectedDate: Date | undefined) {
    if (!selectedDate) return;
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("date", format(selectedDate, "yyyy-MM-dd"));
    router.push(`${pathname}?${newParams.toString()}`);
  }

  function handleNavigationDay(days: number) {
    const newDate = addDays(date || new Date(), days);
    updateURLWithDate(newDate);
  }

  useEffect(() => {
    const newDate = getInicialDate();

    if (date?.getTime() !== newDate?.getTime()) {
      setDate(newDate);
    }
  }, [date, getInicialDate]);

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={() => handleNavigationDay(-1)}>
        <ChevronLeft size={16} />
      </Button>

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-min[180px] justify-between text-left font-normal bg-transparent 
            border-border-primary text-content-primary hover:bg-background-tertiary 
            hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 
            focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand 
            focus-visible:border-border-brand"
          >
            <div className="flex gap-2 items-center">
              <Calendar size={16} className="text-content-brand" />
              {date ? (
                format(date, "PPP", { locale: ptBR })
              ) : (
                <span>Selecione uma data</span>
              )}
            </div>
            <ChevronDown size={16} opacity={50} />
          </Button>
        </PopoverTrigger>
      </Popover>

      <Button variant="outline" onClick={() => handleNavigationDay(1)}>
        <ChevronRight size={16} />
      </Button>

    </div>
  );
}