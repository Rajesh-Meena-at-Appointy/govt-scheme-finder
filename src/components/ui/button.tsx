import * as React from "react";
import Link from "next/link";

type Variant = "default" | "outline" | "ghost";
type Size = "default" | "sm" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:pointer-events-none disabled:opacity-50";
const variants: Record<Variant, string> = {
  default: "bg-slate-900 text-white hover:bg-slate-800",
  outline: "border border-slate-200 bg-white hover:bg-slate-50",
  ghost: "bg-transparent hover:bg-slate-50",
};
const sizes: Record<Size, string> = {
  default: "",
  sm: "px-3 py-1.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  className = "",
  variant = "default",
  size = "default",
  asChild,
  href,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  href?: string;
}) {
  const cn = [base, variants[variant], sizes[size], className].join(" ").trim();

  if (asChild && href) {
    // simple Link wrapper
    return (
      <Link className={cn} href={href}>
        {children}
      </Link>
    );
  }

  // eslint-disable-next-line react/button-has-type
  return (
    <button className={cn} {...props}>
      {children}
    </button>
  );
}
