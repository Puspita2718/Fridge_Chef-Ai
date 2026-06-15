"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { 
  Home, 
  Scan, 
  ChefHat, 
  CalendarDays, 
  ShoppingCart, 
  Activity, 
  Settings, 
  LogOut
} from "lucide-react";
import NotificationPopover from "@/components/dashboard/NotificationPopover";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Fridge Scanner", href: "/dashboard/scanner", icon: Scan },
    { name: "Recipe Generator", href: "/dashboard/recipes", icon: ChefHat },
    { name: "Meal Planner", href: "/dashboard/planner", icon: CalendarDays },
    { name: "Grocery List", href: "/dashboard/grocery", icon: ShoppingCart },
    { name: "Nutrition", href: "/dashboard/nutrition", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border p-4 sticky top-0 h-screen">
        <Link href="/" className="text-2xl font-bold text-primary tracking-tight px-4 py-6">
          FridgeChef AI
        </Link>
        
        <nav className="flex-1 space-y-2 mt-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-border mt-auto space-y-2">
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
            <Settings size={20} />
            Settings
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all text-left">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen pb-20 md:pb-0 overflow-x-hidden">
        {/* Topbar */}
        <header className="h-20 bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-30 px-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground capitalize">
            {navigation.find(n => n.href === pathname)?.name || "Settings"}
          </h1>
          <div className="flex items-center gap-4">
            <NotificationPopover />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">Gordon Ramsay</p>
                <p className="text-xs text-muted-foreground">Pro Chef</p>
              </div>
              <img src="https://i.pravatar.cc/150?u=gordon" alt="Profile" className="w-10 h-10 rounded-full border border-border" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full bg-card border-t border-border z-40 pb-safe pt-2 px-6 flex justify-between items-center h-20">
        {navigation.slice(0, 5).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center gap-1 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div className={`p-2 rounded-xl transition-colors ${isActive ? "bg-primary/10" : ""}`}>
                <item.icon size={24} />
              </div>
              <span className="text-[10px] font-medium">{item.name.split(' ')[0]}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
