import { cn } from "@/lib/utils";

export interface IContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Container({ 
  children, 
  className, 
  size = "xl" 
}: IContainerProps) {
  const sizeClasses = {
    sm: "max-w-2xl",
    md: "max-w-4xl", 
    lg: "max-w-6xl",
    xl: "max-w-7xl"
  };

  return (
    <div className={cn(
      "mx-auto px-6 sm:px-8",
      sizeClasses[size],
      className
    )}>
      {children}
    </div>
  );
}