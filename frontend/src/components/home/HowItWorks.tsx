"use client";

import { motion } from "framer-motion";
import { Camera, Brain, Utensils, ArrowRight, ArrowLeft } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "1",
      icon: <Camera size={32} className="text-primary" />,
      title: "Scan Your Kitchen",
      desc: "Point your camera at your fridge or pantry. Our AI automatically logs ingredients, expiration dates, and quantity.",
      color: "bg-primary/20",
    },
    {
      num: "2",
      icon: <Brain size={32} className="text-chart-5" />,
      title: "AI Intelligence",
      desc: "FridgeChef analyzes your tastes, dietary needs, and available ingredients to craft the perfect personalized recipe.",
      color: "bg-chart-5/20",
    },
    {
      num: "3",
      icon: <Utensils size={32} className="text-secondary" />,
      title: "Cook & Enjoy",
      desc: "Follow interactive, step-by-step instructions with voice-control so your hands stay clean while cooking.",
      color: "bg-secondary/20",
    }
  ];

  return (
    <section id="how-it-works" className="py-24 overflow-hidden bg-background">
      <div className="max-w-[1200px] mx-auto px-4 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Cooking has never been this effortless.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Three simple steps to culinary mastery and zero waste.
            </motion.p>
          </div>
          <div className="hidden md:flex gap-2">
            <button className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-foreground">
              <ArrowLeft size={20} />
            </button>
            <button className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-foreground">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Background Number */}
              <div className="text-[120px] font-black text-muted absolute -top-16 -left-4 z-0 opacity-50 select-none">
                {step.num}
              </div>
              <div className="relative z-10 pt-4">
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-6`}>
                  {step.icon}
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-3">{step.title}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
