"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormInput } from "@/components/form-input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Bell, Plus, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Trash2 } from "lucide-react"

const mockAlerts = [
  {
    id: 1,
    crop: "Tomatoes",
    condition: "above",
    targetPrice: 2.5,
    currentPrice: 2.45,
    status: "active",
    triggered: false,
    createdAt: "2024-03-15",
  },
  {
    id: 2,
    crop: "Corn",
    condition: "below",
    targetPrice: 4.0,
    currentPrice: 4.2,
    status: "active",
    triggered: false,
    createdAt: "2024-03-10",
  },
  {
    id: 3,
    crop: "Wheat",
    condition: "above",
    targetPrice: 6.5,
    currentPrice: 6.85,
    status: "triggered",
    triggered: true,
    triggeredAt: "2024-03-18",
    createdAt: "2024-03-05",
  },
  {
    id: 4,
    crop: "Soybeans",
    condition: "below",
    targetPrice: 12.0,
    currentPrice: 12.5,
    status: "paused",
    triggered: false,
    createdAt: "2024-03-12",
  },
]

const getStatusColor = (status) => {
  switch (status) {
    case "active":
      return "bg-primary text-primary-foreground"
    case "triggered":
      return "bg-secondary text-secondary-foreground"
    case "paused":
      return "bg-muted text-muted-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getConditionIcon = (condition) => {
  return condition === "above" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />
}

export function MarketAlerts() {
  const [alerts, setAlerts] = useState(mockAlerts)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const toggleAlert = (id) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, status: alert.status === "active" ? "paused" : "active" } : alert,
      ),
    )
  }

  const deleteAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Price Alerts
              </CardTitle>
              <CardDescription>Get notified when crop prices reach your target levels</CardDescription>
            </div>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Alert
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Price Alert</DialogTitle>
                  <DialogDescription>Set up a new price alert for your selected crop</DialogDescription>
                </DialogHeader>
                <AddAlertForm onClose={() => setIsAddModalOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Active Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alerts.map((alert) => (
          <Card key={alert.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getConditionIcon(alert.condition)}
                  <span className="font-semibold">{alert.crop}</span>
                </div>
                <Badge className={getStatusColor(alert.status)}>{alert.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Target Price</p>
                  <p className="font-bold text-lg">${alert.targetPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Current Price</p>
                  <p className="font-bold text-lg">${alert.currentPrice.toFixed(2)}</p>
                </div>
              </div>

              <div className="text-sm">
                <p className="text-muted-foreground">Condition</p>
                <p className="font-medium">
                  Alert when price goes {alert.condition} ${alert.targetPrice.toFixed(2)}
                </p>
              </div>

              {alert.triggered && (
                <div className="flex items-center gap-2 p-2 bg-secondary/20 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span className="text-sm">Triggered on {new Date(alert.triggeredAt).toLocaleDateString()}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={alert.status === "active"}
                    onCheckedChange={() => toggleAlert(alert.id)}
                    disabled={alert.triggered}
                  />
                  <span className="text-sm">{alert.status === "active" ? "Active" : "Paused"}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => deleteAlert(alert.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Bell className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{alerts.filter((a) => a.status === "active").length}</p>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-8 w-8 text-secondary" />
              <div>
                <p className="text-2xl font-bold">{alerts.filter((a) => a.triggered).length}</p>
                <p className="text-sm text-muted-foreground">Triggered</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{alerts.filter((a) => a.status === "paused").length}</p>
                <p className="text-sm text-muted-foreground">Paused</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{alerts.length}</p>
                <p className="text-sm text-muted-foreground">Total Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AddAlertForm({ onClose }) {
  const [formData, setFormData] = useState({
    crop: "",
    condition: "",
    targetPrice: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("New alert:", formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Crop *</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, crop: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select crop" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tomatoes">Tomatoes</SelectItem>
            <SelectItem value="corn">Corn</SelectItem>
            <SelectItem value="wheat">Wheat</SelectItem>
            <SelectItem value="soybeans">Soybeans</SelectItem>
            <SelectItem value="potatoes">Potatoes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Condition *</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, condition: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="above">Price goes above</SelectItem>
            <SelectItem value="below">Price goes below</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <FormInput
        label="Target Price"
        type="number"
        step="0.01"
        placeholder="0.00"
        required
        value={formData.targetPrice}
        onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
      />

      <div className="flex gap-4 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Create Alert
        </Button>
      </div>
    </form>
  )
}
