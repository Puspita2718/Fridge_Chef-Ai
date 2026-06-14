"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    dietaryPreference: "",
    healthGoals: [] as string[],
    medicalConditions: [] as string[],
    monthlyBudget: "",
    cookingSkill: "",
    householdSize: "1",
  });

  const handleNext = () => setStep(s => Math.min(s + 1, totalSteps));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < totalSteps) {
      handleNext();
      return;
    }
    
    setIsLoading(true);
    // Simulate API call to FastAPI backend
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard"); // Redirect to dashboard
    }, 2000);
  };

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      healthGoals: prev.healthGoals.includes(goal) 
        ? prev.healthGoals.filter(g => g !== goal)
        : [...prev.healthGoals, goal]
    }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Personalize Your AI Chef</h1>
          <p className="text-muted-foreground text-center">Step {step} of {totalSteps}</p>
          <div className="w-full bg-muted h-2 rounded-full mt-4 overflow-hidden">
            <motion.div 
              className="bg-primary h-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <motion.div 
          className="bg-card w-full p-8 md:p-12 rounded-[32px] shadow-2xl border border-border overflow-hidden relative min-h-[400px]"
        >
          <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-foreground">Basic Profile</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Age</label>
                      <input type="number" required min="1" max="120" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} className="w-full bg-input text-foreground border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary" placeholder="Years" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Gender</label>
                      <select required value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="w-full bg-input text-foreground border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary">
                        <option value="" disabled>Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Height (cm)</label>
                      <input type="number" required min="50" max="300" value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} className="w-full bg-input text-foreground border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary" placeholder="cm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Weight (kg)</label>
                      <input type="number" required min="20" max="300" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} className="w-full bg-input text-foreground border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary" placeholder="kg" />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-foreground">Diet & Health</h2>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Dietary Preference</label>
                    <select required value={formData.dietaryPreference} onChange={(e) => setFormData({...formData, dietaryPreference: e.target.value})} className="w-full bg-input text-foreground border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary">
                      <option value="" disabled>Select Preference</option>
                      <option value="non-veg">Non-Vegetarian</option>
                      <option value="veg">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                      <option value="pescatarian">Pescatarian</option>
                      <option value="jain">Jain</option>
                      <option value="keto">Keto</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Health Goals (Select multiple)</label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {["Weight Loss", "Muscle Gain", "Maintain Weight", "Healthy Lifestyle"].map((goal) => (
                        <div 
                          key={goal} 
                          onClick={() => handleGoalToggle(goal)}
                          className={`cursor-pointer p-3 rounded-xl border flex items-center gap-2 transition-all ${formData.healthGoals.includes(goal) ? 'bg-primary/10 border-primary text-primary' : 'bg-input border-transparent text-muted-foreground hover:bg-muted'}`}
                        >
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.healthGoals.includes(goal) ? 'border-primary bg-primary' : 'border-muted-foreground/50'}`}>
                            {formData.healthGoals.includes(goal) && <CheckCircle2 size={12} className="text-primary-foreground" />}
                          </div>
                          <span className="text-sm font-medium">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-foreground">Kitchen Profile</h2>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Cooking Skill Level</label>
                    <div className="flex bg-input rounded-xl p-1">
                      {["Beginner", "Intermediate", "Advanced"].map(skill => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => setFormData({...formData, cookingSkill: skill})}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${formData.cookingSkill === skill ? 'bg-card shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Household Size</label>
                      <input type="number" required min="1" max="20" value={formData.householdSize} onChange={(e) => setFormData({...formData, householdSize: e.target.value})} className="w-full bg-input text-foreground border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Monthly Budget ($)</label>
                      <input type="number" required min="0" value={formData.monthlyBudget} onChange={(e) => setFormData({...formData, monthlyBudget: e.target.value})} className="w-full bg-input text-foreground border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary" placeholder="400" />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 flex flex-col items-center justify-center text-center pt-8"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">All Set!</h2>
                  <p className="text-muted-foreground max-w-sm">
                    Our AI has analyzed your profile and is ready to generate personalized recipes and meal plans just for you.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4 mt-12 pt-6 border-t border-border">
              {step > 1 && step < totalSteps && (
                <button 
                  type="button" 
                  onClick={handlePrev}
                  className="px-6 py-3 rounded-xl border border-border font-medium hover:bg-muted transition-colors flex items-center gap-2 text-foreground"
                >
                  <ArrowLeft size={20} />
                  Back
                </button>
              )}
              <button 
                type="submit" 
                disabled={isLoading || (step === 3 && !formData.cookingSkill) || (step === 2 && formData.healthGoals.length === 0 && !formData.dietaryPreference)}
                className={`flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:opacity-90 active:scale-95 transition-all flex justify-center items-center gap-2 ${step === 1 ? 'w-full' : ''} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : (step === totalSteps ? "Go to Dashboard" : "Continue")}
                {!isLoading && step < totalSteps && <ArrowRight size={20} />}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
