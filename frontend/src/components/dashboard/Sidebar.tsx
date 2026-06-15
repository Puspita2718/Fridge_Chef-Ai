"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Scan, 
  ChefHat, 
  Calendar, 
  ShoppingCart, 
  LineChart,
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "AI Scanner", href: "/dashboard/scanner", icon: Scan },
  { name: "Recipe Generator", href: "/dashboard/recipes", icon: ChefHat },
  { name: "Meal Planner", href: "/dashboard/planner", icon: Calendar },
  { name: "Grocery List", href: "/dashboard/grocery", icon: ShoppingCart },
  { name: "Nutrition", href: "/dashboard/nutrition", icon: LineChart },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex flex-col w-64 h-screen border-r bg-sidebar text-sidebar-foreground p-4 sticky top-0">
      <div className="flex items-center gap-2 px-2 mb-8 mt-2">
        <span className="text-2xl font-bold text-primary tracking-tight">FridgeChef AI</span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2 pt-4 border-t border-sidebar-border">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-muted-foreground"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium hover:bg-destructive/10 text-destructive hover:text-destructive"
        >
          <LogOut className="h-5 w-5" />
          Log out
        </button>
      </div>
    </div>
  );
}
