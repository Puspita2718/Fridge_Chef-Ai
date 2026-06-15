"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Mail, User, Shield, Target, Flame, ChefHat, Edit3, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Gordon Ramsay");
  const [bio, setBio] = useState("Pro Chef & Culinary Explorer");
  
  // Mock Data
  const stats = [
    { label: "Recipes Generated", value: "142", icon: ChefHat, color: "text-primary", bg: "bg-primary/10" },
    { label: "Current Streak", value: "14 Days", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Goals Met", value: "85%", icon: Target, color: "text-emerald-500", bg: "bg-emerald-500/10" }
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      
      {/* Header Profile Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-card rounded-3xl border border-border overflow-hidden"
      >
        <div className="h-40 bg-gradient-to-r from-primary/20 via-primary/40 to-chart-3/20" />
        
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-16 mb-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-2xl border-4 border-background overflow-hidden bg-muted">
                <img src="https://i.pravatar.cc/150?u=gordon" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-background">
                <Camera size={16} className="text-foreground" />
              </button>
            </div>
            
            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                isEditing 
                  ? "bg-primary text-primary-foreground shadow-lg hover:shadow-primary/25" 
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {isEditing ? (
                <><Check size={16} /> Save Changes</>
              ) : (
                <><Edit3 size={16} /> Edit Profile</>
              )}
            </button>
          </div>

          <div className="max-w-2xl">
            {isEditing ? (
              <div className="space-y-4">
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  className="text-3xl font-bold bg-transparent border-b border-primary outline-none focus:border-primary/80 w-full pb-1"
                />
                <input 
                  type="text" 
                  value={bio} 
                  onChange={e => setBio(e.target.value)}
                  className="text-lg text-muted-foreground bg-transparent border-b border-border outline-none focus:border-primary/50 w-full pb-1"
                />
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-foreground">{name}</h1>
                <p className="text-lg text-muted-foreground mt-1">{bio}</p>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-3xl p-6 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Personal Information */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card className="h-full rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xl">Personal Information</CardTitle>
              <CardDescription>Manage your contact details and account info.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                  <Mail size={16} /> Email Address
                </label>
                <div className="flex items-center justify-between p-3 rounded-xl border bg-muted/30">
                  <span className="text-sm font-medium">gordon@kitchen.com</span>
                  <span className="text-xs bg-emerald-500/10 text-emerald-600 px-2 py-1 rounded-md font-semibold">Verified</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                  <User size={16} /> Username
                </label>
                <div className="p-3 rounded-xl border bg-muted/30">
                  <span className="text-sm font-medium">@gordon_chef</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                  <Shield size={16} /> Password
                </label>
                <div className="flex items-center justify-between p-3 rounded-xl border bg-muted/30">
                  <span className="text-sm font-medium">••••••••••••</span>
                  <button className="text-xs font-semibold text-primary hover:underline">Change</button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dietary Preferences */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Card className="h-full rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xl">Dietary Profile</CardTitle>
              <CardDescription>This helps our AI tailor recipes specifically to you.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold mb-3">Diet Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Omnivore", "Vegetarian", "Vegan", "Keto", "Paleo"].map(diet => (
                      <button 
                        key={diet}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                          diet === "Omnivore" 
                            ? "bg-primary text-primary-foreground border-primary" 
                            : "bg-transparent text-muted-foreground hover:border-foreground"
                        }`}
                      >
                        {diet}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3">Allergies & Restrictions</h4>
                  <div className="flex flex-wrap gap-2">
                    {["None", "Gluten-Free", "Dairy-Free", "Nut-Free", "Shellfish-Free"].map(allergy => (
                      <button 
                        key={allergy}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                          allergy === "None" 
                            ? "bg-secondary text-secondary-foreground border-transparent" 
                            : "bg-transparent text-muted-foreground hover:border-foreground"
                        }`}
                      >
                        {allergy}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
