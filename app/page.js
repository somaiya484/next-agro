import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sprout, TrendingUp, Gavel, Heart, Users, GraduationCap, Shield, ArrowRight } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Sprout,
      title: "Crop Management",
      description: "Track your crops, manage schedules, and get AI-powered suggestions",
      href: "/crops",
    },
    {
      icon: TrendingUp,
      title: "Market Prices",
      description: "Real-time market price tracking and analysis",
      href: "/market",
    },
    {
      icon: Gavel,
      title: "Auction System",
      description: "Buy and sell agricultural products through our auction platform",
      href: "/auctions",
    },
    {
      icon: Heart,
      title: "Livestock Management",
      description: "Manage your livestock health, vaccination schedules, and growth",
      href: "/livestock",
    },
    {
      icon: GraduationCap,
      title: "Youth Support",
      description: "Resources and guidance for young agripreneurs",
      href: "/youth",
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other farmers and agricultural experts",
      href: "/forum",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">NextAgroHub</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Modern Agriculture Management Platform
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Empower your agricultural journey with comprehensive tools for crop management, market analysis, livestock
            tracking, and community collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">Everything You Need to Succeed</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={feature.href}>
                    <Button variant="ghost" className="w-full justify-start p-0">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Access */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Admin Access</CardTitle>
              <CardDescription>Manage users, crops, auctions, and forum content</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin">
                <Button variant="outline" className="w-full bg-transparent">
                  Admin Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 NextAgroHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
