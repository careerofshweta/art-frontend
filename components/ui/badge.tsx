import { cn } from "@/lib/utils";

export function Badge({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "red" | "purple" | "amber" | "gray" }) {
  const tones = { green:"bg-emerald-50 text-emerald-600", red:"bg-red-50 text-red-500", purple:"bg-violet-50 text-violet-600", amber:"bg-amber-50 text-amber-600", gray:"bg-slate-100 text-slate-500" };
  return <span className={cn("inline-flex rounded-full px-2 py-1 text-[10px] font-bold", tones[tone])}>{children}</span>;
}
