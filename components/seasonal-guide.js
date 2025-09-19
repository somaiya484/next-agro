import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sun, Snowflake, Leaf, Sprout, Scissors, Droplets } from "lucide-react"

const seasonalData = [
  {
    season: "Spring",
    icon: Leaf,
    color: "text-green-500",
    months: ["March", "April", "May"],
    activities: [
      {
        type: "Planting",
        icon: Sprout,
        crops: ["Tomatoes", "Peppers", "Corn", "Beans"],
        description: "Ideal time for warm-season crops after last frost",
      },
      {
        type: "Soil Preparation",
        icon: Droplets,
        crops: ["All crops"],
        description: "Test soil pH and add organic matter",
      },
    ],
    tips: [
      "Monitor soil temperature before planting",
      "Start seeds indoors 6-8 weeks before last frost",
      "Prepare irrigation systems",
    ],
  },
  {
    season: "Summer",
    icon: Sun,
    color: "text-yellow-500",
    months: ["June", "July", "August"],
    activities: [
      {
        type: "Maintenance",
        icon: Droplets,
        crops: ["All growing crops"],
        description: "Regular watering, weeding, and pest management",
      },
      {
        type: "Harvesting",
        icon: Scissors,
        crops: ["Early tomatoes", "Summer squash", "Herbs"],
        description: "Harvest crops at peak ripeness",
      },
    ],
    tips: [
      "Water deeply but less frequently",
      "Mulch around plants to retain moisture",
      "Monitor for heat stress in plants",
    ],
  },
  {
    season: "Fall",
    icon: Leaf,
    color: "text-orange-500",
    months: ["September", "October", "November"],
    activities: [
      {
        type: "Harvesting",
        icon: Scissors,
        crops: ["Corn", "Pumpkins", "Winter squash", "Root vegetables"],
        description: "Major harvest season for many crops",
      },
      {
        type: "Planting",
        icon: Sprout,
        crops: ["Winter wheat", "Cover crops"],
        description: "Plant cool-season and winter crops",
      },
    ],
    tips: ["Harvest before first hard frost", "Cure and store crops properly", "Plant cover crops to protect soil"],
  },
  {
    season: "Winter",
    icon: Snowflake,
    color: "text-blue-500",
    months: ["December", "January", "February"],
    activities: [
      {
        type: "Planning",
        icon: Leaf,
        crops: ["Next year's crops"],
        description: "Plan crop rotations and order seeds",
      },
      {
        type: "Maintenance",
        icon: Droplets,
        crops: ["Equipment and infrastructure"],
        description: "Maintain tools and repair structures",
      },
    ],
    tips: [
      "Review this year's records and plan improvements",
      "Attend agricultural workshops and conferences",
      "Maintain and repair equipment",
    ],
  },
]

export function SeasonalGuide() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5" />
            Seasonal Farming Guide
          </CardTitle>
          <CardDescription>Year-round guidance for optimal crop management</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {seasonalData.map((season) => (
          <Card key={season.season} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <season.icon className={`h-6 w-6 ${season.color}`} />
                {season.season}
              </CardTitle>
              <CardDescription>
                <div className="flex gap-2 mt-2">
                  {season.months.map((month) => (
                    <Badge key={month} variant="outline">
                      {month}
                    </Badge>
                  ))}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Activities */}
              <div>
                <h4 className="font-semibold mb-3">Key Activities</h4>
                <div className="space-y-3">
                  {season.activities.map((activity, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <activity.icon className="h-4 w-4 text-primary" />
                        <span className="font-medium">{activity.type}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {activity.crops.map((crop) => (
                          <Badge key={crop} variant="secondary" className="text-xs">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div>
                <h4 className="font-semibold mb-3">Seasonal Tips</h4>
                <ul className="space-y-2">
                  {season.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
