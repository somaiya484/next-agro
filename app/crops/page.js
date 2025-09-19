"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CropCalendar } from "@/components/crop-calendar"
import { SeasonalGuide } from "@/components/seasonal-guide"
import { FertilizerGuide } from "@/components/fertilizer-guide"
import { AISuggestions } from "@/components/ai-suggestions"
import { AddCropModal } from "@/components/add-crop-modal"
import { Sprout, Plus, Calendar, Beaker, Brain, Leaf, Droplets, Sun, CloudRain } from "lucide-react"

const mockCrops = [
  {
    id: 1,
    name: "Tomatoes",
    variety: "Roma",
    plantedDate: "2024-03-15",
    expectedHarvest: "2024-06-15",
    status: "Growing",
    stage: "Flowering",
    area: "2.5 acres",
    health: "Excellent",
  },
  {
    id: 2,
    name: "Corn",
    variety: "Sweet Corn",
    plantedDate: "2024-04-01",
    expectedHarvest: "2024-07-15",
    status: "Growing",
    stage: "Vegetative",
    area: "5 acres",
    health: "Good",
  },
  {
    id: 3,
    name: "Wheat",
    variety: "Winter Wheat",
    plantedDate: "2024-02-01",
    expectedHarvest: "2024-05-30",
    status: "Ready",
    stage: "Maturity",
    area: "10 acres",
    health: "Excellent",
  },
]

const getStatusColor = (status) => {
  switch (status) {
    case "Growing":
      return "bg-primary text-primary-foreground"
    case "Ready":
      return "bg-secondary text-secondary-foreground"
    case "Harvested":
      return "bg-muted text-muted-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getHealthColor = (health) => {
  switch (health) {
    case "Excellent":
      return "text-primary"
    case "Good":
      return "text-secondary"
    case "Fair":
      return "text-yellow-600"
    case "Poor":
      return "text-destructive"
    default:
      return "text-muted-foreground"
  }
}

export default function CropsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sprout className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Crop Management</h1>
                <p className="text-muted-foreground">Monitor and manage your crop lifecycle</p>
              </div>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Crop
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="seasonal" className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              Seasonal Guide
            </TabsTrigger>
            <TabsTrigger value="fertilizer" className="flex items-center gap-2">
              <Beaker className="h-4 w-4" />
              Fertilizer Guide
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Suggestions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Current Crops */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Current Crops</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCrops.map((crop) => (
                  <Card key={crop.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Sprout className="h-5 w-5 text-primary" />
                          {crop.name}
                        </CardTitle>
                        <Badge className={getStatusColor(crop.status)}>{crop.status}</Badge>
                      </div>
                      <CardDescription>{crop.variety}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Planted</p>
                          <p className="font-medium">{new Date(crop.plantedDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Harvest</p>
                          <p className="font-medium">{new Date(crop.expectedHarvest).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Stage</p>
                          <p className="font-medium">{crop.stage}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Area</p>
                          <p className="font-medium">{crop.area}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Health:</span>
                          <span className={`text-sm font-medium ${getHealthColor(crop.health)}`}>{crop.health}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-muted-foreground">Active Crops</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Sun className="h-8 w-8 text-secondary" />
                    <div>
                      <p className="text-2xl font-bold">17.5</p>
                      <p className="text-sm text-muted-foreground">Total Acres</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <CloudRain className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">2</p>
                      <p className="text-sm text-muted-foreground">Need Water</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">1</p>
                      <p className="text-sm text-muted-foreground">Ready to Harvest</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <CropCalendar />
          </TabsContent>

          <TabsContent value="seasonal">
            <SeasonalGuide />
          </TabsContent>

          <TabsContent value="fertilizer">
            <FertilizerGuide />
          </TabsContent>

          <TabsContent value="ai">
            <AISuggestions />
          </TabsContent>
        </Tabs>
      </div>

      <AddCropModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
    </div>
  )
}
