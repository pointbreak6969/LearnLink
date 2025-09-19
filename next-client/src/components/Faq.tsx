import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  const faqs = [
    {
      question: "How do I access the course materials?",
      answer:
        "Once enrolled, you can access all course materials through our online learning platform. Simply log in to your account and navigate to your enrolled courses.",
    },
    {
      question: "Are the courses self-paced?",
      answer:
        "Yes, all our courses are self-paced. You can learn at your own speed and revisit the materials as often as you need.",
    },
    {
      question: "Do I get a certificate upon completion?",
      answer:
        "Yes, upon successful completion of a course, you will receive a digital certificate that you can share on your resume or social media profiles.",
    },
    {
      question: "How long do I have access to the course?",
      answer:
        "You have lifetime access to the course materials once enrolled. You can come back and review the content anytime in the future.",
    },
  ];

  return (
    <div>
      <section className="py-24 bg-gradient-to-b from-orange-50 to-orange-100">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          <h2 className="text-5xl font-bold text-center text-gray-800 mb-16">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <img
                src="https://img.freepik.com/free-vector/people-asking-questions-getting-instructions_74855-4804.jpg?t=st=1729504054~exp=1729507654~hmac=1987d62b5c00501ef138374f79e807c99cf3abb5bea6d54eb7575cda939a4d03&w=740"
                alt="FAQ Illustration"
                width={600}
                height={400}
                className="rounded-lg shadow-lg transition-transform transform hover:scale-105"
              />
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="mb-6 border-b border-gray-300"
                >
                  <AccordionTrigger className="py-5 text-xl font-semibold text-gray-700 hover:text-[#FF9500] transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="py-4 text-gray-600 leading-relaxed transition-all">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
