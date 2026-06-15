"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/onboarding"); // Redirect to onboarding after signup
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <Link href="/" className="absolute top-8 left-8 text-2xl font-bold text-primary tracking-tight">
        FridgeChef AI
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card w-full max-w-md p-8 rounded-[32px] shadow-2xl border border-border"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join 100,000+ smart home chefs.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input 
                type="text" 
                required
                className="w-full bg-input text-foreground border-none rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary transition-shadow"
                placeholder="Gordon Ramsay"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input 
                type="email" 
                required
                className="w-full bg-input text-foreground border-none rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary transition-shadow"
                placeholder="chef@example.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input 
                type="password" 
                required
                minLength={8}
                className="w-full bg-input text-foreground border-none rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary transition-shadow"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:opacity-90 active:scale-95 transition-all flex justify-center items-center gap-2 mt-2"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Sign Up"}
            {!isLoading && <ArrowRight size={20} />}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          Already have an account? <Link href="/login" className="text-primary font-medium hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
