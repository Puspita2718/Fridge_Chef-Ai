export type DetectedCategory = "Produce" | "Dairy" | "Meat" | "Pantry" | "Mixed" | "Fruits" | "Vegetables";
export type FreshnessLevel = "high" | "medium" | "low";

export interface DetectedItem {
  id: string;
  name: string;
  confidence: number;
  freshness: FreshnessLevel;
  category: DetectedCategory;
  expiry: string;
}

export type ImageType = 
  | "Refrigerator" 
  | "Fruits" 
  | "Vegetables" 
  | "Pantry" 
  | "Dairy" 
  | "Meat" 
  | "Mixed Food" 
  | "Kitchen Counter" 
  | "Non-food / Unknown";

export interface VisionAnalysisResult {
  imageType: ImageType;
  overallConfidence: number;
  ingredients: DetectedItem[];
  isFood: boolean;
}

// Mock Datasets mapped by type
const DATASETS: Record<string, Omit<DetectedItem, "id" | "confidence" | "freshness" | "expiry">[]> = {
  "Fruits": [
    { name: "Apples", category: "Fruits" },
    { name: "Bananas", category: "Fruits" },
    { name: "Oranges", category: "Fruits" },
    { name: "Strawberries", category: "Fruits" },
    { name: "Grapes", category: "Fruits" },
    { name: "Mangoes", category: "Fruits" },
  ],
  "Vegetables": [
    { name: "Spinach", category: "Vegetables" },
    { name: "Carrots", category: "Vegetables" },
    { name: "Bell Peppers", category: "Vegetables" },
    { name: "Broccoli", category: "Vegetables" },
    { name: "Tomatoes", category: "Vegetables" },
    { name: "Onions", category: "Produce" },
    { name: "Garlic", category: "Produce" },
  ],
  "Dairy": [
    { name: "Whole Milk", category: "Dairy" },
    { name: "Cheddar Cheese", category: "Dairy" },
    { name: "Eggs", category: "Dairy" },
    { name: "Greek Yogurt", category: "Dairy" },
    { name: "Butter", category: "Dairy" },
  ],
  "Meat": [
    { name: "Chicken Breast", category: "Meat" },
    { name: "Ground Beef", category: "Meat" },
    { name: "Salmon Fillets", category: "Meat" },
    { name: "Pork Chops", category: "Meat" },
    { name: "Bacon", category: "Meat" },
  ],
  "Pantry": [
    { name: "Pasta", category: "Pantry" },
    { name: "Rice", category: "Pantry" },
    { name: "Canned Beans", category: "Pantry" },
    { name: "Olive Oil", category: "Pantry" },
    { name: "Flour", category: "Pantry" },
    { name: "Sugar", category: "Pantry" },
  ]
};

// Helper to generate a random number within a range
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper to generate randomized detected items
const generateRandomItems = (baseItems: Omit<DetectedItem, "id" | "confidence" | "freshness" | "expiry">[]): DetectedItem[] => {
  // Pick a random subset
  const numItems = randomInt(3, Math.min(6, baseItems.length));
  const shuffled = [...baseItems].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, numItems);

  return selected.map(item => {
    const freshnessOpts: FreshnessLevel[] = ["high", "medium", "low"];
    const expiryDays = randomInt(1, 21);
    
    return {
      id: Math.random().toString(36).substring(2, 9),
      name: item.name,
      category: item.category,
      confidence: randomInt(85, 99),
      freshness: freshnessOpts[randomInt(0, 2)],
      expiry: `${expiryDays} ${expiryDays === 1 ? 'day' : 'days'}`
    };
  });
};

/**
 * Analyzes an image data URL using lightweight canvas heuristics to determine its type
 * and return realistic mock food ingredients.
 * 
 * Future replacement point: Swap this logic to call Gemini/OpenAI Vision API.
 */
