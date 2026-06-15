"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard"); // Redirect mock
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Enter your details to access your kitchen.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground">Password</label>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline font-medium">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input 
                type="password" 
                required
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
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Sign In"}
            {!isLoading && <ArrowRight size={20} />}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <hr className="w-full border-border" />
          <span className="p-2 text-sm text-muted-foreground font-medium uppercase">Or</span>
          <hr className="w-full border-border" />
        </div>

        <button className="w-full mt-6 bg-card border border-border py-3 rounded-xl font-medium hover:bg-muted transition-colors flex justify-center items-center gap-3">
          <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
          Continue with Google
        </button>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          Don't have an account? <Link href="/signup" className="text-primary font-medium hover:underline">Sign Up</Link>
        </p>
      </motion.div>
    </div>
  );
}
