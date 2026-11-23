import { cn } from "@/lib/cn";

export function SectionLabel({ index, children, className }: { index: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("t-label flex items-center gap-3 text-muted", className)}>
      <span className="text-accent">{index}</span>
      <span className="h-px w-8 bg-accent/50" />
      <span>{children}</span>
    </div>
  );
}
