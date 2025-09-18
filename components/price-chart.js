"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { TrendingUp, BarChart3 } from "lucide-react"

const mockChartData = {
  tomatoes: [
    { date: "2024-01-01", price: 2.1, volume: 1200 },
    { date: "2024-01-15", price: 2.25, volume: 1350 },
    { date: "2024-02-01", price: 2.15, volume: 1100 },
    { date: "2024-02-15", price: 2.35, volume: 1450 },
    { date: "2024-03-01", price: 2.3, volume: 1300 },
    { date: "2024-03-15", price: 2.45, volume: 1500 },
  ],
  corn: [
    { date: "2024-01-01", price: 4.5, volume: 2800 },
    { date: "2024-01-15", price: 4.35, volume: 2650 },
    { date: "2024-02-01", price: 4.4, volume: 2700 },
    { date: "2024-02-15", price: 4.25, volume: 2500 },
    { date: "2024-03-01", price: 4.45, volume: 2900 },
    { date: "2024-03-15", price: 4.2, volume: 2400 },
  ],
  wheat: [
    { date: "2024-01-01", price: 6.2, volume: 1800 },
    { date: "2024-01-15", price: 6.35, volume: 1950 },
    { date: "2024-02-01", price: 6.5, volume: 2100 },
    { date: "2024-02-15", price: 6.45, volume: 2000 },
    { date: "2024-03-01", price: 6.7, volume: 2200 },
    { date: "2024-03-15", price: 6.85, volume: 2350 },
  ],
}

const timeRanges = [
  { label: "1 Week", value: "1w" },
  { label: "1 Month", value: "1m" },
  { label: "3 Months", value: "3m" },
  { label: "6 Months", value: "6m" },
  { label: "1 Year", value: "1y" },
]

export function PriceChart() {
  const [selectedCrop, setSelectedCrop] = useState("tomatoes")
  const [selectedRange, setSelectedRange] = useState("3m")
  const [chartType, setChartType] = useState("price")

  const currentData = mockChartData[selectedCrop] || mockChartData.tomatoes

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const formatPrice = (value) => `$${value.toFixed(2)}`
  const formatVolume = (value) => `${(value / 1000).toFixed(1)}K`

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Price Charts
          </CardTitle>
          <CardDescription>Historical price trends and trading volume analysis</CardDescription>
        </CardHeader>
      </Card>

      {/* Chart Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Crop:</label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tomatoes">Tomatoes</SelectItem>
                  <SelectItem value="corn">Corn</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Time Range:</label>
              <Select value={selectedRange} onValueChange={setSelectedRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={chartType === "price" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("price")}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Price
              </Button>
              <Button
                variant={chartType === "volume" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("volume")}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Volume
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Chart */}
      {chartType === "price" && (
        <Card>
          <CardHeader>
            <CardTitle>Price Trend - {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)}</CardTitle>
            <CardDescription>Historical price movement over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" tickFormatter={formatDate} className="text-muted-foreground" />
                  <YAxis tickFormatter={formatPrice} className="text-muted-foreground" />
                  <Tooltip
                    labelFormatter={(value) => `Date: ${formatDate(value)}`}
                    formatter={(value) => [formatPrice(value), "Price"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Volume Chart */}
      {chartType === "volume" && (
        <Card>
          <CardHeader>
            <CardTitle>Trading Volume - {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)}</CardTitle>
            <CardDescription>Trading volume over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" tickFormatter={formatDate} className="text-muted-foreground" />
                  <YAxis tickFormatter={formatVolume} className="text-muted-foreground" />
                  <Tooltip
                    labelFormatter={(value) => `Date: ${formatDate(value)}`}
                    formatter={(value) => [formatVolume(value), "Volume"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="volume" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="font-medium">Highest Price</span>
            </div>
            <div className="text-2xl font-bold text-green-500">
              ${Math.max(...currentData.map((d) => d.price)).toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">in selected period</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-red-500 rotate-180" />
              <span className="font-medium">Lowest Price</span>
            </div>
            <div className="text-2xl font-bold text-red-500">
              ${Math.min(...currentData.map((d) => d.price)).toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">in selected period</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="font-medium">Average Price</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              ${(currentData.reduce((sum, d) => sum + d.price, 0) / currentData.length).toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">in selected period</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
