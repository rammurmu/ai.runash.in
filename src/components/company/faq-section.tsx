

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is the duration of the Residency program?",
    answer:
      "The RunAsh AI Residency program is a 6-month full-time commitment. Residents work closely with our research team on cutting-edge AI projects during this period.",
  },
  {
    question: "What qualifications do I need to apply?",
    answer:
      "We look for candidates with strong technical backgrounds in machine learning, computer science, mathematics, or related fields. Research experience through publications, projects, or academic work is highly valued.",
  },
  {
    question: "Is the program remote or in-person?",
    answer:
      "The program is primarily based in San Francisco, but we offer some flexibility for remote work depending on the project and individual circumstances.",
  },
  {
    question: "What kind of compensation and benefits are provided?",
    answer:
      "Residents receive competitive full-time compensation, comprehensive health benefits, and access to state-of-the-art computing resources and research facilities.",
  },
  {
    question: "When is the next application deadline?",
    answer:
      "Applications are reviewed on a rolling basis. We typically have multiple cohorts throughout the year, so we encourage interested candidates to apply as soon as possible.",
  },
  {
    question: "What happens after the residency?",
    answer:
      "Many residents go on to join our full-time research team, pursue advanced degrees, or take on leadership roles at other AI research organizations. We provide ongoing mentorship and career support.",
  },
]

export function FAQSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-8">FAQ</h2>
            <p className="text-xl text-muted-foreground">Frequently asked questions about our Residency program</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
