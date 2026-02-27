import * as React from "react";

type Variant = "default" | "secondary";
const variants: Record<Variant, string> = {
  default: "bg-slate-900 text-white",
  secondary: "bg-slate-100 text-slate-800",
};

export function Badge({
  className = "",
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={("inline-flex items-center rounded-xl px-2.5 py-1 text-xs font-medium " + variants[variant] + " " + className).trim()}
      {...props}
    />
  );
}
