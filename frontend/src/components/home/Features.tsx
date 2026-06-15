"use client";

import { motion } from "framer-motion";
import { Scan, Zap, PiggyBank, ShoppingCart, Refrigerator, RefreshCw } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="py-24 bg-card border-y border-border">
      <div className="max-w-[1200px] mx-auto px-4 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Intelligent Features for Modern Home Chefs
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            We&apos;ve combined computer vision with advanced LLMs to create the ultimate kitchen OS.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 - Large */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-background/50 backdrop-blur-xl border border-border p-8 rounded-[32px] overflow-hidden relative group"
          >
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Scan size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">Smart Vision Scanner</h3>
              <p className="text-muted-foreground max-w-md">
                Take a photo of your fridge, and FridgeChef AI identifies every ingredient instantly using military-grade computer vision.
              </p>
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <Scan size={240} className="text-primary" />
            </div>
          </motion.div>

          {/* Feature 2 - Highlight */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-primary text-primary-foreground p-8 rounded-[32px] flex flex-col justify-between relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6 backdrop-blur-sm">
                <Zap size={32} className="text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Instant Planning</h3>
              <p className="text-primary-foreground/80">
                Generate weekly meal plans based on what you actually have, not what you need to buy.
              </p>
            </div>
            <div className="mt-8 relative z-10">
              <button className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full font-geist text-sm font-medium transition-colors backdrop-blur-md">
                Learn more
              </button>
            </div>
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
          </motion.div>

          {/* Feature 3 - Accent */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-secondary/10 border border-secondary/20 p-8 rounded-[32px]"
          >
            <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6">
              <PiggyBank size={32} className="text-secondary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">Save $150/mo</h3>
            <p className="text-muted-foreground">
              Our users report an average saving of $150 per month on grocery bills by using every item before it spoils.
            </p>
          </motion.div>

          {/* Feature 4 - Large Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-background/50 backdrop-blur-xl border border-border p-8 rounded-[32px] flex flex-col md:flex-row items-center gap-8"
          >
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-foreground mb-3">Seamless Integration</h3>
              <p className="text-muted-foreground">
                Syncs with Instacart, Amazon Fresh, and your smart fridge to keep your inventory updated in real-time without manual entry.
              </p>
            </div>
            <div className="flex-1 flex justify-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-card shadow-sm flex items-center justify-center border border-border">
                <ShoppingCart size={28} className="text-primary" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-card shadow-sm flex items-center justify-center border border-border">
                <Refrigerator size={28} className="text-primary" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-card shadow-sm flex items-center justify-center border border-border">
                <RefreshCw size={28} className="text-primary" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
