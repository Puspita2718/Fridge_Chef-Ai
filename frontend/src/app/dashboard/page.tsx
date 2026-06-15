"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import { Flame, Droplets, Wallet, UtensilsCrossed, ArrowRight, Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-[32px] border bg-gradient-to-r from-primary to-emerald-600 text-primary-foreground p-8 shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Alex! 👋</h1>
          <p className="text-primary-foreground/80 max-w-xl">
            You've maintained your calorie goal for 4 days straight. Keep it up! 
            Ready to plan your next delicious meal?
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="bg-background text-foreground hover:bg-background/90 px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
              <Plus className="h-4 w-4" /> Scan Fridge
            </button>
            <button className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium transition-colors backdrop-blur-sm">
              View Meal Plan
            </button>
          </div>
        </div>
        {/* Decorative background element */}
        <div className="absolute -right-10 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-5">
        <Card className="col-span-2 lg:col-span-1 border-primary/20 bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Meals</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3/4</div>
            <p className="text-xs text-muted-foreground mt-1">
              Dinner pending
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calories</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,850</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 font-medium">650</span> remaining
            </p>
            <div className="mt-3 h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 w-[75%] rounded-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protein</CardTitle>
            <div className="h-4 w-4 rounded-full bg-blue-500/20 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">110g</div>
            <p className="text-xs text-muted-foreground mt-1">
              Target: 140g
            </p>
            <div className="mt-3 h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[80%] rounded-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Water Intake</CardTitle>
            <Droplets className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.5L</div>
            <p className="text-xs text-muted-foreground mt-1">
              Target: 2.5L
            </p>
            <div className="mt-3 h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500 w-[60%] rounded-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Tracker</CardTitle>
            <Wallet className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 font-medium">-$12</span> from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 rounded-2xl">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>
              Your calorie intake over the last 7 days.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <WeeklyChart />
          </CardContent>
        </Card>
        
        <Card className="col-span-3 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Recipes</CardTitle>
              <CardDescription>
                Meals you've generated recently.
              </CardDescription>
            </div>
            <button className="text-sm text-primary font-medium hover:underline flex items-center">
              View all <ArrowRight className="ml-1 h-3 w-3" />
            </button>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              {
                name: "Spicy Lemon Garlic Salmon",
                time: "25 min",
                cals: "420 kcal",
                image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=100&h=100&q=80"
              },
              {
                name: "Quinoa Power Bowl",
                time: "15 min",
                cals: "380 kcal",
                image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=100&h=100&q=80"
              },
              {
                name: "Creamy Mushroom Pasta",
                time: "30 min",
                cals: "550 kcal",
                image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=100&h=100&q=80"
              }
            ].map((recipe, index) => (
              <div key={index} className="flex items-center gap-4 group cursor-pointer">
                <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-muted">
                  <img src={recipe.image} alt={recipe.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">{recipe.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {recipe.time} • {recipe.cals}
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
