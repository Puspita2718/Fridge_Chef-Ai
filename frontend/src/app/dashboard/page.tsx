"use client";

import { motion } from "framer-motion";
import { Plus, ChevronRight, Clock, Flame, Droplets, Camera } from "lucide-react";
import Link from "next/link";
import WeeklyChart from "@/components/dashboard/WeeklyChart";

export default function Dashboard() {
  const todayMeals = [
    { id: 1, type: "Breakfast", title: "Avocado Toast with Poached Egg", calories: 420, time: "08:30 AM", status: "completed" },
    { id: 2, type: "Lunch", title: "Grilled Chicken Salad", calories: 550, time: "12:30 PM", status: "completed" },
    { id: 3, type: "Dinner", title: "Teriyaki Salmon Bowl", calories: 680, time: "07:00 PM", status: "pending" },
  ];

  const expiringItems = [
    { id: 1, name: "Whole Milk", days: 1, emoji: "🥛" },
    { id: 2, name: "Spinach", days: 2, emoji: "🥬" },
    { id: 3, name: "Chicken Breast", days: 2, emoji: "🥩" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border p-5 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
            <Flame size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Calories</p>
            <p className="text-xl font-bold text-foreground">1,650 <span className="text-sm font-normal text-muted-foreground">/ 2,000</span></p>
          </div>
        </div>
        <div className="bg-card border border-border p-5 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-chart-2/20 flex items-center justify-center text-chart-2">
            <Droplets size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Hydration</p>
            <p className="text-xl font-bold text-foreground">1.5 <span className="text-sm font-normal text-muted-foreground">/ 2.5L</span></p>
          </div>
        </div>
        <div className="col-span-2 bg-gradient-to-r from-primary to-chart-5 p-5 rounded-3xl flex items-center justify-between shadow-lg text-primary-foreground relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-sm font-medium text-primary-foreground/80 mb-1">AI Fridge Scanner</p>
            <p className="text-xl font-bold mb-1">Scan your fridge</p>
            <p className="text-xs text-primary-foreground/80">Get recipes instantly</p>
          </div>
          <Link href="/dashboard/scanner" className="relative z-10 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all cursor-pointer">
            <Camera size={24} className="text-white" />
          </Link>
          <Camera className="absolute -right-6 -bottom-6 text-white/10 group-hover:scale-110 transition-transform duration-500" size={120} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Today's Plan */}
        <div className="md:col-span-2 space-y-8">
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Today&apos;s Menu</h2>
              <Link href="/dashboard/planner" className="text-sm font-medium text-primary hover:underline flex items-center">
                View Planner <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="space-y-4">
              {todayMeals.map((meal, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={meal.id} 
                  className={`p-5 rounded-3xl border flex items-center gap-5 transition-all hover:shadow-md ${
                    meal.status === 'completed' 
                      ? 'bg-muted/30 border-border/50' 
                      : 'bg-card border-border shadow-sm'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 ${
                    meal.status === 'completed' ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'
                  }`}>
                    <span className="text-xs font-bold uppercase">{meal.type.substring(0, 3)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-lg font-semibold truncate ${meal.status === 'completed' ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                      {meal.title}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Flame size={14} /> {meal.calories} kcal</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {meal.time}</span>
                    </div>
                  </div>
                  {meal.status === 'pending' && (
                    <button className="hidden sm:flex bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
                      Cook Now
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          <section className="h-[400px]">
            <WeeklyChart />
          </section>
        </div>

        {/* Right Column: Alerts & Grocery */}
        <div className="space-y-8">
          {/* Expiring Soon */}
          <section className="bg-destructive/5 border border-destructive/20 p-6 rounded-3xl">
            <div className="flex items-center gap-2 text-destructive mb-6">
              <Flame size={20} className="animate-pulse" />
              <h3 className="font-bold text-lg">Expiring Soon</h3>
            </div>
            <div className="space-y-3">
              {expiringItems.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-background p-3 rounded-2xl border border-border/50 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="font-medium text-foreground">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold text-destructive bg-destructive/10 px-2 py-1 rounded-md">
                    {item.days} {item.days === 1 ? 'day' : 'days'}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 border border-destructive/30 text-destructive rounded-xl text-sm font-medium hover:bg-destructive hover:text-destructive-foreground transition-colors">
              Generate Recipe
            </button>
          </section>

          {/* Quick Grocery List */}
          <section className="bg-card border border-border p-6 rounded-3xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-foreground">Grocery List</h3>
              <Link href="/dashboard/grocery" className="text-primary hover:bg-primary/10 p-1 rounded-md transition-colors">
                <Plus size={20} />
              </Link>
            </div>
            <ul className="space-y-3">
              {["Eggs (1 Dozen)", "Almond Milk", "Cherry Tomatoes", "Olive Oil"].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded border border-border flex-shrink-0 cursor-pointer hover:border-primary transition-colors"></div>
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/dashboard/grocery" className="block text-center mt-6 text-sm text-primary font-medium hover:underline">
              View full list
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
