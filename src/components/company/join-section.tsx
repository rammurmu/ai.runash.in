

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function JoinSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Join us in shaping the future of technology.
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Be part of a team that's pushing the boundaries of what's possible with artificial intelligence.
          </p>

          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-muted-foreground">Open Positions</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
                  <div className="text-muted-foreground">Countries</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">100%</div>
                  <div className="text-muted-foreground">Remote Friendly</div>
                </div>
              </div>

              <div className="mt-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mr-4"
                >
                  View Open Roles
                </Button>
                <Button size="lg" variant="outline">
                  Learn About Our Culture
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
