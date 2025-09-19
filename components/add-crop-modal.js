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

const addCropSchema = z.object({
  name: z.string().min(2, "Crop name must be at least 2 characters"),
  variety: z.string().min(2, "Variety must be at least 2 characters"),
  area: z.string().min(1, "Area is required"),
  plantingDate: z.string().min(1, "Planting date is required"),
  expectedHarvest: z.string().min(1, "Expected harvest date is required"),
  soilType: z.string().min(1, "Please select soil type"),
  irrigationType: z.string().min(1, "Please select irrigation type"),
})

const cropOptions = [
  "Tomatoes",
  "Corn",
  "Wheat",
  "Rice",
  "Soybeans",
  "Potatoes",
  "Carrots",
  "Lettuce",
  "Peppers",
  "Onions",
]

const soilTypes = ["Clay", "Sandy", "Loam", "Silt", "Rocky"]

const irrigationTypes = ["Drip", "Sprinkler", "Flood", "Manual", "Rain-fed"]

export function AddCropModal({ open, onOpenChange }) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(addCropSchema),
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("New crop data:", data)
    setIsLoading(false)
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Crop</DialogTitle>
          <DialogDescription>Enter the details for your new crop to start tracking its progress</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Crop Name *</Label>
              <Select onValueChange={(value) => setValue("name", value)}>
                <SelectTrigger className={errors.name && "border-destructive"}>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {cropOptions.map((crop) => (
                    <SelectItem key={crop} value={crop}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <FormInput
              label="Variety"
              placeholder="e.g., Roma, Cherry, Beefsteak"
              required
              error={errors.variety?.message}
              {...register("variety")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Area"
              placeholder="e.g., 2.5 acres, 1000 sq ft"
              required
              error={errors.area?.message}
              {...register("area")}
            />

            <div className="space-y-2">
              <Label>Soil Type *</Label>
              <Select onValueChange={(value) => setValue("soilType", value)}>
                <SelectTrigger className={errors.soilType && "border-destructive"}>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((soil) => (
                    <SelectItem key={soil} value={soil}>
                      {soil}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.soilType && <p className="text-sm text-destructive">{errors.soilType.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Planting Date"
              type="date"
              required
              error={errors.plantingDate?.message}
              {...register("plantingDate")}
            />

            <FormInput
              label="Expected Harvest Date"
              type="date"
              required
              error={errors.expectedHarvest?.message}
              {...register("expectedHarvest")}
            />
          </div>

          <div className="space-y-2">
            <Label>Irrigation Type *</Label>
            <Select onValueChange={(value) => setValue("irrigationType", value)}>
              <SelectTrigger className={errors.irrigationType && "border-destructive"}>
                <SelectValue placeholder="Select irrigation method" />
              </SelectTrigger>
              <SelectContent>
                {irrigationTypes.map((irrigation) => (
                  <SelectItem key={irrigation} value={irrigation}>
                    {irrigation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.irrigationType && <p className="text-sm text-destructive">{errors.irrigationType.message}</p>}
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
                  Adding Crop...
                </>
              ) : (
                "Add Crop"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
