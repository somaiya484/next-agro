"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FormInput } from "@/components/form-input"
import { Label } from "@/components/ui/label"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Upload, X } from "lucide-react"

const createAuctionSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(1, "Please select a category"),
  quantity: z.string().min(1, "Quantity is required"),
  startingBid: z.string().min(1, "Starting bid is required"),
  duration: z.string().min(1, "Please select auction duration"),
  location: z.string().min(2, "Location is required"),
})

const categories = ["Vegetables", "Fruits", "Grains", "Legumes", "Herbs", "Dairy", "Meat", "Other"]
const durations = [
  { label: "1 Day", value: "1" },
  { label: "3 Days", value: "3" },
  { label: "5 Days", value: "5" },
  { label: "7 Days", value: "7" },
  { label: "10 Days", value: "10" },
]

export function CreateAuctionModal({ open, onOpenChange }) {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(createAuctionSchema),
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("New auction data:", { ...data, images: uploadedImages })
    setIsLoading(false)
    reset()
    setUploadedImages([])
    onOpenChange(false)
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    // In a real app, you would upload these to a server
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
    }))
    setUploadedImages([...uploadedImages, ...newImages])
  }

  const removeImage = (id) => {
    setUploadedImages(uploadedImages.filter((img) => img.id !== id))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Auction</DialogTitle>
          <DialogDescription>List your agricultural products for auction</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Auction Title"
              placeholder="e.g., Premium Organic Tomatoes"
              required
              error={errors.title?.message}
              {...register("title")}
            />

            <div className="space-y-2">
              <Label>Category *</Label>
              <Select onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger className={errors.category && "border-destructive"}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description *</Label>
            <Textarea
              placeholder="Describe your product, quality, harvest date, etc."
              rows={4}
              className={errors.description && "border-destructive"}
              {...register("description")}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              label="Quantity"
              placeholder="e.g., 500 lbs, 100 bushels"
              required
              error={errors.quantity?.message}
              {...register("quantity")}
            />

            <FormInput
              label="Starting Bid (USD)"
              type="number"
              step="0.01"
              placeholder="0.00"
              required
              error={errors.startingBid?.message}
              {...register("startingBid")}
            />

            <div className="space-y-2">
              <Label>Duration *</Label>
              <Select onValueChange={(value) => setValue("duration", value)}>
                <SelectTrigger className={errors.duration && "border-destructive"}>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration.value} value={duration.value}>
                      {duration.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.duration && <p className="text-sm text-destructive">{errors.duration.message}</p>}
            </div>
          </div>

          <FormInput
            label="Location"
            placeholder="City, State"
            required
            error={errors.location?.message}
            {...register("location")}
          />

          {/* Image Upload */}
          <div className="space-y-4">
            <Label>Product Images</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">Upload product images</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Button type="button" variant="outline" onClick={() => document.getElementById("image-upload").click()}>
                Choose Images
              </Button>
            </div>

            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {uploadedImages.map((image) => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.name}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 p-0"
                      onClick={() => removeImage(image.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
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
                  Creating Auction...
                </>
              ) : (
                "Create Auction"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