export const analyzeImageMock = (dataUrl: string): Promise<VisionAnalysisResult> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      // Create a small canvas for fast processing
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context not available"));
        return;
      }

      // Resize down to 64x64 to quickly sample pixels
      const size = 64;
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0, size, size);
      
      const imgData = ctx.getImageData(0, 0, size, size).data;
      

      const brightnesses = [];
      let greenPixels = 0;
      let warmPixels = 0; // Red/Orange
      let whitePixels = 0;

      for (let i = 0; i < imgData.length; i += 4) {
        const r = imgData[i];
        const g = imgData[i + 1];
        const b = imgData[i + 2];

        const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
        brightnesses.push(brightness);

        // Color heuristics
        if (g > r + 30 && g > b + 30) greenPixels++;
        if (r > g + 40 && r > b + 40) warmPixels++;
        if (r > 200 && g > 200 && b > 200) whitePixels++;
      }

      const pixelCount = size * size;
      const avgBrightness = brightnesses.reduce((a, b) => a + b, 0) / pixelCount;
      
      // Calculate variance / contrast
      const variance = brightnesses.reduce((sum, b) => sum + Math.pow(b - avgBrightness, 2), 0) / pixelCount;
      const stdDev = Math.sqrt(variance);

      // Ratios
      const greenRatio = greenPixels / pixelCount;
      const warmRatio = warmPixels / pixelCount;
      const whiteRatio = whitePixels / pixelCount;

      let imageType: ImageType = "Non-food / Unknown";
      let overallConfidence = randomInt(40, 60);

      // Heuristic Classification Logic
      if (stdDev < 25) {
        // Very low contrast: usually a blank wall, blurry close-up, ceiling, etc.
        imageType = "Non-food / Unknown";
        overallConfidence = randomInt(10, 45);
      } else if (greenRatio > 0.15) {
        imageType = "Vegetables";
        overallConfidence = randomInt(85, 96);
      } else if (warmRatio > 0.15) {
        imageType = "Fruits";
        overallConfidence = randomInt(85, 95);
      } else if (whiteRatio > 0.2 && stdDev > 40) {
        // Bright with high contrast: typically inside a well-lit fridge
        imageType = "Refrigerator";
        overallConfidence = randomInt(88, 98);
      } else if (stdDev > 45 && avgBrightness < 100) {
        // High contrast but darker: Pantry / Kitchen counter
        imageType = "Pantry";
        overallConfidence = randomInt(80, 92);
      } else if (stdDev > 35) {
        // Generic fallback for structured images
        imageType = "Mixed Food";
        overallConfidence = randomInt(75, 89);
      } else {
        // Fallback for unstructured/room-like
        imageType = "Non-food / Unknown";
        overallConfidence = randomInt(20, 50);
      }

      const isFood = imageType !== "Non-food / Unknown";
      let ingredients: DetectedItem[] = [];

      if (isFood) {
        if (imageType === "Fruits") ingredients = generateRandomItems(DATASETS["Fruits"]);
        else if (imageType === "Vegetables") ingredients = generateRandomItems(DATASETS["Vegetables"]);
        else if (imageType === "Pantry") ingredients = generateRandomItems(DATASETS["Pantry"]);
        else if (imageType === "Refrigerator") {
          // Mix of dairy, produce, meat
          ingredients = [
            ...generateRandomItems(DATASETS["Dairy"]).slice(0, 2),
            ...generateRandomItems(DATASETS["Vegetables"]).slice(0, 2),
            ...generateRandomItems(DATASETS["Meat"]).slice(0, 1),
          ];
        } else {
          // Mixed Food
          ingredients = [
            ...generateRandomItems(DATASETS["Fruits"]).slice(0, 1),
            ...generateRandomItems(DATASETS["Pantry"]).slice(0, 2),
          ];
        }
      }

      resolve({
        imageType,
        overallConfidence,
        ingredients,
        isFood
      });
    };

    img.onerror = () => {
      reject(new Error("Failed to load image for analysis"));
    };

    img.src = dataUrl;
  });
};
