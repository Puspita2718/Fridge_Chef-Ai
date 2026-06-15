"use client";

import { motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-muted/50">
      <div className="max-w-[1200px] mx-auto px-4 md:px-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Plans that fit your kitchen
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Start for free, upgrade when you&apos;re ready to master your kitchen.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card/80 backdrop-blur-xl p-8 rounded-[24px] border border-border flex flex-col"
          >
            <p className="font-geist text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Basic</p>
            <h3 className="text-4xl font-bold text-foreground mb-2">$0 <span className="text-lg font-normal text-muted-foreground">/mo</span></h3>
            <p className="text-sm text-muted-foreground mb-8">Perfect for occasional cooking</p>
            
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 size={20} className="text-primary" />
                10 AI Recipes per month
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 size={20} className="text-primary" />
                Basic ingredient scanning
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <X size={20} className="text-muted-foreground" />
                Weekly meal planner
              </li>
            </ul>
            <button className="w-full py-3 rounded-xl border border-border font-medium hover:bg-muted transition-colors text-foreground">
              Current Plan
            </button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-card p-8 rounded-[24px] flex flex-col shadow-2xl relative border-2 border-primary md:-translate-y-4"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Most Popular
            </div>
            <p className="font-geist text-sm font-semibold text-primary mb-4 uppercase tracking-wider">Pro Chef</p>
            <h3 className="text-4xl font-bold text-foreground mb-2">$12 <span className="text-lg font-normal text-muted-foreground">/mo</span></h3>
            <p className="text-sm text-muted-foreground mb-8">For serious home cooks</p>
            
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 size={20} className="text-primary" />
                Unlimited AI Recipes
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 size={20} className="text-primary" />
                Advanced Computer Vision
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 size={20} className="text-primary" />
                Smart Meal Planning
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 size={20} className="text-primary" />
                Grocery Store Integration
              </li>
            </ul>
            <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
              Start 14-Day Free Trial
            </button>
          </motion.div>

          {/* Family Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-card/80 backdrop-blur-xl p-8 rounded-[24px] border border-border flex flex-col"
          >
            <p className="font-geist text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Family</p>
            <h3 className="text-4xl font-bold text-foreground mb-2">$24 <span className="text-lg font-normal text-muted-foreground">/mo</span></h3>
            <p className="text-sm text-muted-foreground mb-8">Complete household management</p>
            
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 size={20} className="text-primary" />
                Everything in Pro
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 size={20} className="text-primary" />
                Up to 5 family members
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 size={20} className="text-primary" />
                Shared shopping lists
              </li>
            </ul>
            <button className="w-full py-3 rounded-xl border border-border font-medium hover:bg-muted transition-colors text-foreground">
              Contact Sales
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
