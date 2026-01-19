import { Dog } from "lucide-react";
import Link from "next/link";

export function Logo() {

  return (
    <Link href={"/"} className="flex items-center gap-4 bg-background-tertiary/50 backdrop-blur supports-backdrop-filter:bg-background/60 w-full md:w-fit p-3 md:rounded-br-lg">
      <div className="flex gap-2 items-center">
        <Dog size={32} className="bg-background-brand rounded felx items-center justify-center" />
        <span className="text-label-large-size font-bold text-content-brand">MUNDO PET</span>
      </div>
    </Link>
  );
}