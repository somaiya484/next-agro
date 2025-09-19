"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/data-table"
import { PriceChart } from "@/components/price-chart"
import { MarketAlerts } from "@/components/market-alerts"
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Bell, Filter, Search } from "lucide-react"

const mockPriceData = [
  {
    id: 1,
    crop: "Tomatoes",
    variety: "Roma",
    price: 2.45,
    unit: "per lb",
    change: 0.15,
    changePercent: 6.5,
    location: "California",
    market: "Wholesale",
    lastUpdated: "2024-03-20T10:30:00Z",
    quality: "Grade A",
  },
  {
    id: 2,
    crop: "Corn",
    variety: "Sweet Corn",
    price: 4.2,
    unit: "per bushel",
    change: -0.25,
    changePercent: -5.6,
    location: "Iowa",
    market: "Commodity",
    lastUpdated: "2024-03-20T09:15:00Z",
    quality: "Grade A",
  },
  {
    id: 3,
    crop: "Wheat",
    variety: "Winter Wheat",
    price: 6.85,
    unit: "per bushel",
    change: 0.35,
    changePercent: 5.4,
    location: "Kansas",
    market: "Commodity",
    lastUpdated: "2024-03-20T11:00:00Z",
    quality: "Grade A",
  },
  {
    id: 4,
    crop: "Soybeans",
    variety: "Non-GMO",
    price: 12.5,
    unit: "per bushel",
    change: 0.75,
    changePercent: 6.4,
    location: "Illinois",
    market: "Commodity",
    lastUpdated: "2024-03-20T10:45:00Z",
    quality: "Grade A",
  },
  {
    id: 5,
    crop: "Potatoes",
    variety: "Russet",
    price: 0.89,
    unit: "per lb",
    change: -0.05,
    changePercent: -5.3,
    location: "Idaho",
    market: "Retail",
    lastUpdated: "2024-03-20T08:30:00Z",
    quality: "Grade A",
  },
]

const marketSummary = [
  {
    title: "Average Price",
    value: "$5.18",
    change: "+2.3%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Active Markets",
    value: "24",
    change: "+3",
    trend: "up",
    icon: BarChart3,
  },
  {
    title: "Price Alerts",
    value: "7",
    change: "+2",
    trend: "up",
    icon: Bell,
  },
  {
    title: "Trending Up",
    value: "12",
    change: "+5",
    trend: "up",
    icon: TrendingUp,
  },
]

export default function MarketPage() {
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedCrop, setSelectedCrop] = useState("all")
  const [selectedMarket, setSelectedMarket] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const locations = ["All Locations", "California", "Iowa", "Kansas", "Illinois", "Idaho", "Texas", "Florida"]
  const crops = ["All Crops", "Tomatoes", "Corn", "Wheat", "Soybeans", "Potatoes", "Rice", "Cotton"]
  const markets = ["All Markets", "Wholesale", "Retail", "Commodity", "Organic", "Local"]

  const filteredData = mockPriceData.filter((item) => {
    const locationMatch = selectedLocation === "all" || item.location === selectedLocation
    const cropMatch = selectedCrop === "all" || item.crop === selectedCrop
    const marketMatch = selectedMarket === "all" || item.market === selectedMarket
    const searchMatch = searchTerm === "" || item.crop.toLowerCase().includes(searchTerm.toLowerCase())
    return locationMatch && cropMatch && marketMatch && searchMatch
  })

  const columns = [
    {
      header: "Crop",
      accessorKey: "crop",
      cell: (row) => (
        <div>
          <div className="font-medium">{row.crop}</div>
          <div className="text-sm text-muted-foreground">{row.variety}</div>
        </div>
      ),
    },
    {
      header: "Price",
      accessorKey: "price",
      cell: (row) => (
        <div>
          <div className="font-bold text-lg">${row.price}</div>
          <div className="text-sm text-muted-foreground">{row.unit}</div>
        </div>
      ),
    },
    {
      header: "Change",
      accessorKey: "change",
      cell: (row) => (
        <div className="flex items-center gap-1">
          {row.change > 0 ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span className={row.change > 0 ? "text-green-500" : "text-red-500"}>
            {row.change > 0 ? "+" : ""}
            {row.change} ({row.changePercent}%)
          </span>
        </div>
      ),
    },
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Market",
      accessorKey: "market",
      cell: (row) => <Badge variant="outline">{row.market}</Badge>,
    },
    {
      header: "Quality",
      accessorKey: "quality",
      cell: (row) => <Badge variant="secondary">{row.quality}</Badge>,
    },
    {
      header: "Updated",
      accessorKey: "lastUpdated",
      cell: (row) => (
        <div className="text-sm text-muted-foreground">
          {new Date(row.lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Market Prices</h1>
                <p className="text-muted-foreground">Real-time agricultural commodity prices and trends</p>
              </div>
            </div>
            <Button>
              <Bell className="mr-2 h-4 w-4" />
              Set Price Alert
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Market Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {marketSummary.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <item.icon className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{item.value}</p>
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {item.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      )}
                      <span className={`text-xs ${item.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                        {item.change}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="prices" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="prices" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Current Prices
            </TabsTrigger>
            <TabsTrigger value="charts" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Price Charts
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Price Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prices" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter Prices
                </CardTitle>
                <CardDescription>Filter market prices by location, crop type, and market</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search crops..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location === "All Locations" ? "all" : location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {crops.map((crop) => (
                        <SelectItem key={crop} value={crop === "All Crops" ? "all" : crop}>
                          {crop}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select market" />
                    </SelectTrigger>
                    <SelectContent>
                      {markets.map((market) => (
                        <SelectItem key={market} value={market === "All Markets" ? "all" : market}>
                          {market}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Price Table */}
            <Card>
              <CardHeader>
                <CardTitle>Current Market Prices</CardTitle>
                <CardDescription>
                  Showing {filteredData.length} of {mockPriceData.length} price listings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={filteredData} searchable={false} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="charts">
            <PriceChart />
          </TabsContent>

          <TabsContent value="alerts">
            <MarketAlerts />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
