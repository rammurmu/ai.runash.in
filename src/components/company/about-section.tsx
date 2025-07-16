

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function AboutSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              About the program
            </Badge>
            <h2 className="text-4xl font-bold mb-8">About the program</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                RunAsh AI Residency is designed to help bridge exceptional researchers from diverse backgrounds into AI
                research. Residents work closely with our research team on cutting-edge projects in artificial
                intelligence, with a focus on safety, alignment, and beneficial AI systems.
              </p>
              <p className="mt-6">
                The program provides mentorship, resources, and the opportunity to contribute to groundbreaking research
                that will shape the future of AI. We're looking for individuals who are passionate about AI research and
                committed to our mission of ensuring AI benefits all of humanity.
              </p>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-0 shadow-lg">
            <CardContent className="p-12">
              <blockquote className="text-2xl font-medium text-center italic mb-8">
                "This program is an excellent way for people who are curious, passionate, and driven to get hands-on
                experience with AI and machine learning—and to help us build the future."
              </blockquote>
              <div className="text-center">
                <div className="font-semibold">Sarah Chen</div>
                <div className="text-muted-foreground">Research Director</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
