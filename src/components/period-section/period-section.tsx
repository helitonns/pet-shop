import { CloudSun, MoonStar, Sunrise } from "lucide-react";

const periodIcons = {
  morning: <Sunrise className="text-accent-blue" />,
  afternoon: <CloudSun className="text-accent-orange" />,
  evening: <MoonStar className="text-accent-yellow" />
}

type PeriodSectionProps = {
  period: any
}

export function PeriodSection({ period }: PeriodSectionProps) {

  return (
    <section className="mb-8 bg-background-tertiary rounded-xl">
      <div className="flex items-center px-5 py-3 justify-between border-b border-[#2e2c30]">
        <div>
          {periodIcons[period?.type]}
          <h2 className="text-label-large-size text-content-primary">{period?.title}</h2>
        </div>
      </div>
    </section>
  );
}