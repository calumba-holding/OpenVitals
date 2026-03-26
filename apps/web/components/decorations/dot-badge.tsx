import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { CornerEdge } from "./corner-cross";
export function DotBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="size-[7px] rounded-full bg-accent-500" />
      <span className="whitespace-nowrap text-foreground text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase">
        {children}
      </span>
    </div>
  );
}
export function DashBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="h-[15px] w-[3px] bg-accent-500" />
      <span className="whitespace-nowrap text-inherit text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase">
        {children}
      </span>
    </div>
  );
}
export function CornerBadge({
  children,
  className,
  border,
  size = "base",
}: {
  size?: "base" | "lg";
  children: ReactNode;
  className?: string;
  border?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-1.5 bg-accent-50 text-accent-700 px-1.5",
        border && "border border-accent-500 px-1 py-1 pl-1.5",
        {
          "px-2.5 py-1.5": size === "lg",
        },
        className,
      )}
    >
      <CornerEdge />
      <span
        className={cn(
          "whitespace-nowrap text-inherit text-pretty font-mono text-[12px] pt-px leading-none tracking-[-0.015rem] uppercase",
          {
            "text-[13px] pt-[2px]": size === "lg",
          },
        )}
      >
        {children}
      </span>
    </div>
  );
}
export function CubeBadge({
  children,
  className,
  border,
}: {
  children: ReactNode;
  className?: string;
  border?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5",
        border && "border border-accent-500 px-1 py-1 pl-1.5",
        className,
      )}
    >
      <div className="size-[5px] bg-accent-500" />
      <span className="whitespace-nowrap text-inherit text-pretty font-mono text-[12px] pt-px leading-none tracking-[-0.015rem] uppercase">
        {children}
      </span>
    </div>
  );
}
