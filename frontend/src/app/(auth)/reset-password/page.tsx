"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Reset Password</h1>
          <p className="text-muted-foreground">Enter your new password below.</p>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">New Password</label>
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Confirm New Password</label>
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
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Reset Password"}
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center space-y-4"
          >
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-2">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Password Reset Successfully</h3>
            <p className="text-muted-foreground">Redirecting you to login...</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
