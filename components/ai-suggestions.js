"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Brain, Lightbulb, TrendingUp, AlertTriangle, CheckCircle, MessageSquare } from "lucide-react"

const mockSuggestions = [
  {
    id: 1,
    type: "optimization",
    priority: "high",
    title: "Optimize Tomato Watering Schedule",
    description: "Based on weather data and soil moisture, reduce watering frequency by 20% to prevent root rot.",
    impact: "Reduce water usage by 15% while improving plant health",
    confidence: 92,
  },
  {
    id: 2,
    type: "pest_alert",
    priority: "medium",
    title: "Aphid Risk Alert",
    description: "Weather conditions favor aphid development. Consider preventive neem oil application.",
    impact: "Prevent potential 30% yield loss from aphid damage",
    confidence: 78,
  },
  {
    id: 3,
    type: "harvest",
    priority: "high",
    title: "Optimal Harvest Window",
    description: "Wheat crop will reach optimal harvest moisture content in 3-5 days based on weather forecast.",
    impact: "Maximize grain quality and market price",
    confidence: 95,
  },
  {
    id: 4,
    type: "fertilizer",
    priority: "low",
    title: "Nitrogen Application Timing",
    description: "Delay nitrogen application by 1 week due to upcoming rain forecast.",
    impact: "Improve nutrient uptake efficiency by 12%",
    confidence: 85,
  },
]

const getSuggestionIcon = (type) => {
  switch (type) {
    case "optimization":
      return <TrendingUp className="h-4 w-4" />
    case "pest_alert":
      return <AlertTriangle className="h-4 w-4" />
    case "harvest":
      return <CheckCircle className="h-4 w-4" />
    case "fertilizer":
      return <Lightbulb className="h-4 w-4" />
    default:
      return <Brain className="h-4 w-4" />
  }
}

const getSuggestionColor = (type) => {
  switch (type) {
    case "optimization":
      return "bg-primary text-primary-foreground"
    case "pest_alert":
      return "bg-destructive text-destructive-foreground"
    case "harvest":
      return "bg-secondary text-secondary-foreground"
    case "fertilizer":
      return "bg-blue-500 text-white"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "bg-destructive text-destructive-foreground"
    case "medium":
      return "bg-yellow-500 text-white"
    case "low":
      return "bg-muted text-muted-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function AISuggestions() {
  const [question, setQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAskQuestion = async () => {
    if (!question.trim()) return
    setIsLoading(true)
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setQuestion("")
    // In a real app, this would add the response to suggestions
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI-Powered Suggestions
          </CardTitle>
          <CardDescription>Get intelligent recommendations based on your farm data and conditions</CardDescription>
        </CardHeader>
      </Card>

      {/* Ask AI */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Ask the AI Assistant
          </CardTitle>
          <CardDescription>Get personalized advice for your specific farming questions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Ask about crop management, pest control, fertilization, or any farming question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
          />
          <Button onClick={handleAskQuestion} disabled={isLoading || !question.trim()}>
            {isLoading ? "Processing..." : "Get AI Advice"}
          </Button>
        </CardContent>
      </Card>

      {/* Current Suggestions */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Current Recommendations</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockSuggestions.map((suggestion) => (
            <Card key={suggestion.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={getSuggestionColor(suggestion.type)}>{getSuggestionIcon(suggestion.type)}</Badge>
                    <Badge className={getPriorityColor(suggestion.priority)}>{suggestion.priority}</Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Confidence</div>
                    <div className="text-lg font-bold text-primary">{suggestion.confidence}%</div>
                  </div>
                </div>
                <CardTitle className="text-lg">{suggestion.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{suggestion.description}</p>

                <div className="bg-muted/50 rounded-lg p-3">
                  <h5 className="font-medium mb-1">Expected Impact</h5>
                  <p className="text-sm text-muted-foreground">{suggestion.impact}</p>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    Apply Suggestion
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Farm Performance Insights</CardTitle>
          <CardDescription>AI analysis of your farm's performance and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">+12%</div>
              <div className="text-sm text-muted-foreground">Yield Improvement</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Lightbulb className="h-8 w-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-secondary">-8%</div>
              <div className="text-sm text-muted-foreground">Resource Usage</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-500">94%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
