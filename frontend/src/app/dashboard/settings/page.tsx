"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Bell, Shield, CreditCard, Moon, Smartphone, HelpCircle, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account preferences and subscriptions.</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Navigation Sidebar */}
        <div className="space-y-2">
          {[
            { label: "Notifications", icon: Bell, active: true },
            { label: "Appearance", icon: Moon, active: false },
            { label: "Privacy & Security", icon: Shield, active: false },
            { label: "Subscription", icon: CreditCard, active: false },
            { label: "Devices", icon: Smartphone, active: false },
            { label: "Help & Support", icon: HelpCircle, active: false },
          ].map((item) => (
            <button 
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                item.active 
                  ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="rounded-3xl border-border">
              <CardHeader>
                <CardTitle className="text-xl">Notification Preferences</CardTitle>
                <CardDescription>Choose what updates you want to receive.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive weekly meal plans and tips.</p>
                  </div>
                  <button 
                    onClick={() => setEmailNotifs(!emailNotifs)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${emailNotifs ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${emailNotifs ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">Get instant alerts for expiring ingredients.</p>
                  </div>
                  <button 
                    onClick={() => setPushNotifs(!pushNotifs)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${pushNotifs ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${pushNotifs ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="rounded-3xl border-border">
              <CardHeader>
                <CardTitle className="text-xl">Appearance</CardTitle>
                <CardDescription>Customize the look and feel of FridgeChef.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Dark Mode</h4>
                    <p className="text-sm text-muted-foreground">Switch between light and dark themes.</p>
                  </div>
                  <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="rounded-3xl border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2 text-primary">
                  <CreditCard size={20} /> Pro Plan Active
                </CardTitle>
                <CardDescription>Your subscription renews on July 14, 2026.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">$9.99 / month</span>
                  <button className="text-sm text-primary font-medium hover:underline">Manage Billing</button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
