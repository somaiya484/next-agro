import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Beaker, Leaf, Droplets, Zap } from "lucide-react"

const fertilizerData = [
  {
    name: "Nitrogen (N)",
    icon: Leaf,
    color: "text-green-500",
    purpose: "Promotes leafy growth and green color",
    deficiencySymptoms: ["Yellowing leaves", "Stunted growth", "Poor leaf development"],
    sources: ["Urea", "Ammonium sulfate", "Blood meal", "Fish emulsion"],
    applicationTiming: "Early growing season, before flowering",
    crops: ["Corn", "Leafy greens", "Grass crops"],
  },
  {
    name: "Phosphorus (P)",
    icon: Zap,
    color: "text-purple-500",
    purpose: "Root development and flower/fruit production",
    deficiencySymptoms: ["Purple leaf coloring", "Poor root growth", "Delayed flowering"],
    sources: ["Bone meal", "Rock phosphate", "Superphosphate"],
    applicationTiming: "At planting and during flowering",
    crops: ["Tomatoes", "Peppers", "Root vegetables"],
  },
  {
    name: "Potassium (K)",
    icon: Droplets,
    color: "text-blue-500",
    purpose: "Disease resistance and fruit quality",
    deficiencySymptoms: ["Brown leaf edges", "Weak stems", "Poor fruit quality"],
    sources: ["Potash", "Wood ash", "Kelp meal"],
    applicationTiming: "Throughout growing season",
    crops: ["Fruits", "Vegetables", "Flowering plants"],
  },
]

const pesticideData = [
  {
    name: "Neem Oil",
    type: "Organic",
    targets: ["Aphids", "Spider mites", "Whiteflies"],
    application: "Spray in early morning or evening",
    safety: "Low toxicity, safe for beneficial insects when dry",
    crops: ["Most vegetables and fruits"],
  },
  {
    name: "Bacillus thuringiensis (Bt)",
    type: "Biological",
    targets: ["Caterpillars", "Cabbage worms", "Corn borers"],
    application: "Apply when larvae are small",
    safety: "Safe for humans and beneficial insects",
    crops: ["Brassicas", "Corn", "Tomatoes"],
  },
  {
    name: "Diatomaceous Earth",
    type: "Organic",
    targets: ["Slugs", "Snails", "Crawling insects"],
    application: "Dust around plants, reapply after rain",
    safety: "Food-grade DE is safe for humans and pets",
    crops: ["All crops"],
  },
]

export function FertilizerGuide() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Beaker className="h-5 w-5" />
            Fertilizer & Pesticide Guide
          </CardTitle>
          <CardDescription>Essential nutrients and pest management solutions for healthy crops</CardDescription>
        </CardHeader>
      </Card>

      {/* Fertilizer Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Essential Nutrients</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {fertilizerData.map((nutrient) => (
            <Card key={nutrient.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <nutrient.icon className={`h-5 w-5 ${nutrient.color}`} />
                  {nutrient.name}
                </CardTitle>
                <CardDescription>{nutrient.purpose}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h5 className="font-medium mb-2">Deficiency Symptoms</h5>
                  <ul className="space-y-1">
                    {nutrient.deficiencySymptoms.map((symptom, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0" />
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Sources</h5>
                  <div className="flex flex-wrap gap-1">
                    {nutrient.sources.map((source) => (
                      <Badge key={source} variant="secondary" className="text-xs">
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Best Crops</h5>
                  <div className="flex flex-wrap gap-1">
                    {nutrient.crops.map((crop) => (
                      <Badge key={crop} variant="outline" className="text-xs">
                        {crop}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    <strong>Timing:</strong> {nutrient.applicationTiming}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Pesticide Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Organic Pest Control</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pesticideData.map((pesticide) => (
            <Card key={pesticide.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{pesticide.name}</CardTitle>
                <Badge variant="outline" className="w-fit">
                  {pesticide.type}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h5 className="font-medium mb-2">Targets</h5>
                  <div className="flex flex-wrap gap-1">
                    {pesticide.targets.map((target) => (
                      <Badge key={target} variant="destructive" className="text-xs">
                        {target}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-1">Application</h5>
                  <p className="text-sm text-muted-foreground">{pesticide.application}</p>
                </div>

                <div>
                  <h5 className="font-medium mb-1">Safety</h5>
                  <p className="text-sm text-muted-foreground">{pesticide.safety}</p>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Suitable Crops</h5>
                  <div className="flex flex-wrap gap-1">
                    {pesticide.crops.map((crop) => (
                      <Badge key={crop} variant="secondary" className="text-xs">
                        {crop}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Application Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>Application Rate Calculator</CardTitle>
          <CardDescription>Calculate the right amount of fertilizer or pesticide for your field</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-muted/50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Beaker className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Interactive calculator coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
