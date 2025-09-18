import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/data-table"
import { Activity, FileText, Calendar, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const mockHealthRecords = [
  {
    id: 1,
    animalName: "Bessie",
    animalType: "Cattle",
    date: "2024-03-15",
    type: "Routine Checkup",
    veterinarian: "Dr. Smith",
    findings: "Healthy, good body condition",
    treatment: "None required",
    followUp: "6 months",
    status: "completed",
    cost: 75.0,
  },
  {
    id: 2,
    animalName: "Wilbur",
    animalType: "Pig",
    date: "2024-03-12",
    type: "Vaccination",
    veterinarian: "Dr. Johnson",
    findings: "Healthy, ready for vaccination",
    treatment: "Swine flu vaccine administered",
    followUp: "6 months",
    status: "completed",
    cost: 45.0,
  },
  {
    id: 3,
    animalName: "Dolly",
    animalType: "Sheep",
    date: "2024-03-08",
    type: "Illness Treatment",
    veterinarian: "Dr. Brown",
    findings: "Mild respiratory infection",
    treatment: "Antibiotics prescribed",
    followUp: "2 weeks",
    status: "ongoing",
    cost: 120.0,
  },
  {
    id: 4,
    animalName: "Henrietta",
    animalType: "Chicken",
    date: "2024-03-10",
    type: "Routine Checkup",
    veterinarian: "Dr. Wilson",
    findings: "Good laying condition",
    treatment: "Nutritional supplements",
    followUp: "3 months",
    status: "completed",
    cost: 30.0,
  },
  {
    id: 5,
    animalName: "Charlie",
    animalType: "Cattle",
    date: "2024-03-20",
    type: "Injury Treatment",
    veterinarian: "Dr. Smith",
    findings: "Minor cut on leg",
    treatment: "Wound cleaning and bandaging",
    followUp: "1 week",
    status: "scheduled",
    cost: 85.0,
  },
]

const getStatusIcon = (status) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "ongoing":
      return <Clock className="h-4 w-4 text-yellow-500" />
    case "scheduled":
      return <Calendar className="h-4 w-4 text-blue-500" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "ongoing":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "scheduled":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getTypeColor = (type) => {
  switch (type) {
    case "Routine Checkup":
      return "bg-primary text-primary-foreground"
    case "Vaccination":
      return "bg-secondary text-secondary-foreground"
    case "Illness Treatment":
      return "bg-destructive text-destructive-foreground"
    case "Injury Treatment":
      return "bg-orange-500 text-white"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function HealthRecords() {
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
      header: "Date",
      accessorKey: "date",
      cell: (row) => new Date(row.date).toLocaleDateString(),
    },
    {
      header: "Type",
      accessorKey: "type",
      cell: (row) => <Badge className={getTypeColor(row.type)}>{row.type}</Badge>,
    },
    {
      header: "Veterinarian",
      accessorKey: "veterinarian",
    },
    {
      header: "Findings",
      accessorKey: "findings",
      cell: (row) => <span className="line-clamp-2">{row.findings}</span>,
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
      header: "Cost",
      accessorKey: "cost",
      cell: (row) => <span className="font-medium">${row.cost.toFixed(2)}</span>,
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (row) => (
        <Button size="sm" variant="outline" className="bg-transparent">
          View Details
        </Button>
      ),
    },
  ]

  const totalCost = mockHealthRecords.reduce((sum, record) => sum + record.cost, 0)
  const completedRecords = mockHealthRecords.filter((record) => record.status === "completed").length
  const ongoingTreatments = mockHealthRecords.filter((record) => record.status === "ongoing").length

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Health Records
          </CardTitle>
          <CardDescription>Complete medical history and treatment records for your livestock</CardDescription>
        </CardHeader>
      </Card>

      {/* Health Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{mockHealthRecords.length}</p>
                <p className="text-sm text-muted-foreground">Total Records</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{completedRecords}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{ongoingTreatments}</p>
                <p className="text-sm text-muted-foreground">Ongoing</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-secondary" />
              <div>
                <p className="text-2xl font-bold">${totalCost.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Cost</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Records Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>Complete history of veterinary visits and treatments</CardDescription>
            </div>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Add Record
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={mockHealthRecords} />
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Appointments
          </CardTitle>
          <CardDescription>Scheduled veterinary visits and follow-ups</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">Charlie (Cattle) - Follow-up</p>
                  <p className="text-sm text-muted-foreground">March 27, 2024 at 10:00 AM with Dr. Smith</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="bg-transparent">
                Reschedule
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium">Dolly (Sheep) - Treatment Follow-up</p>
                  <p className="text-sm text-muted-foreground">March 22, 2024 at 2:00 PM with Dr. Brown</p>
                </div>
              </div>
              <Button size="sm">Confirm</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
