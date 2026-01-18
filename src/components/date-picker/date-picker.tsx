import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export function DatePicker() {

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline">
        <ChevronLeft size={16} />
      </Button>

      <Popover>
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
              <span>Selecione uma data</span>
            </div>
            <ChevronDown size={16} opacity={50} />
          </Button>
        </PopoverTrigger>
      </Popover>

      <Button variant="outline">
        <ChevronRight size={16} />
      </Button>

    </div>
  );
}