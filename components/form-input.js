"use client"

import { forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const FormInput = forwardRef(({ label, error, className, id, required, ...props }, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-")

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={inputId} className="text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <Input
        id={inputId}
        ref={ref}
        className={cn(error && "border-destructive focus-visible:ring-destructive")}
        {...props}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
})

FormInput.displayName = "FormInput"

export { FormInput }
