import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/data-table"
import { TrendingUp, TrendingDown, CheckCircle, XCircle } from "lucide-react"

const mockHistoryData = [
  {
    id: 1,
    title: "Organic Carrots",
    seller: "Sunny Acres Farm",
    finalPrice: 1.85,
    myBid: 1.75,
    winner: "Fresh Market Co.",
    endDate: "2024-03-18",
    status: "lost",
    quantity: "800 lbs",
  },
  {
    id: 2,
    title: "Sweet Potatoes",
    seller: "Valley Farms",
    finalPrice: 2.1,
    myBid: 2.1,
    winner: "You",
    endDate: "2024-03-17",
    status: "won",
    quantity: "500 lbs",
  },
  {
    id: 3,
    title: "Fresh Lettuce",
    seller: "Green Leaf Gardens",
    finalPrice: 1.95,
    myBid: 1.8,
    winner: "Organic Foods Ltd.",
    endDate: "2024-03-16",
    status: "lost",
    quantity: "300 heads",
  },
  {
    id: 4,
    title: "Roma Tomatoes",
    seller: "Harvest Moon Farm",
    finalPrice: 2.65,
    myBid: 2.65,
    winner: "You",
    endDate: "2024-03-15",
    status: "won",
    quantity: "1000 lbs",
  },
  {
    id: 5,
    title: "Bell Peppers",
    seller: "Sunshine Produce",
    finalPrice: 3.2,
    myBid: 3.0,
    winner: "Farm Fresh Market",
    endDate: "2024-03-14",
    status: "lost",
    quantity: "400 lbs",
  },
]

const getStatusIcon = (status) => {
  return status === "won" ? (
    <CheckCircle className="h-4 w-4 text-green-500" />
  ) : (
    <XCircle className="h-4 w-4 text-red-500" />
  )
}

const getStatusColor = (status) => {
  return status === "won"
    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
}

export function AuctionHistory() {
  const columns = [
    {
      header: "Auction",
      accessorKey: "title",
      cell: (row) => (
        <div>
          <div className="font-medium">{row.title}</div>
          <div className="text-sm text-muted-foreground">{row.seller}</div>
        </div>
      ),
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
    },
    {
      header: "My Bid",
      accessorKey: "myBid",
      cell: (row) => <span className="font-medium">${row.myBid.toFixed(2)}</span>,
    },
    {
      header: "Final Price",
      accessorKey: "finalPrice",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <span className="font-bold">${row.finalPrice.toFixed(2)}</span>
          {row.finalPrice > row.myBid ? (
            <TrendingUp className="h-3 w-3 text-red-500" />
          ) : (
            <TrendingDown className="h-3 w-3 text-green-500" />
          )}
        </div>
      ),
    },
    {
      header: "Winner",
      accessorKey: "winner",
      cell: (row) => <span className={row.winner === "You" ? "font-bold text-primary" : ""}>{row.winner}</span>,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <Badge className={getStatusColor(row.status)}>
          <div className="flex items-center gap-1">
            {getStatusIcon(row.status)}
            {row.status === "won" ? "Won" : "Lost"}
          </div>
        </Badge>
      ),
    },
    {
      header: "End Date",
      accessorKey: "endDate",
      cell: (row) => new Date(row.endDate).toLocaleDateString(),
    },
  ]

  const wonAuctions = mockHistoryData.filter((auction) => auction.status === "won").length
  const totalBids = mockHistoryData.length
  const winRate = ((wonAuctions / totalBids) * 100).toFixed(1)
  const totalSpent = mockHistoryData
    .filter((auction) => auction.status === "won")
    .reduce((sum, auction) => sum + auction.finalPrice, 0)

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{wonAuctions}</p>
                <p className="text-sm text-muted-foreground">Auctions Won</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{totalBids}</p>
                <p className="text-sm text-muted-foreground">Total Bids</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-secondary" />
              <div>
                <p className="text-2xl font-bold">{winRate}%</p>
                <p className="text-sm text-muted-foreground">Win Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Auction History</CardTitle>
          <CardDescription>Your complete bidding history and results</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={mockHistoryData} />
        </CardContent>
      </Card>
    </div>
  )
}
