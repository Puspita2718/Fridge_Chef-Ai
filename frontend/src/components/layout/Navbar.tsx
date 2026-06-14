"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, BookOpen, Camera, Calendar, User } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Navigation */}
      <header className="w-full sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm">
        <nav className="flex justify-between items-center px-4 md:px-10 py-4 w-full max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-sans text-2xl font-bold text-primary tracking-tight">
              FridgeChef AI
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-muted-foreground font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground font-medium hover:text-primary transition-colors">
              How it Works
            </Link>
            <Link href="#pricing" className="text-muted-foreground font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:opacity-90 active:scale-95 transition-all">
              Start Free
            </button>
          </div>

          <button 
            className="md:hidden text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 pt-20 bg-background md:hidden flex flex-col items-center gap-6 text-lg"
          >
            <Link href="#features" onClick={() => setIsOpen(false)} className="text-foreground font-medium">Features</Link>
            <Link href="#how-it-works" onClick={() => setIsOpen(false)} className="text-foreground font-medium">How it Works</Link>
            <Link href="#pricing" onClick={() => setIsOpen(false)} className="text-foreground font-medium">Pricing</Link>
            <button className="bg-primary text-primary-foreground px-8 py-3 mt-4 rounded-full font-medium active:scale-95 transition-all">
              Start Free
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-background/80 backdrop-blur-xl border-t border-border flex justify-around items-center px-4 py-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <Link href="/" className="flex flex-col items-center justify-center bg-primary/20 text-primary rounded-full px-4 py-1">
          <Home size={20} />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="#features" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary">
          <BookOpen size={20} />
          <span className="text-[10px] font-medium">Features</span>
        </Link>
        <Link href="#" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary">
          <Camera size={20} />
          <span className="text-[10px] font-medium">Scanner</span>
        </Link>
        <Link href="#pricing" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary">
          <Calendar size={20} />
          <span className="text-[10px] font-medium">Plans</span>
        </Link>
        <Link href="#" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary">
          <User size={20} />
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </nav>
    </>
  );
}
