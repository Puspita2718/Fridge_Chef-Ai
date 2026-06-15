"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  Check, 
  Trash2, 
  ChefHat, 
  ScanLine, 
  ShoppingCart, 
  Calendar, 
  Activity 
} from "lucide-react";

type NotificationType = "scan" | "recipe" | "grocery" | "meal" | "nutrition";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
  group: "Today" | "Yesterday" | "Earlier";
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "scan",
    title: "AI Scan Completed",
    description: "Successfully identified 12 ingredients from your fridge photo.",
    time: "2 mins ago",
    read: false,
    group: "Today"
  },
  {
    id: "2",
    type: "recipe",
    title: "New Recipe Generated",
    description: "Spicy Lemon Garlic Salmon recipe is ready to cook!",
    time: "1 hour ago",
    read: false,
    group: "Today"
  },
  {
    id: "3",
    type: "meal",
    title: "Meal Reminder",
    description: "Time to start cooking dinner. Teriyaki Salmon Bowl is on the menu.",
    time: "Yesterday, 6:00 PM",
    read: true,
    group: "Yesterday"
  },
  {
    id: "4",
    type: "grocery",
    title: "Expiring Soon",
    description: "Your Whole Milk expires in 1 day. Add to grocery list?",
    time: "Yesterday, 9:00 AM",
    read: true,
    group: "Yesterday"
  },
  {
    id: "5",
    type: "nutrition",
    title: "Weekly Summary",
    description: "You met your protein goals for 5 days this week. Great job!",
    time: "Monday, 8:00 AM",
    read: true,
    group: "Earlier"
  }
];

const getIconForType = (type: NotificationType) => {
  switch (type) {
    case "scan": return <ScanLine className="h-4 w-4 text-emerald-500" />;
    case "recipe": return <ChefHat className="h-4 w-4 text-primary" />;
    case "grocery": return <ShoppingCart className="h-4 w-4 text-orange-500" />;
    case "meal": return <Calendar className="h-4 w-4 text-blue-500" />;
    case "nutrition": return <Activity className="h-4 w-4 text-purple-500" />;
  }
};

const getBgForType = (type: NotificationType) => {
  switch (type) {
    case "scan": return "bg-emerald-500/10";
    case "recipe": return "bg-primary/10";
    case "grocery": return "bg-orange-500/10";
    case "meal": return "bg-blue-500/10";
    case "nutrition": return "bg-purple-500/10";
  }
};

export default function NotificationPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const popoverRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const groupedNotifications = notifications.reduce((acc, curr) => {
    if (!acc[curr.group]) acc[curr.group] = [];
    acc[curr.group].push(curr);
    return acc;
  }, {} as Record<string, Notification[]>);

  return (
    <div className="relative" ref={popoverRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors relative ${
          isOpen ? "bg-muted border-primary text-primary" : "border-border text-muted-foreground hover:bg-muted"
        }`}
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-[10px] font-bold text-primary-foreground rounded-full flex items-center justify-center translate-x-1 -translate-y-1 shadow-sm border-2 border-background">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-14 w-80 sm:w-96 bg-card border border-border shadow-2xl rounded-2xl overflow-hidden z-50 flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full font-medium">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={markAllAsRead} 
                  disabled={unreadCount === 0}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button 
                  onClick={clearAll}
                  disabled={notifications.length === 0}
                  className="text-xs font-medium text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="overflow-y-auto flex-1 p-2 space-y-4 max-h-[400px]">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Bell className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <h4 className="font-medium text-foreground">All caught up!</h4>
                  <p className="text-sm text-muted-foreground mt-1">No new notifications.</p>
                </div>
              ) : (
                ["Today", "Yesterday", "Earlier"].map(group => {
                  if (!groupedNotifications[group] || groupedNotifications[group].length === 0) return null;
                  
                  return (
                    <div key={group} className="space-y-1">
                      <h4 className="text-xs font-semibold text-muted-foreground px-2 pt-2 pb-1 uppercase tracking-wider">
                        {group}
                      </h4>
                      {groupedNotifications[group].map(notification => (
                        <div 
                          key={notification.id}
                          className={`p-3 rounded-xl flex gap-3 transition-colors hover:bg-accent cursor-pointer ${
                            !notification.read ? "bg-primary/5 border border-primary/10" : ""
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getBgForType(notification.type)}`}>
                            {getIconForType(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <p className={`text-sm font-semibold truncate ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                                {notification.title}
                              </p>
                              <span className="text-[10px] text-muted-foreground shrink-0 whitespace-nowrap">
                                {notification.time}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                              {notification.description}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-primary shrink-0 self-center" />
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })
              )}
            </div>
            
            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-border bg-muted/20 text-center">
                <button className="text-xs font-medium text-primary hover:underline transition-all">
                  View all settings
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
