import * as React from "react";

export function Select({
  className = "",
  value,
  onChange,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={(
        "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-slate-300 " +
        className
      ).trim()}
      value={value}
      onChange={onChange}
      {...props}
    >
      {children}
    </select>
  );
}
