"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { AuctionCard } from "@/components/auction-card"
import { BidModal } from "@/components/bid-modal"
import { AuctionHistory } from "@/components/auction-history"
import { CreateAuctionModal } from "@/components/create-auction-modal"
import { Gavel, Plus, Clock, DollarSign, TrendingUp, Users, Search, Filter } from "lucide-react"

const mockAuctions = [
  {
    id: 1,
    title: "Premium Organic Tomatoes",
    description: "Fresh organic tomatoes, Grade A quality, harvested this morning",
    seller: "Green Valley Farm",
    sellerRating: 4.8,
    quantity: "500 lbs",
    startingBid: 2.5,
    currentBid: 3.2,
    bidCount: 12,
    timeLeft: "2h 45m",
    endTime: "2024-03-20T18:30:00Z",
    status: "active",
    category: "Vegetables",
    location: "California",
    images: ["/organic-tomatoes.png"],
  },
  {
    id: 2,
    title: "Sweet Corn Harvest",
    description: "Fresh sweet corn, perfect for retail or processing",
    seller: "Midwest Grains Co.",
    sellerRating: 4.6,
    quantity: "2000 bushels",
    startingBid: 4.0,
    currentBid: 4.75,
    bidCount: 8,
    timeLeft: "1d 12h",
    endTime: "2024-03-21T12:00:00Z",
    status: "active",
    category: "Grains",
    location: "Iowa",
    images: ["/sweet-corn-harvest.jpg"],
  },
  {
    id: 3,
    title: "Winter Wheat Premium Grade",
    description: "High-quality winter wheat, excellent for milling",
    seller: "Prairie Farms LLC",
    sellerRating: 4.9,
    quantity: "5000 bushels",
    startingBid: 6.0,
    currentBid: 6.85,
    bidCount: 15,
    timeLeft: "3h 20m",
    endTime: "2024-03-20T19:45:00Z",
    status: "active",
    category: "Grains",
    location: "Kansas",
    images: ["/winter-wheat-grain.jpg"],
  },
  {
    id: 4,
    title: "Organic Soybeans",
    description: "Certified organic soybeans, non-GMO",
    seller: "Sustainable Acres",
    sellerRating: 4.7,
    quantity: "1500 bushels",
    startingBid: 12.0,
    currentBid: 13.25,
    bidCount: 6,
    timeLeft: "5d 8h",
    endTime: "2024-03-25T10:00:00Z",
    status: "active",
    category: "Legumes",
    location: "Illinois",
    images: ["/organic-soybeans.jpg"],
  },
  {
    id: 5,
    title: "Fresh Potatoes",
    description: "Russet potatoes, perfect for restaurants and retail",
    seller: "Mountain View Farm",
    sellerRating: 4.5,
    quantity: "3000 lbs",
    startingBid: 0.8,
    currentBid: 0.95,
    bidCount: 9,
    timeLeft: "Ended",
    endTime: "2024-03-19T16:00:00Z",
    status: "ended",
    category: "Vegetables",
    location: "Idaho",
    images: ["/russet-potatoes.jpg"],
  },
]

const auctionStats = [
  {
    title: "Active Auctions",
    value: "24",
    change: "+3",
    trend: "up",
    icon: Gavel,
  },
  {
    title: "Total Bids Today",
    value: "156",
    change: "+28",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Average Price",
    value: "$4.85",
    change: "+0.15",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Active Bidders",
    value: "89",
    change: "+12",
    trend: "up",
    icon: Users,
  },
]

export default function AuctionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAuction, setSelectedAuction] = useState(null)
  const [isBidModalOpen, setIsBidModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const categories = ["All Categories", "Vegetables", "Grains", "Fruits", "Legumes", "Herbs"]
  const statuses = ["All Status", "Active", "Ending Soon", "Ended"]

  const filteredAuctions = mockAuctions.filter((auction) => {
    const categoryMatch = selectedCategory === "all" || auction.category.toLowerCase() === selectedCategory
    const statusMatch = selectedStatus === "all" || auction.status === selectedStatus.toLowerCase()
    const searchMatch = searchTerm === "" || auction.title.toLowerCase().includes(searchTerm.toLowerCase())
    return categoryMatch && statusMatch && searchMatch
  })

  const handleBidClick = (auction) => {
    setSelectedAuction(auction)
    setIsBidModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gavel className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Auction System</h1>
                <p className="text-muted-foreground">Buy and sell agricultural products through live auctions</p>
              </div>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Auction
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {auctionStats.map((stat, index) => (
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

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Active Auctions
            </TabsTrigger>
            <TabsTrigger value="my-bids" className="flex items-center gap-2">
              <Gavel className="h-4 w-4" />
              My Bids
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Auction History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter Auctions
                </CardTitle>
                <CardDescription>Find auctions by category, status, and keywords</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search auctions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category === "All Categories" ? "all" : category.toLowerCase()}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status === "All Status" ? "all" : status.toLowerCase()}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button variant="outline" className="bg-transparent">
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Auction Listings */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">
                  Auction Listings ({filteredAuctions.length} {filteredAuctions.length === 1 ? "auction" : "auctions"})
                </h3>
                <Select defaultValue="ending-soon">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ending-soon">Ending Soon</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} onBidClick={() => handleBidClick(auction)} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="my-bids">
            <Card>
              <CardHeader>
                <CardTitle>My Active Bids</CardTitle>
                <CardDescription>Track your current bids and auction status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Gavel className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Your bid tracking will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <AuctionHistory />
          </TabsContent>
        </Tabs>
      </div>

      <BidModal open={isBidModalOpen} onOpenChange={setIsBidModalOpen} auction={selectedAuction} />

      <CreateAuctionModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
    </div>
  )
}
