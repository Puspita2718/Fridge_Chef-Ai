"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChefHat, Clock, Flame, Filter, Star } from "lucide-react";

export default function RecipeGenerator() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const recipes = [
    {
      id: 1,
      title: "Mediterranean Grilled Chicken",
      image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80",
      time: "30 min",
      calories: 450,
      match: 95,
      missing: 0,
      tags: ["High Protein", "Low Carb"]
    },
    {
      id: 2,
      title: "Creamy Tomato Basil Pasta",
      image: "https://images.unsplash.com/photo-1621996311210-2a132bb8226f?auto=format&fit=crop&q=80",
      time: "25 min",
      calories: 620,
      match: 85,
      missing: 1,
      tags: ["Vegetarian", "Comfort Food"]
    },
    {
      id: 3,
      title: "Avocado & Egg Breakfast Bowl",
      image: "https://images.unsplash.com/photo-1525351484163-e5296bf10ce4?auto=format&fit=crop&q=80",
      time: "15 min",
      calories: 380,
      match: 100,
      missing: 0,
      tags: ["Breakfast", "Keto"]
    },
    {
      id: 4,
      title: "Spicy Tofu Stir-fry",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80",
      time: "20 min",
      calories: 320,
      match: 75,
      missing: 2,
      tags: ["Vegan", "Quick"]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Recipe Generator</h2>
          <p className="text-muted-foreground">Discover meals based on your fridge inventory.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
          <ChefHat size={18} /> Surprise Me!
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input 
            type="text" 
            placeholder="Search for ingredients, cuisines, or diets..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card text-foreground border border-border rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary shadow-sm"
          />
        </div>
        <button className="bg-card border border-border px-6 py-4 rounded-2xl flex items-center gap-2 font-medium hover:bg-muted transition-colors">
          <Filter size={18} /> Filters
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
        {["All", "Use What I Have", "Breakfast", "High Protein", "Under 30 Min", "Vegetarian", "Keto"].map(filter => (
          <button 
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === filter 
                ? "bg-foreground text-background" 
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Recipe Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {recipes.map((recipe, index) => (
            <motion.div 
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-3xl overflow-hidden group hover:shadow-lg transition-all cursor-pointer flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                  <Star size={14} className="text-secondary fill-secondary" /> {recipe.match}% Match
                </div>
                {recipe.missing > 0 && (
                  <div className="absolute top-3 left-3 bg-destructive/90 text-destructive-foreground px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                    Missing {recipe.missing} item{recipe.missing > 1 ? 's' : ''}
                  </div>
                )}
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{recipe.title}</h3>
                
                <div className="flex gap-2 mb-4 flex-wrap">
                  {recipe.tags.map(tag => (
                    <span key={tag} className="bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex justify-between items-center text-muted-foreground text-sm font-medium pt-4 border-t border-border">
                  <span className="flex items-center gap-1"><Clock size={16} /> {recipe.time}</span>
                  <span className="flex items-center gap-1"><Flame size={16} /> {recipe.calories} kcal</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
