"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "FridgeChef AI completely changed how I cook. I save around $200 a month on groceries and I'm eating healthier than ever.",
    author: "Sarah J.",
    role: "Working Professional",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    quote: "The computer vision is mind-blowing. I literally just point my camera at the fridge and it instantly knows I have half an onion and some old carrots. Then it gives me a Michelin-star recipe.",
    author: "David M.",
    role: "Home Cook",
    avatar: "https://i.pravatar.cc/150?u=david"
  },
  {
    quote: "As a busy mom, meal planning was my biggest stress. Now FridgeChef plans the whole week and integrates directly with my Instacart. Pure magic.",
    author: "Emily R.",
    role: "Mother of 3",
    avatar: "https://i.pravatar.cc/150?u=emily"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-4 md:px-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Loved by home chefs everywhere
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Join 50,000+ users who have revolutionized their kitchen experience.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-card border border-border p-8 rounded-[24px] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-6 text-secondary">
                {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="currentColor" />)}
              </div>
              <p className="text-foreground font-medium mb-8 italic">&quot;{t.quote}&quot;</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full border-2 border-primary/20" />
                <div>
                  <h5 className="font-semibold text-foreground">{t.author}</h5>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
