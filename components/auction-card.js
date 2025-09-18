"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, MapPin, Gavel, Star, Eye } from "lucide-react"
import Image from "next/image"

const getStatusColor = (status) => {
  switch (status) {
    case "active":
      return "bg-primary text-primary-foreground"
    case "ending-soon":
      return "bg-destructive text-destructive-foreground"
    case "ended":
      return "bg-muted text-muted-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getTimeLeftColor = (timeLeft) => {
  if (timeLeft === "Ended") return "text-muted-foreground"
  if (timeLeft.includes("h") && !timeLeft.includes("d")) return "text-destructive"
  return "text-foreground"
}

export function AuctionCard({ auction, onBidClick }) {
  const isEnded = auction.status === "ended"
  const isEndingSoon = auction.timeLeft.includes("h") && !auction.timeLeft.includes("d")

  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative">
        <Image
          src={auction.images[0] || "/placeholder.svg"}
          alt={auction.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className={getStatusColor(isEndingSoon ? "ending-soon" : auction.status)}>
            {isEndingSoon ? "Ending Soon" : auction.status}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-black/50 text-white">
            {auction.category}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-1">{auction.title}</CardTitle>
        <CardDescription className="line-clamp-2">{auction.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Seller Info */}
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">{auction.seller.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{auction.seller}</span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-muted-foreground">{auction.sellerRating}</span>
          </div>
        </div>

        {/* Auction Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Quantity</p>
            <p className="font-medium">{auction.quantity}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Location</p>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <p className="font-medium">{auction.location}</p>
            </div>
          </div>
        </div>

        {/* Bidding Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Bid</span>
            <span className="text-lg font-bold text-primary">${auction.currentBid.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Gavel className="h-3 w-3" />
              <span className="text-muted-foreground">{auction.bidCount} bids</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span className={getTimeLeftColor(auction.timeLeft)}>{auction.timeLeft}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Eye className="mr-2 h-3 w-3" />
            View Details
          </Button>
          <Button size="sm" className="flex-1" onClick={onBidClick} disabled={isEnded}>
            {isEnded ? "Auction Ended" : "Place Bid"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
