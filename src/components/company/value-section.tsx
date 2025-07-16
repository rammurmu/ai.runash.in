

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Lightbulb, Globe } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "We prioritize the development of safe and beneficial AI systems that align with human values.",
  },
  {
    icon: Users,
    title: "Collaborative Research",
    description: "We believe in open collaboration and knowledge sharing to advance the field of AI research.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We push the boundaries of what's possible in AI while maintaining ethical standards.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Our work aims to benefit all of humanity, not just a select few.",
  },
]

export function ValuesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-8">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These core principles guide everything we do at RunAsh AI, from research to product development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
