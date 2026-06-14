"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How accurate is the ingredient scanning?",
    answer: "Our computer vision model is highly accurate, trained on millions of food items. It can recognize both packaged goods and raw produce with over 95% accuracy. For anything it misses, you can easily correct it manually."
  },
  {
    question: "Can it accommodate my dietary restrictions?",
    answer: "Absolutely. You can set strict filters for allergies (like nuts, gluten, dairy) or dietary preferences (vegan, keto, paleo). The AI will only suggest recipes that strictly adhere to your profile."
  },
  {
    question: "How does it help me save money?",
    answer: "By keeping track of what you already have and prioritizing ingredients that are about to expire, FridgeChef AI prevents food waste. Most users see a 35% reduction in their grocery bill simply by using what they already bought."
  },
  {
    question: "Does it connect to my smart fridge?",
    answer: "Yes! If you have a compatible Samsung Family Hub or LG InstaView fridge, you can connect it directly. We also integrate with grocery delivery services like Instacart to automatically log your purchases."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="max-w-[800px] mx-auto px-4 md:px-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about FridgeChef AI.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-border rounded-2xl overflow-hidden bg-background"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-foreground text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="text-primary flex-shrink-0" />
                ) : (
                  <Plus className="text-muted-foreground flex-shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-muted-foreground">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
