"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Plus, CheckCircle2, Circle, Trash2, Send } from "lucide-react";

export default function GroceryList() {
  const [items, setItems] = useState([
    { id: 1, name: "Eggs (1 Dozen)", category: "Dairy", purchased: false },
    { id: 2, name: "Almond Milk", category: "Dairy", purchased: false },
    { id: 3, name: "Cherry Tomatoes", category: "Produce", purchased: true },
    { id: 4, name: "Olive Oil", category: "Pantry", purchased: false },
    { id: 5, name: "Chicken Breast (1 lb)", category: "Meat", purchased: false },
  ]);

  const [newItem, setNewItem] = useState("");

  const toggleItem = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, purchased: !item.purchased } : item));
  };

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setItems([{ id: Date.now(), name: newItem, category: "Other", purchased: false }, ...items]);
    setNewItem("");
  };

  const progress = Math.round((items.filter(i => i.purchased).length / items.length) * 100) || 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Smart Grocery List</h2>
          <p className="text-muted-foreground">Auto-generated from your meal plan.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-background text-foreground border border-border px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-muted transition-colors">
            <Send size={18} /> Instacart
          </button>
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
            <ShoppingCart size={18} /> Shop Now
          </button>
        </div>
      </div>

      <div className="bg-card border border-border p-6 rounded-[32px]">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <span className="font-semibold text-foreground">Shopping Progress</span>
            <span className="text-2xl font-bold text-primary">{progress}%</span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary rounded-full transition-all duration-500"
            />
          </div>
        </div>

        {/* Add Item Form */}
        <form onSubmit={addItem} className="relative mb-8">
          <input 
            type="text" 
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add a new item..." 
            className="w-full bg-input text-foreground border-none rounded-2xl py-4 pl-6 pr-16 focus:ring-2 focus:ring-primary shadow-sm"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity">
            <Plus size={20} />
          </button>
        </form>

        {/* List */}
        <div className="space-y-2">
          <AnimatePresence>
            {items.sort((a, b) => Number(a.purchased) - Number(b.purchased)).map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`group flex items-center justify-between p-4 rounded-2xl border transition-colors ${
                  item.purchased 
                    ? 'bg-muted/50 border-transparent' 
                    : 'bg-background border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => toggleItem(item.id)}>
                  {item.purchased ? (
                    <CheckCircle2 size={24} className="text-primary flex-shrink-0" />
                  ) : (
                    <Circle size={24} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  )}
                  <span className={`font-medium transition-all ${item.purchased ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                    {item.name}
                  </span>
                  <span className="ml-auto mr-4 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded-md">
                    {item.category}
                  </span>
                </div>
                <button 
                  onClick={() => deleteItem(item.id)}
                  className="p-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all rounded-lg hover:bg-destructive/10"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {items.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <ShoppingCart size={48} className="mx-auto mb-4 opacity-20" />
              <p>Your grocery list is empty.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
