"use client";

import { Bell, Menu, Search, User } from "lucide-react";
import { useState } from "react";

export function Topbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden text-muted-foreground hover:text-foreground"
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Sidebar</span>
      </button>
      
      <div className="flex-1 flex items-center gap-4 md:gap-8">
        <div className="relative flex-1 max-w-md hidden md:flex">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search recipes, ingredients..."
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
            3
          </span>
          <span className="sr-only">Notifications</span>
        </button>
        
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
          <User className="h-4 w-4 text-primary" />
        </div>
      </div>
    </header>
  );
}
