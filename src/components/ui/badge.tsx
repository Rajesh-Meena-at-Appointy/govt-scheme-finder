import * as React from "react";

type Variant = "default" | "secondary" | "outline";
const variants: Record<Variant, string> = {
  default: "bg-slate-900 text-white hover:bg-slate-700",
  secondary: "bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white",
  outline: "border border-slate-300 bg-white text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600",
};

export function Badge({
  className = "",
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={("inline-flex items-center rounded-xl px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer " + variants[variant] + " " + className).trim()}
      {...props}
    />
  );
}
