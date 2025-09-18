"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Weight, Ruler, Calendar } from "lucide-react"

const mockGrowthData = {
  bessie: [
    { date: "2024-01-01", weight: 1150, height: 58 },
    { date: "2024-01-15", weight: 1165, height: 58 },
    { date: "2024-02-01", weight: 1175, height: 58 },
    { date: "2024-02-15", weight: 1185, height: 58 },
    { date: "2024-03-01", weight: 1195, height: 58 },
    { date: "2024-03-15", weight: 1200, height: 58 },
  ],
  wilbur: [
    { date: "2024-01-01", weight: 120, height: 24 },
    { date: "2024-01-15", weight: 135, height: 25 },
    { date: "2024-02-01", weight: 150, height: 26 },
    { date: "2024-02-15", weight: 165, height: 27 },
    { date: "2024-03-01", weight: 175, height: 28 },
    { date: "2024-03-15", weight: 180, height: 28 },
  ],
  henrietta: [
    { date: "2024-01-01", weight: 5.2, height: 12 },
    { date: "2024-01-15", weight: 5.4, height: 12 },
    { date: "2024-02-01", weight: 5.6, height: 12 },
    { date: "2024-02-15", weight: 5.8, height: 12 },
    { date: "2024-03-01", weight: 5.9, height: 12 },
    { date: "2024-03-15", weight: 6.0, height: 12 },
  ],
  dolly: [
    { date: "2024-01-01", weight: 140, height: 30 },
    { date: "2024-01-15", weight: 142, height: 30 },
    { date: "2024-02-01", weight: 145, height: 30 },
    { date: "2024-02-15", weight: 147, height: 30 },
    { date: "2024-03-01", weight: 149, height: 30 },
    { date: "2024-03-15", weight: 150, height: 30 },
  ],
}

const animals = [
  { id: "bessie", name: "Bessie", type: "Cattle" },
  { id: "wilbur", name: "Wilbur", type: "Pig" },
  { id: "henrietta", name: "Henrietta", type: "Chicken" },
  { id: "dolly", name: "Dolly", type: "Sheep" },
]

export function GrowthChart({ selectedAnimal }) {
  const [selectedAnimalId, setSelectedAnimalId] = useState(selectedAnimal?.name.toLowerCase() || "bessie")
  const [chartType, setChartType] = useState("weight")
  const [timeRange, setTimeRange] = useState("3m")

  const currentData = mockGrowthData[selectedAnimalId] || mockGrowthData.bessie
  const currentAnimal = animals.find((a) => a.id === selectedAnimalId) || animals[0]

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const formatWeight = (value) => `${value} lbs`
  const formatHeight = (value) => `${value} in`

  const calculateGrowthRate = () => {
    if (currentData.length < 2) return 0
    const firstWeight = currentData[0].weight
    const lastWeight = currentData[currentData.length - 1].weight
    const days =
      (new Date(currentData[currentData.length - 1].date) - new Date(currentData[0].date)) / (1000 * 60 * 60 * 24)
    return (((lastWeight - firstWeight) / days) * 7).toFixed(2) // Weekly growth rate
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Growth Tracking
          </CardTitle>
          <CardDescription>Monitor weight and height progression of your livestock</CardDescription>
        </CardHeader>
      </Card>

      {/* Chart Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Animal:</label>
              <Select value={selectedAnimalId} onValueChange={setSelectedAnimalId}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {animals.map((animal) => (
                    <SelectItem key={animal.id} value={animal.id}>
                      {animal.name} ({animal.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Time Range:</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 Month</SelectItem>
                  <SelectItem value="3m">3 Months</SelectItem>
                  <SelectItem value="6m">6 Months</SelectItem>
                  <SelectItem value="1y">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={chartType === "weight" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("weight")}
              >
                <Weight className="mr-2 h-4 w-4" />
                Weight
              </Button>
              <Button
                variant={chartType === "height" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("height")}
              >
                <Ruler className="mr-2 h-4 w-4" />
                Height
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>
            {chartType === "weight" ? "Weight" : "Height"} Progression - {currentAnimal.name}
          </CardTitle>
          <CardDescription>
            {chartType === "weight" ? "Weight" : "Height"} tracking over the selected time period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" tickFormatter={formatDate} className="text-muted-foreground" />
                <YAxis
                  tickFormatter={chartType === "weight" ? formatWeight : formatHeight}
                  className="text-muted-foreground"
                />
                <Tooltip
                  labelFormatter={(value) => `Date: ${formatDate(value)}`}
                  formatter={(value) => [
                    chartType === "weight" ? formatWeight(value) : formatHeight(value),
                    chartType === "weight" ? "Weight" : "Height",
                  ]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={chartType}
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Growth Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Weight className="h-5 w-5 text-primary" />
              <span className="font-medium">Current Weight</span>
            </div>
            <div className="text-2xl font-bold text-primary">{currentData[currentData.length - 1]?.weight} lbs</div>
            <div className="text-sm text-muted-foreground">Latest measurement</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="font-medium">Weekly Growth</span>
            </div>
            <div className="text-2xl font-bold text-green-500">+{calculateGrowthRate()} lbs</div>
            <div className="text-sm text-muted-foreground">Average per week</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Ruler className="h-5 w-5 text-secondary" />
              <span className="font-medium">Current Height</span>
            </div>
            <div className="text-2xl font-bold text-secondary">{currentData[currentData.length - 1]?.height} in</div>
            <div className="text-sm text-muted-foreground">Latest measurement</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Days Tracked</span>
            </div>
            <div className="text-2xl font-bold text-blue-500">{currentData.length * 15}</div>
            <div className="text-sm text-muted-foreground">Total tracking period</div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Targets */}
      <Card>
        <CardHeader>
          <CardTitle>Growth Targets</CardTitle>
          <CardDescription>Set and track growth goals for {currentAnimal.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Weight Target</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current: {currentData[currentData.length - 1]?.weight} lbs</span>
                  <span>Target: 1300 lbs</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width: `${Math.min((currentData[currentData.length - 1]?.weight / 1300) * 100, 100)}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((currentData[currentData.length - 1]?.weight / 1300) * 100)}% of target reached
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Expected Timeline</h4>
              <div className="text-sm space-y-1">
                <p>
                  At current growth rate: <span className="font-medium">8 weeks</span>
                </p>
                <p>
                  Optimal growth rate: <span className="font-medium">6 weeks</span>
                </p>
                <p>
                  Target date: <span className="font-medium">May 15, 2024</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
