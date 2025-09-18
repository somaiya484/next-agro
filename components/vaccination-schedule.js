"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/data-table"
import { Calendar, Syringe, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const mockVaccinationData = [
  {
    id: 1,
    animalName: "Bessie",
    animalType: "Cattle",
    vaccine: "BVDV",
    dueDate: "2024-04-15",
    lastGiven: "2023-10-15",
    status: "upcoming",
    priority: "high",
    notes: "Annual booster required",
  },
  {
    id: 2,
    animalName: "Wilbur",
    animalType: "Pig",
    vaccine: "Swine Flu",
    dueDate: "2024-03-25",
    lastGiven: "2023-09-25",
    status: "due",
    priority: "high",
    notes: "6-month interval",
  },
  {
    id: 3,
    animalName: "Henrietta",
    animalType: "Chicken",
    vaccine: "Newcastle Disease",
    dueDate: "2024-05-01",
    lastGiven: "2024-02-01",
    status: "upcoming",
    priority: "medium",
    notes: "Quarterly vaccination",
  },
  {
    id: 4,
    animalName: "Dolly",
    animalType: "Sheep",
    vaccine: "Clostridial",
    dueDate: "2024-03-20",
    lastGiven: "2023-09-20",
    status: "overdue",
    priority: "urgent",
    notes: "Overdue by 2 days",
  },
  {
    id: 5,
    animalName: "Charlie",
    animalType: "Cattle",
    vaccine: "Rabies",
    dueDate: "2024-06-10",
    lastGiven: "2023-06-10",
    status: "upcoming",
    priority: "medium",
    notes: "Annual vaccination",
  },
]

const getStatusIcon = (status) => {
  switch (status) {
    case "overdue":
      return <AlertTriangle className="h-4 w-4 text-red-500" />
    case "due":
      return <Clock className="h-4 w-4 text-yellow-500" />
    case "upcoming":
      return <Calendar className="h-4 w-4 text-blue-500" />
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    default:
      return <Calendar className="h-4 w-4" />
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case "overdue":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    case "due":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "upcoming":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case "urgent":
      return "bg-red-500 text-white"
    case "high":
      return "bg-orange-500 text-white"
    case "medium":
      return "bg-yellow-500 text-white"
    case "low":
      return "bg-green-500 text-white"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function VaccinationSchedule() {
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredData =
    selectedStatus === "all"
      ? mockVaccinationData
      : mockVaccinationData.filter((item) => item.status === selectedStatus)

  const columns = [
    {
      header: "Animal",
      accessorKey: "animalName",
      cell: (row) => (
        <div>
          <div className="font-medium">{row.animalName}</div>
          <div className="text-sm text-muted-foreground">{row.animalType}</div>
        </div>
      ),
    },
    {
      header: "Vaccine",
      accessorKey: "vaccine",
    },
    {
      header: "Due Date",
      accessorKey: "dueDate",
      cell: (row) => new Date(row.dueDate).toLocaleDateString(),
    },
    {
      header: "Last Given",
      accessorKey: "lastGiven",
      cell: (row) => new Date(row.lastGiven).toLocaleDateString(),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <Badge className={getStatusColor(row.status)}>
          <div className="flex items-center gap-1">
            {getStatusIcon(row.status)}
            {row.status}
          </div>
        </Badge>
      ),
    },
    {
      header: "Priority",
      accessorKey: "priority",
      cell: (row) => <Badge className={getPriorityColor(row.priority)}>{row.priority}</Badge>,
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (row) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="bg-transparent">
            Schedule
          </Button>
          <Button size="sm">Mark Done</Button>
        </div>
      ),
    },
  ]

  const statusCounts = {
    overdue: mockVaccinationData.filter((item) => item.status === "overdue").length,
    due: mockVaccinationData.filter((item) => item.status === "due").length,
    upcoming: mockVaccinationData.filter((item) => item.status === "upcoming").length,
    completed: mockVaccinationData.filter((item) => item.status === "completed").length,
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Syringe className="h-5 w-5" />
            Vaccination Schedule
          </CardTitle>
          <CardDescription>Track and manage vaccination schedules for all your livestock</CardDescription>
        </CardHeader>
      </Card>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedStatus("overdue")}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-red-500">{statusCounts.overdue}</p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedStatus("due")}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-yellow-500">{statusCounts.due}</p>
                <p className="text-sm text-muted-foreground">Due Now</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setSelectedStatus("upcoming")}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-500">{statusCounts.upcoming}</p>
                <p className="text-sm text-muted-foreground">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedStatus("all")}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Syringe className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{mockVaccinationData.length}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vaccination Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                Vaccination Records ({filteredData.length} {selectedStatus !== "all" ? selectedStatus : "total"})
              </CardTitle>
              <CardDescription>Manage vaccination schedules and track completion</CardDescription>
            </div>
            <Button>
              <Syringe className="mr-2 h-4 w-4" />
              Add Vaccination
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={filteredData} />
        </CardContent>
      </Card>

      {/* Vaccination Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Vaccination Calendar</CardTitle>
          <CardDescription>Visual calendar view of upcoming vaccinations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Interactive vaccination calendar coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
