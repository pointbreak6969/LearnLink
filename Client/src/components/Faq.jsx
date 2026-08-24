import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

const Faq = () => {
  const faqs = [
    {
      question: "How do I access the course materials?",
      answer: "Once enrolled, you can access all course materials through our online learning platform. Simply log in to your account and navigate to your enrolled courses."
    },
    {
      question: "Are the courses self-paced?",
      answer: "Yes, all our courses are self-paced. You can learn at your own speed and revisit the materials as often as you need."
    },
    {
      question: "Do I get a certificate upon completion?",
      answer: "Yes, upon successful completion of a course, you will receive a digital certificate that you can share on your resume or social media profiles."
    },
    {
      question: "How long do I have access to the course?",
      answer: "You have lifetime access to the course materials once enrolled. You can come back and review the content anytime in the future."
    }
  ]

  return (
    <div>
      <section className="py-24 bg-gradient-to-b from-brand-50 to-white">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-center text-ink-900 mb-16">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <div className="h-72 w-72 rounded-3xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-glow flex items-center justify-center">
                <HelpCircle className="h-28 w-28 text-white/90" strokeWidth={1.5} />
              </div>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="mb-2 border-b border-ink-100">
                  <AccordionTrigger className="py-5 text-lg font-semibold text-ink-800 hover:text-brand-600 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="py-4 text-ink-600 leading-relaxed transition-all">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Faq
