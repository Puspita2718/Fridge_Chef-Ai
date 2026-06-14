"use client";

import Link from "next/link";
import { Globe, Camera, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-16 mb-16 md:mb-0">
      <div className="max-w-[1200px] mx-auto px-4 md:px-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <span className="font-sans text-2xl font-bold text-primary mb-6 block">FridgeChef AI</span>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The world's first AI-powered kitchen operating system designed to reduce waste and inspire creativity.
            </p>
          </div>
          
          <div>
            <h5 className="font-geist font-medium text-foreground mb-6">Product</h5>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Integrations</Link></li>
              <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">App Store</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-geist font-medium text-foreground mb-6">Company</h5>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Sustainability</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-geist font-medium text-foreground mb-6">Legal</h5>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2024 FridgeChef AI Inc. All rights reserved.</p>
          <div className="flex gap-6 text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors"><Globe size={20} /></a>
            <a href="#" className="hover:text-primary transition-colors"><Camera size={20} /></a>
            <a href="#" className="hover:text-primary transition-colors"><Heart size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
