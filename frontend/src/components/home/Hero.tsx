"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Leaf } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-12 md:pt-24 pb-20 px-4 md:px-10 max-w-[1200px] mx-auto overflow-hidden">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary font-geist text-sm font-semibold mb-6">
            Revolutionizing Modern Kitchens
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            Your AI Kitchen Companion That <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">Saves Money, Time & Food.</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
            FridgeChef AI turns your leftover ingredients into gourmet experiences. Reduce waste by 35% and never ask "what's for dinner" again.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-primary/25 active:scale-95 transition-all flex items-center justify-center gap-2">
              Start Free Trial
              <ArrowRight size={20} />
            </button>
            <button className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-medium hover:bg-muted active:scale-95 transition-all flex items-center justify-center gap-2 border border-border/50">
              <PlayCircle size={20} />
              Watch Demo
            </button>
          </div>

          <div className="mt-12 flex items-center gap-8 border-t border-border/50 pt-8">
            <div>
              <p className="text-2xl font-semibold text-primary">50K+</p>
              <p className="font-geist text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">Meals Generated</p>
            </div>
            <div className="w-px h-10 bg-border"></div>
            <div>
              <p className="text-2xl font-semibold text-secondary">35%</p>
              <p className="font-geist text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">Waste Reduced</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative z-10 rounded-[24px] overflow-hidden shadow-2xl border-8 border-card">
            {/* The user requested placeholders for AI features, so using a visually appealing placeholder image */}
            <img 
              alt="AI Chef UI" 
              className="w-full aspect-[4/3] object-cover" 
              src="https://images.unsplash.com/photo-1498837167338-5715fb84f592?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            />
          </div>
          
          {/* Glassmorphic Stats Overlays */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute -top-6 -right-6 md:-right-10 z-20 bg-card/80 backdrop-blur-xl border border-border p-4 rounded-2xl flex items-center gap-3 shadow-xl animate-[bounce_3s_ease-in-out_infinite]"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Leaf size={20} />
            </div>
            <div>
              <p className="text-xs font-geist font-semibold text-muted-foreground">Eco Impact</p>
              <p className="text-sm font-bold text-foreground">Saving 12kg CO₂/mo</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute -bottom-10 -left-6 md:-left-10 z-20 bg-card/90 backdrop-blur-xl border border-border p-5 rounded-2xl max-w-[240px] shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <p className="text-xs font-geist font-medium text-foreground">AI Thinking...</p>
            </div>
            <div className="space-y-3">
              <div className="h-2 w-full bg-muted rounded-full relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
              </div>
              <div className="h-2 w-3/4 bg-muted rounded-full"></div>
              <p className="text-sm font-medium mt-2 text-foreground">"Found 3 recipes with Spinach and Salmon."</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
