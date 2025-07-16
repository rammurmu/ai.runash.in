
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function CompanyHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950/20 dark:to-indigo-950/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">
              Our Mission
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">RunAsh AI Residency</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our 6-month program is designed to cultivate exceptional researchers from diverse backgrounds. Residents
              work closely with our research team to advance the field of AI.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-16">
            <Image
              src="/placeholder.svg?height=400&width=800"
              alt="RunAsh AI Team"
              width={800}
              height={400}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Building the Future Together</h3>
              <p className="text-lg opacity-90">Our diverse team of researchers and engineers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
