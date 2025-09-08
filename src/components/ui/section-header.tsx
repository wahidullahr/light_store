import { cn } from "@/lib/utils";

export interface ISectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeader({ 
  title, 
  subtitle, 
  align = "center",
  className 
}: ISectionHeaderProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  };

  return (
    <header className={cn(alignClasses[align], className)}>
      <h2 className="text-3xl font-bold tracking-tight text-[#F6F3EC] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-slate-300 mx-auto">
          {subtitle}
        </p>
      )}
    </header>
  );
}