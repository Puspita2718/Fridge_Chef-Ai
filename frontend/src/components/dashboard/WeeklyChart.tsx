"use client";

import { motion } from "framer-motion";

export default function WeeklyChart() {
  // Mock data for weekly calorie intake
  const data = [
    { day: "Mon", calories: 1800, goal: 2000 },
    { day: "Tue", calories: 2100, goal: 2000 },
    { day: "Wed", calories: 1950, goal: 2000 },
    { day: "Thu", calories: 1600, goal: 2000 },
    { day: "Fri", calories: 2200, goal: 2000 },
    { day: "Sat", calories: 2400, goal: 2000 },
    { day: "Sun", calories: 1850, goal: 2000 },
  ];

  const maxCal = Math.max(...data.map(d => Math.max(d.calories, d.goal)));

  return (
    <div className="bg-card border border-border p-6 rounded-3xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Weekly Nutrition</h3>
          <p className="text-sm text-muted-foreground">Calorie intake vs goal</p>
        </div>
        <select className="bg-input text-sm text-foreground border-none rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary outline-none">
          <option>This Week</option>
          <option>Last Week</option>
        </select>
      </div>

      <div className="flex-1 flex items-end justify-between gap-2 mt-auto">
        {data.map((item, index) => {
          const heightPercent = (item.calories / maxCal) * 100;
          const goalPercent = (item.goal / maxCal) * 100;
          const isOverGoal = item.calories > item.goal;

          return (
            <div key={item.day} className="flex flex-col items-center flex-1 group">
              <div className="w-full h-40 relative flex justify-center items-end">
                {/* Goal Line Indicator */}
                <div 
                  className="absolute w-full border-t-2 border-dashed border-muted-foreground/30 z-0"
                  style={{ bottom: `${goalPercent}%` }}
                ></div>

                {/* Animated Bar */}
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ duration: 1, delay: index * 0.1, type: "spring" }}
                  className={`w-full max-w-[40px] rounded-t-xl relative z-10 transition-colors ${
                    isOverGoal ? "bg-destructive/80" : "bg-primary"
                  }`}
                >
                  {/* Tooltip on Hover */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {item.calories} kcal
                  </div>
                </motion.div>
              </div>
              <span className="text-xs font-medium text-muted-foreground mt-3 uppercase tracking-wider">{item.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
