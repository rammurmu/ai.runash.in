

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const researchAreas = [
  {
    title: "AI Safety & Alignment",
    description: "Developing techniques to ensure AI systems behave safely and in accordance with human values.",
    color: "from-red-500 to-pink-600",
  },
  {
    title: "Large Language Models",
    description: "Advancing the capabilities and understanding of large-scale language models.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    title: "Multimodal AI",
    description: "Creating AI systems that can understand and generate content across multiple modalities.",
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Reinforcement Learning",
    description: "Developing more efficient and robust reinforcement learning algorithms.",
    color: "from-purple-500 to-violet-600",
  },
]

export function ResidencySection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              Research Areas
            </Badge>
            <h2 className="text-4xl font-bold mb-8">Research Focus Areas</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our residents work on cutting-edge research across multiple domains of artificial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {researchAreas.map((area, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div
                    className={`w-12 h-12 mb-4 bg-gradient-to-br ${area.color} rounded-xl flex items-center justify-center`}
                  >
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{area.title}</h3>
                  <p className="text-muted-foreground">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-6">Ready to Join Our Research Team?</h3>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Applications for our next cohort are now open. Join us in shaping the future of AI research.
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Apply Now
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
