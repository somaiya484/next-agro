"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormInput } from "@/components/form-input"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Label } from "@/components/ui/label"
import { Sprout, Eye, EyeOff, User, ShoppingCart, GraduationCap, Shield } from "lucide-react"

const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
    role: z.enum(["farmer", "buyer", "expert", "admin"], {
      required_error: "Please select a role",
    }),
    phone: z.string().min(10, "Please enter a valid phone number"),
    location: z.string().min(2, "Please enter your location"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

const roles = [
  {
    value: "farmer",
    label: "Farmer",
    description: "Manage crops, livestock, and farm operations",
    icon: User,
  },
  {
    value: "buyer",
    label: "Buyer",
    description: "Purchase agricultural products and participate in auctions",
    icon: ShoppingCart,
  },
  {
    value: "expert",
    label: "Agricultural Expert",
    description: "Provide guidance and answer community questions",
    icon: GraduationCap,
  },
  {
    value: "admin",
    label: "Administrator",
    description: "Manage platform users and content",
    icon: Shield,
  },
]

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Signup data:", data)
    setIsLoading(false)
    // Redirect to appropriate dashboard
    window.location.href = "/crops"
  }

  const handleRoleChange = (value) => {
    setSelectedRole(value)
    setValue("role", value)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sprout className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">NextAgroHub</h1>
          </div>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>Join the agricultural community and start managing your farm operations</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="First Name"
                placeholder="John"
                required
                error={errors.firstName?.message}
                {...register("firstName")}
              />
              <FormInput
                label="Last Name"
                placeholder="Doe"
                required
                error={errors.lastName?.message}
                {...register("lastName")}
              />
            </div>

            <FormInput
              label="Email Address"
              type="email"
              placeholder="john.doe@example.com"
              required
              error={errors.email?.message}
              {...register("email")}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                required
                error={errors.phone?.message}
                {...register("phone")}
              />
              <FormInput
                label="Location"
                placeholder="City, State"
                required
                error={errors.location?.message}
                {...register("location")}
              />
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Role <span className="text-destructive">*</span>
              </Label>
              <Select onValueChange={handleRoleChange}>
                <SelectTrigger className={errors.role && "border-destructive focus-visible:ring-destructive"}>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      <div className="flex items-center gap-2">
                        <role.icon className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{role.label}</div>
                          <div className="text-xs text-muted-foreground">{role.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <FormInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  required
                  error={errors.password?.message}
                  {...register("password")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-8 h-8 w-8 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>

              <div className="relative">
                <FormInput
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  required
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-8 h-8 w-8 p-0"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoadingSpinner className="mr-2 h-4 w-4" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
