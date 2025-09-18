"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LoadingSpinner } from "@/components/loading-spinner"

export function AuthGuard({ children, requiredRole = null }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Simulate authentication check
    const checkAuth = async () => {
      // In a real app, this would check JWT token, session, etc.
      const mockUser = {
        isAuthenticated: true,
        role: "farmer", // This would come from your auth system
      }

      if (!mockUser.isAuthenticated) {
        router.push("/auth/login")
        return
      }

      if (requiredRole && mockUser.role !== requiredRole) {
        router.push("/unauthorized")
        return
      }

      setIsAuthenticated(true)
      setUserRole(mockUser.role)
      setIsLoading(false)
    }

    checkAuth()
  }, [router, requiredRole])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return children
}
