"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormInput } from "@/components/form-input"
import { Label } from "@/components/ui/label"
import { LoadingSpinner } from "@/components/loading-spinner"

const addLivestockSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.string().min(1, "Please select animal type"),
  breed: z.string().min(2, "Breed must be at least 2 characters"),
  gender: z.string().min(1, "Please select gender"),
  birthDate: z.string().min(1, "Birth date is required"),
  weight: z.string().min(1, "Weight is required"),
  earTag: z.string().min(1, "Ear tag is required"),
  healthStatus: z.string().min(1, "Please select health status"),
})

const animalTypes = ["Cattle", "Pig", "Sheep", "Goat", "Chicken", "Duck", "Horse", "Other"]
const genders = ["Male", "Female"]
const healthStatuses = ["Excellent", "Good", "Fair", "Poor"]

export function AddLivestockModal({ open, onOpenChange }) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(addLivestockSchema),
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("New livestock data:", data)
    setIsLoading(false)
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Animal</DialogTitle>
          <DialogDescription>Register a new animal in your livestock management system</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Animal Name"
              placeholder="e.g., Bessie, Wilbur"
              required
              error={errors.name?.message}
              {...register("name")}
            />

            <FormInput
              label="Ear Tag/ID"
              placeholder="e.g., C001, P001"
              required
              error={errors.earTag?.message}
              {...register("earTag")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Animal Type *</Label>
              <Select onValueChange={(value) => setValue("type", value)}>
                <SelectTrigger className={errors.type && "border-destructive"}>
                  <SelectValue placeholder="Select animal type" />
                </SelectTrigger>
                <SelectContent>
                  {animalTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm text-destructive">{errors.type.message}</p>}
            </div>

            <FormInput
              label="Breed"
              placeholder="e.g., Holstein, Yorkshire"
              required
              error={errors.breed?.message}
              {...register("breed")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Gender *</Label>
              <Select onValueChange={(value) => setValue("gender", value)}>
                <SelectTrigger className={errors.gender && "border-destructive"}>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-sm text-destructive">{errors.gender.message}</p>}
            </div>

            <FormInput
              label="Birth Date"
              type="date"
              required
              error={errors.birthDate?.message}
              {...register("birthDate")}
            />

            <FormInput
              label="Current Weight"
              placeholder="e.g., 1200 lbs"
              required
              error={errors.weight?.message}
              {...register("weight")}
            />
          </div>

          <div className="space-y-2">
            <Label>Health Status *</Label>
            <Select onValueChange={(value) => setValue("healthStatus", value)}>
              <SelectTrigger className={errors.healthStatus && "border-destructive"}>
                <SelectValue placeholder="Select health status" />
              </SelectTrigger>
              <SelectContent>
                {healthStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.healthStatus && <p className="text-sm text-destructive">{errors.healthStatus.message}</p>}
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? (
                <>
                  <LoadingSpinner className="mr-2 h-4 w-4" />
                  Adding Animal...
                </>
              ) : (
                "Add Animal"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
