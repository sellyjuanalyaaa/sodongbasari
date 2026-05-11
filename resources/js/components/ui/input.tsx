import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-slate-300 file:text-foreground placeholder:text-slate-400 selection:bg-orange-500 selection:text-white flex h-10 w-full min-w-0 rounded-lg border bg-white px-4 py-2 text-base text-slate-900 shadow-sm transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-orange-500 focus-visible:ring-orange-500/20 focus-visible:ring-[4px] focus-visible:shadow-md",
        "aria-invalid:border-red-500 aria-invalid:focus-visible:ring-red-500/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
