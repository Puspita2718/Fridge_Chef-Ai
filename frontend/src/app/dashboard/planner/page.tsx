"use client";

import { CalendarDays, ChevronLeft, ChevronRight, Plus, Flame } from "lucide-react";

export default function MealPlanner() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dates = [12, 13, 14, 15, 16, 17, 18];
  const activeDay = 14;

  const meals = {
    breakfast: { title: "Avocado Toast", cals: 420, cooked: true },
    lunch: { title: "Grilled Chicken Salad", cals: 550, cooked: true },
    dinner: { title: "Teriyaki Salmon Bowl", cals: 680, cooked: false },
    snack: null
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Weekly Meal Planner</h2>
          <p className="text-muted-foreground">Plan your meals to hit your goals and reduce waste.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
          <CalendarDays size={18} /> Auto-Generate Week
        </button>
      </div>

      {/* Date Selector */}
      <div className="bg-card border border-border p-4 rounded-3xl flex items-center justify-between shadow-sm overflow-x-auto hide-scrollbar gap-2">
        <button className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-colors flex-shrink-0">
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex gap-2 flex-1 justify-center min-w-max px-4">
          {days.map((day, index) => (
            <div 
              key={day} 
              className={`flex flex-col items-center justify-center w-14 h-20 rounded-2xl cursor-pointer transition-all ${
                dates[index] === activeDay 
                  ? "bg-primary text-primary-foreground shadow-md scale-110" 
                  : "hover:bg-muted text-muted-foreground"
              }`}
            >
              <span className="text-xs font-medium mb-1 uppercase tracking-wider">{day}</span>
              <span className={`text-xl font-bold ${dates[index] === activeDay ? 'text-primary-foreground' : 'text-foreground'}`}>
                {dates[index]}
              </span>
              {dates[index] === activeDay && <div className="w-1 h-1 bg-primary-foreground rounded-full mt-1"></div>}
            </div>
          ))}
        </div>

        <button className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-colors flex-shrink-0">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Daily Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-6">
          <h3 className="text-xl font-bold text-foreground">Wednesday&apos;s Menu</h3>
          
          <div className="space-y-4">
            {/* Breakfast */}
            <div className="bg-card border border-border p-5 rounded-3xl flex items-center gap-5 group">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0">
                <span className="text-xs font-bold uppercase tracking-wider">BRK</span>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-foreground">{meals.breakfast.title}</h4>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><Flame size={14}/> {meals.breakfast.cals} kcal</p>
              </div>
              <button className="hidden group-hover:flex bg-muted text-muted-foreground px-4 py-2 rounded-xl text-sm font-medium hover:bg-muted/80 transition-colors">
                Swap
              </button>
            </div>

            {/* Lunch */}
            <div className="bg-card border border-border p-5 rounded-3xl flex items-center gap-5 group">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0">
                <span className="text-xs font-bold uppercase tracking-wider">LUN</span>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-foreground">{meals.lunch.title}</h4>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><Flame size={14}/> {meals.lunch.cals} kcal</p>
              </div>
              <button className="hidden group-hover:flex bg-muted text-muted-foreground px-4 py-2 rounded-xl text-sm font-medium hover:bg-muted/80 transition-colors">
                Swap
              </button>
            </div>

            {/* Dinner */}
            <div className="bg-card border border-primary/30 shadow-[0_0_15px_rgba(var(--primary),0.1)] p-5 rounded-3xl flex items-center gap-5 group relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <span className="text-xs font-bold uppercase tracking-wider">DIN</span>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-foreground">{meals.dinner.title}</h4>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><Flame size={14}/> {meals.dinner.cals} kcal</p>
              </div>
              <button className="bg-primary text-primary-foreground px-5 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
                Cook Now
              </button>
            </div>

            {/* Snack */}
            <button className="w-full bg-transparent border-2 border-dashed border-border p-5 rounded-3xl flex flex-col items-center justify-center gap-2 text-muted-foreground hover:bg-muted/30 transition-colors">
              <Plus size={24} />
              <span className="font-medium">Add Snack</span>
            </button>
          </div>
        </div>

        {/* Daily Macros */}
        <div className="bg-card border border-border p-6 rounded-[32px] h-fit sticky top-24">
          <h3 className="text-lg font-bold text-foreground mb-6">Daily Macros</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-foreground">Calories</span>
                <span className="text-muted-foreground">1650 / 2000</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-foreground">Protein</span>
                <span className="text-muted-foreground">95g / 120g</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-chart-2 rounded-full" style={{ width: '79%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-foreground">Carbs</span>
                <span className="text-muted-foreground">150g / 200g</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-chart-3 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-foreground">Fat</span>
                <span className="text-muted-foreground">45g / 65g</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-chart-4 rounded-full" style={{ width: '69%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
