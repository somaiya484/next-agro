"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LivestockCard } from "@/components/livestock-card"
import { VaccinationSchedule } from "@/components/vaccination-schedule"
import { GrowthChart } from "@/components/growth-chart"
import { HealthRecords } from "@/components/health-records"
import { AddLivestockModal } from "@/components/add-livestock-modal"
import { Heart, Plus, Activity, Calendar, TrendingUp, AlertTriangle } from "lucide-react"

const mockLivestock = [
  {
    id: 1,
    name: "Bessie",
    type: "Cattle",
    breed: "Holstein",
    age: "3 years",
    weight: "1200 lbs",
    health: "Excellent",
    lastCheckup: "2024-03-15",
    vaccinations: "Up to date",
    status: "Healthy",
    birthDate: "2021-03-10",
    gender: "Female",
    earTag: "C001",
  },
  {
    id: 2,
    name: "Wilbur",
    type: "Pig",
    breed: "Yorkshire",
    age: "8 months",
    weight: "180 lbs",
    health: "Good",
    lastCheckup: "2024-03-12",
    vaccinations: "Due soon",
    status: "Healthy",
    birthDate: "2023-07-15",
    gender: "Male",
    earTag: "P001",
  },
  {
    id: 3,
    name: "Henrietta",
    type: "Chicken",
    breed: "Rhode Island Red",
    age: "1 year",
    weight: "6 lbs",
    health: "Good",
    lastCheckup: "2024-03-10",
    vaccinations: "Up to date",
    status: "Laying",
    birthDate: "2023-03-20",
    gender: "Female",
    earTag: "CH001",
  },
  {
    id: 4,
    name: "Dolly",
    type: "Sheep",
    breed: "Merino",
    age: "2 years",
    weight: "150 lbs",
    health: "Fair",
    lastCheckup: "2024-03-08",
    vaccinations: "Overdue",
    status: "Needs attention",
    birthDate: "2022-04-05",
    gender: "Female",
    earTag: "S001",
  },
]

const livestockStats = [
  {
    title: "Total Animals",
    value: "24",
    change: "+2",
    trend: "up",
    icon: Heart,
  },
  {
    title: "Healthy Animals",
    value: "22",
    change: "+1",
    trend: "up",
    icon: Activity,
  },
  {
    title: "Due Vaccinations",
    value: "3",
    change: "+1",
    trend: "up",
    icon: Calendar,
  },
  {
    title: "Avg Weight Gain",
    value: "2.3 lbs",
    change: "+0.2",
    trend: "up",
    icon: TrendingUp,
  },
]

const getHealthColor = (health) => {
  switch (health) {
    case "Excellent":
      return "text-green-500"
    case "Good":
      return "text-primary"
    case "Fair":
      return "text-yellow-500"
    case "Poor":
      return "text-destructive"
    default:
      return "text-muted-foreground"
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case "Healthy":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "Laying":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "Needs attention":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "Sick":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default function LivestockPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedAnimal, setSelectedAnimal] = useState(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Livestock Management</h1>
                <p className="text-muted-foreground">Monitor and manage your livestock health and growth</p>
              </div>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Animal
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {livestockStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <stat.icon className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-500">{stat.change}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="vaccinations" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Vaccinations
            </TabsTrigger>
            <TabsTrigger value="growth" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Growth Tracking
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Health Records
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Health Alerts
                </CardTitle>
                <CardDescription>Animals requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">Dolly (Sheep) - Vaccination Overdue</p>
                        <p className="text-sm text-muted-foreground">Last vaccination: 6 months ago</p>
                      </div>
                    </div>
                    <Button size="sm">Schedule</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Wilbur (Pig) - Vaccination Due Soon</p>
                        <p className="text-sm text-muted-foreground">Due in 3 days</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Remind Me
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Livestock Grid */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Your Livestock</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockLivestock.map((animal) => (
                  <LivestockCard
                    key={animal.id}
                    animal={animal}
                    onSelect={() => setSelectedAnimal(animal)}
                    healthColor={getHealthColor(animal.health)}
                    statusColor={getStatusColor(animal.status)}
                  />
                ))}
              </div>
            </div>

            {/* Quick Stats by Type */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary">8</div>
                  <div className="text-sm text-muted-foreground">Cattle</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary">6</div>
                  <div className="text-sm text-muted-foreground">Pigs</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary">25</div>
                  <div className="text-sm text-muted-foreground">Chickens</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Sheep</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vaccinations">
            <VaccinationSchedule />
          </TabsContent>

          <TabsContent value="growth">
            <GrowthChart selectedAnimal={selectedAnimal} />
          </TabsContent>

          <TabsContent value="health">
            <HealthRecords />
          </TabsContent>
        </Tabs>
      </div>

      <AddLivestockModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
    </div>
  )
}
