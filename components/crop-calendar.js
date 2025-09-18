"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, ChevronRight, Sprout, Droplets, Scissors } from "lucide-react"

const mockCalendarEvents = [
  {
    id: 1,
    date: "2024-03-20",
    type: "planting",
    crop: "Tomatoes",
    task: "Plant seedlings",
    priority: "high",
  },
  {
    id: 2,
    date: "2024-03-25",
    type: "watering",
    crop: "Corn",
    task: "Deep watering",
    priority: "medium",
  },
  {
    id: 3,
    date: "2024-04-01",
    type: "fertilizing",
    crop: "Wheat",
    task: "Apply nitrogen fertilizer",
    priority: "high",
  },
  {
    id: 4,
    date: "2024-04-05",
    type: "harvesting",
    crop: "Lettuce",
    task: "Harvest mature heads",
    priority: "high",
  },
  {
    id: 5,
    date: "2024-04-10",
    type: "pest_control",
    crop: "Tomatoes",
    task: "Check for aphids",
    priority: "medium",
  },
]

const getEventIcon = (type) => {
  switch (type) {
    case "planting":
      return <Sprout className="h-4 w-4" />
    case "watering":
      return <Droplets className="h-4 w-4" />
    case "harvesting":
      return <Scissors className="h-4 w-4" />
    default:
      return <Calendar className="h-4 w-4" />
  }
}

const getEventColor = (type) => {
  switch (type) {
    case "planting":
      return "bg-primary text-primary-foreground"
    case "watering":
      return "bg-blue-500 text-white"
    case "fertilizing":
      return "bg-secondary text-secondary-foreground"
    case "harvesting":
      return "bg-green-500 text-white"
    case "pest_control":
      return "bg-orange-500 text-white"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "bg-destructive text-destructive-foreground"
    case "medium":
      return "bg-yellow-500 text-white"
    case "low":
      return "bg-muted text-muted-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function CropCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Crop Calendar
              </CardTitle>
              <CardDescription>Schedule and track your farming activities</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold min-w-[150px] text-center">{formatDate(currentDate)}</span>
              <Button variant="outline" size="sm" onClick={() => navigateMonth(1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Upcoming Tasks */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Upcoming Tasks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCalendarEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge className={getEventColor(event.type)}>{getEventIcon(event.type)}</Badge>
                    <Badge variant="outline" className={getPriorityColor(event.priority)}>
                      {event.priority}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <h4 className="font-semibold mb-1">{event.task}</h4>
                <p className="text-sm text-muted-foreground mb-3">Crop: {event.crop}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    Mark Complete
                  </Button>
                  <Button size="sm" variant="ghost" className="flex-1">
                    Reschedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Calendar View Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Calendar View</CardTitle>
          <CardDescription>Visual calendar representation of your farming schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Interactive calendar view coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
