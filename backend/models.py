from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Float, JSON, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from .database import Base

class RoleEnum(enum.Enum):
    USER = "user"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), default=RoleEnum.USER)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    preferences = relationship("UserPreference", back_populates="user", uselist=False)
    subscriptions = relationship("Subscription", back_populates="user", uselist=False)
    meal_plans = relationship("MealPlan", back_populates="user")
    grocery_lists = relationship("GroceryList", back_populates="user")
    nutrition_logs = relationship("NutritionLog", back_populates="user")
    scanned_images = relationship("ScannedImage", back_populates="user")
    ai_chats = relationship("AIChat", back_populates="user")
    saved_recipes = relationship("SavedRecipe", back_populates="user")
    notifications = relationship("Notification", back_populates="user")
    achievements = relationship("Achievement", back_populates="user")

class UserPreference(Base):
    __tablename__ = "user_preferences"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    dietary_restrictions = Column(JSON, default=list) # e.g. ["vegan", "gluten-free"]
    allergies = Column(JSON, default=list)
    calorie_goal = Column(Integer, default=2000)
    
    user = relationship("User", back_populates="preferences")

class Subscription(Base):
    __tablename__ = "subscriptions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    plan_name = Column(String, default="free")
    is_active = Column(Boolean, default=True)
    end_date = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="subscriptions")

class Ingredient(Base):
    __tablename__ = "ingredients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    category = Column(String) # e.g. "produce", "dairy"

class Recipe(Base):
    __tablename__ = "recipes"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    instructions = Column(JSON) # List of steps
    prep_time = Column(Integer) # in minutes
    cook_time = Column(Integer)
    calories = Column(Integer)
    protein = Column(Float)
    carbs = Column(Float)
    fat = Column(Float)
    image_url = Column(String, nullable=True)
    
    recipe_ingredients = relationship("RecipeIngredient", back_populates="recipe")

class RecipeIngredient(Base):
    __tablename__ = "recipe_ingredients"
    id = Column(Integer, primary_key=True, index=True)
    recipe_id = Column(Integer, ForeignKey("recipes.id"))
    ingredient_id = Column(Integer, ForeignKey("ingredients.id"))
    quantity = Column(Float)
    unit = Column(String)
    
    recipe = relationship("Recipe", back_populates="recipe_ingredients")
    ingredient = relationship("Ingredient")

class MealPlan(Base):
    __tablename__ = "meal_plans"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    
    user = relationship("User", back_populates="meal_plans")
    items = relationship("MealItem", back_populates="meal_plan")

class MealItem(Base):
    __tablename__ = "meal_items"
    id = Column(Integer, primary_key=True, index=True)
    meal_plan_id = Column(Integer, ForeignKey("meal_plans.id"))
    recipe_id = Column(Integer, ForeignKey("recipes.id"))
    date = Column(DateTime)
    meal_type = Column(String) # "breakfast", "lunch", "dinner"
    
    meal_plan = relationship("MealPlan", back_populates="items")
    recipe = relationship("Recipe")

class GroceryList(Base):
    __tablename__ = "grocery_lists"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="grocery_lists")
    items = relationship("GroceryItem", back_populates="grocery_list")

class GroceryItem(Base):
    __tablename__ = "grocery_items"
    id = Column(Integer, primary_key=True, index=True)
    grocery_list_id = Column(Integer, ForeignKey("grocery_lists.id"))
    ingredient_id = Column(Integer, ForeignKey("ingredients.id"))
    quantity = Column(Float)
    unit = Column(String)
    is_purchased = Column(Boolean, default=False)
    
    grocery_list = relationship("GroceryList", back_populates="items")
    ingredient = relationship("Ingredient")

class NutritionLog(Base):
    __tablename__ = "nutrition_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(DateTime, default=datetime.utcnow)
    total_calories = Column(Integer)
    total_protein = Column(Float)
    total_carbs = Column(Float)
    total_fat = Column(Float)
    water_intake_ml = Column(Integer, default=0)
    
    user = relationship("User", back_populates="nutrition_logs")

class ScannedImage(Base):
    __tablename__ = "scanned_images"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    image_url = Column(String)
    detected_ingredients = Column(JSON) # mock data for MVP
    confidence_score = Column(Float)
    scanned_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="scanned_images")

class AIChat(Base):
    __tablename__ = "ai_chats"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    message = Column(String)
    response = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="ai_chats")

class SavedRecipe(Base):
    __tablename__ = "saved_recipes"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    recipe_id = Column(Integer, ForeignKey("recipes.id"))
    saved_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="saved_recipes")
    recipe = relationship("Recipe")

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    message = Column(String)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="notifications")

class Achievement(Base):
    __tablename__ = "achievements"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    description = Column(String)
    earned_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="achievements")
