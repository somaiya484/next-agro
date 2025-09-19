"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Calendar, Weight, Eye } from "lucide-react"

export function LivestockCard({ animal, onSelect, healthColor, statusColor }) {
  const getAnimalIcon = (type) => {
    // In a real app, you might use different icons for different animal types
    return <Heart className="h-5 w-5 text-primary" />
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {getAnimalIcon(animal.type)}
            {animal.name}
          </CardTitle>
          <Badge className={statusColor}>{animal.status}</Badge>
        </div>
        <CardDescription>
          {animal.breed} {animal.type} • {animal.gender}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Age</p>
            <p className="font-medium">{animal.age}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Weight</p>
            <div className="flex items-center gap-1">
              <Weight className="h-3 w-3" />
              <p className="font-medium">{animal.weight}</p>
            </div>
          </div>
          <div>
            <p className="text-muted-foreground">Ear Tag</p>
            <p className="font-medium">{animal.earTag}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Health</p>
            <p className={`font-medium ${healthColor}`}>{animal.health}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last Checkup</span>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(animal.lastCheckup).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Vaccinations</span>
            <Badge variant={animal.vaccinations === "Up to date" ? "secondary" : "destructive"}>
              {animal.vaccinations}
            </Badge>
          </div>
        </div>

        <div className="flex gap-2 pt-2 border-t">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={onSelect}>
            <Eye className="mr-2 h-3 w-3" />
            View Details
          </Button>
          <Button size="sm" className="flex-1">
            Update Record
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
