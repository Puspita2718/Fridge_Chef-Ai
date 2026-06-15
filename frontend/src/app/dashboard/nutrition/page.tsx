"use client";

import { motion } from "framer-motion";
import { Activity, Flame, Droplets, Target, Award, ArrowUpRight } from "lucide-react";
import WeeklyChart from "@/components/dashboard/WeeklyChart";

export default function NutritionDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Nutrition Insights</h2>
          <p className="text-muted-foreground">Track your macros, hydration, and long-term health trends.</p>
        </div>
        <div className="bg-card border border-border px-4 py-2 rounded-xl flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Weekly Score:</span>
          <span className="text-lg font-bold text-primary flex items-center gap-1">
            92/100 <ArrowUpRight size={16} />
          </span>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border p-6 rounded-3xl">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-4">
            <Flame size={24} />
          </div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Avg Calories</p>
          <h4 className="text-2xl font-bold text-foreground">1,850 <span className="text-sm font-normal text-muted-foreground">kcal</span></h4>
        </div>
        <div className="bg-card border border-border p-6 rounded-3xl">
          <div className="w-12 h-12 rounded-2xl bg-chart-2/20 flex items-center justify-center text-chart-2 mb-4">
            <Droplets size={24} />
          </div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Avg Hydration</p>
          <h4 className="text-2xl font-bold text-foreground">2.1 <span className="text-sm font-normal text-muted-foreground">Liters</span></h4>
        </div>
        <div className="bg-card border border-border p-6 rounded-3xl">
          <div className="w-12 h-12 rounded-2xl bg-chart-3/20 flex items-center justify-center text-chart-3 mb-4">
            <Target size={24} />
          </div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Goal Streak</p>
          <h4 className="text-2xl font-bold text-foreground">12 <span className="text-sm font-normal text-muted-foreground">Days</span></h4>
        </div>
        <div className="bg-gradient-to-br from-primary to-chart-5 text-primary-foreground p-6 rounded-3xl relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white mb-4 relative z-10">
            <Award size={24} />
          </div>
          <p className="text-sm font-medium text-white/80 mb-1 relative z-10">Top Micronutrient</p>
          <h4 className="text-2xl font-bold text-white relative z-10">Vitamin C</h4>
          <Award size={100} className="absolute -right-4 -bottom-4 text-white/10" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Weekly Chart */}
        <div className="h-[400px]">
          <WeeklyChart />
        </div>

        {/* Macro Distribution */}
        <div className="bg-card border border-border p-6 rounded-3xl flex flex-col">
          <h3 className="text-lg font-semibold text-foreground mb-2">Macro Distribution</h3>
          <p className="text-sm text-muted-foreground mb-8">Average this week</p>
          
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Pseudo-Donut Chart via CSS conic-gradient */}
              <div 
                className="w-full h-full rounded-full"
                style={{
                  background: `conic-gradient(
                    var(--chart-2) 0% 30%, 
                    var(--chart-3) 30% 75%, 
                    var(--chart-4) 75% 100%
                  )`
                }}
              ></div>
              {/* Inner Circle to make it a donut */}
              <div className="absolute inset-4 bg-card rounded-full flex flex-col items-center justify-center shadow-inner">
                <span className="text-2xl font-bold text-foreground">100%</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Logged</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center">
              <div className="w-3 h-3 rounded-full bg-chart-2 mx-auto mb-2"></div>
              <p className="text-xl font-bold text-foreground">30%</p>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Protein</p>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 rounded-full bg-chart-3 mx-auto mb-2"></div>
              <p className="text-xl font-bold text-foreground">45%</p>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Carbs</p>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 rounded-full bg-chart-4 mx-auto mb-2"></div>
              <p className="text-xl font-bold text-foreground">25%</p>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Fat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
