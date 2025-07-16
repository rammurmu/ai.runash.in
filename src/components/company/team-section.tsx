

import Image from "next/image"
import { Card } from "@/components/ui/card"

export function TeamSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Who we're looking for</h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  The program is open to researchers from all backgrounds who are passionate about AI safety and
                  alignment. We particularly encourage applications from underrepresented groups in AI research.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    Strong technical background in machine learning, computer science, mathematics, or related fields
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    Demonstrated research experience through publications, projects, or academic work
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    Passion for AI safety and alignment research
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    Collaborative mindset and excellent communication skills
                  </li>
                </ul>
                <p>
                  Residents receive full-time compensation, comprehensive benefits, and access to state-of-the-art
                  computing resources. The program is based in San Francisco, with some remote flexibility.
                </p>
              </div>
            </div>
            <div className="relative">
              <Card className="overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=500&width=400"
                  alt="Research Environment"
                  width={400}
                  height={500}
                  className="w-full h-96 object-cover"
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
