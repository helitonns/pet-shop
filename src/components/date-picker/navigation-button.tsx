import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "../ui/button";

type NavigationButtonProps = {
  tooltipText: string;
  children: React.ReactNode;
  onClick: () => void;
};

export function NavigationButton({ tooltipText, children, onClick }: NavigationButtonProps) {

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size={"icon"}
            onClick={onClick}
            className="h-12 w-12 bg-transparent border-border-primary text-content-primary 
            hover:bg-background-tertiary 
            hover:border-border-brand 
            hover:text-content-primary 
            focus-visible:ring-offset-0 
            focus-visible:ring-1 
            focus-visible:ring-border-brand
            focus:border-border-brand
            focus-visible:border-border-brand
            "
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-background-brand" side="top">
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}