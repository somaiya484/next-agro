"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Gavel, Clock, MapPin, Star, TrendingUp, AlertTriangle } from "lucide-react"
import Image from "next/image"

const mockBidHistory = [
  { bidder: "Farm Buyer 1", amount: 3.2, time: "2 minutes ago" },
  { bidder: "Organic Foods Co.", amount: 3.15, time: "5 minutes ago" },
  { bidder: "Local Market", amount: 3.1, time: "8 minutes ago" },
  { bidder: "Farm Buyer 1", amount: 3.05, time: "12 minutes ago" },
  { bidder: "Green Grocers", amount: 3.0, time: "15 minutes ago" },
]

export function BidModal({ open, onOpenChange, auction }) {
  const [bidAmount, setBidAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!auction) return null

  const minBidAmount = auction.currentBid + 0.05
  const isValidBid = Number.parseFloat(bidAmount) >= minBidAmount

  const handleSubmitBid = async () => {
    if (!isValidBid) return

    setIsSubmitting(true)
    // Simulate bid submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Bid submitted:", { auctionId: auction.id, amount: Number.parseFloat(bidAmount) })
    setIsSubmitting(false)
    setBidAmount("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gavel className="h-5 w-5" />
            Place Bid - {auction.title}
          </DialogTitle>
          <DialogDescription>Review auction details and place your bid</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Auction Image and Basic Info */}
          <div className="flex gap-4">
            <Image
              src={auction.images[0] || "/placeholder.svg"}
              alt={auction.title}
              width={150}
              height={100}
              className="rounded-lg object-cover"
            />
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold">{auction.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{auction.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{auction.location}</span>
                </div>
                <Badge variant="outline">{auction.category}</Badge>
                <span className="font-medium">{auction.quantity}</span>
              </div>
            </div>
          </div>

          {/* Seller Info */}
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Avatar>
              <AvatarFallback>{auction.seller.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{auction.seller}</p>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-muted-foreground">{auction.sellerRating} rating</span>
              </div>
            </div>
          </div>

          {/* Current Auction Status */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-card border rounded-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Current Bid</p>
              <p className="text-2xl font-bold text-primary">${auction.currentBid.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Bids</p>
              <p className="text-2xl font-bold">{auction.bidCount}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Time Left</p>
              <div className="flex items-center justify-center gap-1">
                <Clock className="h-4 w-4" />
                <p className="text-lg font-bold">{auction.timeLeft}</p>
              </div>
            </div>
          </div>

          {/* Bid Form */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h4 className="font-semibold">Place Your Bid</h4>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bid-amount">Bid Amount (USD)</Label>
              <Input
                id="bid-amount"
                type="number"
                step="0.01"
                min={minBidAmount}
                placeholder={`Minimum: $${minBidAmount.toFixed(2)}`}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className={!isValidBid && bidAmount ? "border-destructive" : ""}
              />
              {bidAmount && !isValidBid && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Bid must be at least ${minBidAmount.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setBidAmount((minBidAmount + 0.1).toFixed(2))}
                variant="outline"
                size="sm"
                className="bg-transparent"
              >
                +$0.10
              </Button>
              <Button
                onClick={() => setBidAmount((minBidAmount + 0.25).toFixed(2))}
                variant="outline"
                size="sm"
                className="bg-transparent"
              >
                +$0.25
              </Button>
              <Button
                onClick={() => setBidAmount((minBidAmount + 0.5).toFixed(2))}
                variant="outline"
                size="sm"
                className="bg-transparent"
              >
                +$0.50
              </Button>
            </div>
          </div>

          {/* Bid History */}
          <div className="space-y-3">
            <h4 className="font-semibold">Recent Bids</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {mockBidHistory.map((bid, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{bid.bidder.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{bid.bidder}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">${bid.amount.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{bid.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSubmitBid} disabled={!isValidBid || isSubmitting} className="flex-1">
              {isSubmitting ? (
                <>
                  <LoadingSpinner className="mr-2 h-4 w-4" />
                  Placing Bid...
                </>
              ) : (
                `Place Bid - $${bidAmount || "0.00"}`
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
