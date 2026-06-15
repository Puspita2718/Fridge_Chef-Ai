"use client";

import { motion } from "framer-motion";
import { Clock, Flame, Heart, Share2, Search, Filter } from "lucide-react";
import { toast } from "sonner";

export default function SavedRecipesPage() {
  const savedRecipes = [
    {
      id: 1,
      title: "Spicy Lemon Garlic Salmon",
      time: "25 min",
      calories: "420 kcal",
      protein: "35g",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&h=300&q=80",
      cuisine: "Seafood"
    },
    {
      id: 2,
      title: "Quinoa Power Bowl",
      time: "15 min",
      calories: "380 kcal",
      protein: "18g",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&h=300&q=80",
      cuisine: "Vegan"
    },
    {
      id: 3,
      title: "Creamy Mushroom Pasta",
      time: "30 min",
      calories: "550 kcal",
      protein: "22g",
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=400&h=300&q=80",
      cuisine: "Italian"
    },
    {
      id: 4,
      title: "Avocado Toast with Poached Egg",
      time: "10 min",
      calories: "320 kcal",
      protein: "14g",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&h=300&q=80",
      cuisine: "Breakfast"
    }
  ];

  const removeRecipe = (title: string) => {
    toast.success(`${title} removed from saved recipes.`);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Saved Recipes</h1>
          <p className="text-muted-foreground mt-1">Your personal collection of favorite meals.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search saved recipes..." 
              className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-full text-sm outline-none focus:border-primary transition-colors"
            />
          </div>
          <button className="p-2 bg-card border border-border rounded-full hover:bg-muted transition-colors text-muted-foreground">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {savedRecipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-card rounded-3xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-foreground">
                {recipe.cuisine}
              </div>
              <button 
                onClick={() => removeRecipe(recipe.title)}
                className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-colors shadow-sm"
              >
                <Heart size={16} fill="currentColor" />
              </button>
            </div>

            {/* Content Section */}
            <div className="p-5">
              <h3 className="font-bold text-lg text-foreground line-clamp-1 mb-3 group-hover:text-primary transition-colors">
                {recipe.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1.5"><Clock size={14} /> {recipe.time}</span>
                <span className="flex items-center gap-1.5"><Flame size={14} /> {recipe.calories}</span>
                <span className="font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-md">
                  {recipe.protein}
                </span>
              </div>

              <div className="flex gap-2 pt-4 border-t border-border">
                <button className="flex-1 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground py-2 rounded-xl text-sm font-semibold transition-colors">
                  Cook Now
                </button>
                <button className="p-2 border border-border rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
