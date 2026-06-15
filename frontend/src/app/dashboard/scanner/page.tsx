"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  UploadCloud, 
  Camera as CameraIcon, 
  Image as ImageIcon, 
  X, 
  AlertCircle,
  CheckCircle2,
  Sparkles,
  RefreshCcw,
  ChefHat,
  Trash2,
  Plus,
  Apple,
  Carrot,
  Milk,
  Beef,
  Package,
  Utensils,
  AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { analyzeImageMock, DetectedItem, ImageType } from "@/lib/mockVisionService";

type ScanState = "idle" | "uploading" | "analyzing" | "identifying" | "estimating" | "success" | "failed" | "error";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Produce":
    case "Vegetables": return Carrot;
    case "Fruits": return Apple;
    case "Dairy": return Milk;
    case "Meat": return Beef;
    case "Pantry": return Package;
    default: return Utensils;
  }
};

const getFreshnessColor = (freshness: string) => {
  switch (freshness) {
    case "high": return "bg-emerald-500";
    case "medium": return "bg-amber-500";
    case "low": return "bg-red-500";
    default: return "bg-slate-500";
  }
};

export default function ScannerPage() {
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Vision Results State
  const [ingredients, setIngredients] = useState<DetectedItem[]>([]);
  const [imageType, setImageType] = useState<ImageType | null>(null);
  const [overallConfidence, setOverallConfidence] = useState<number>(0);
  
  const [newItemName, setNewItemName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Camera State
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      setMediaStream(stream);
      setIsCameraOpen(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      const err = error as Error;
      console.error("Camera error:", err);
      if (err.name === 'NotAllowedError') {
        setCameraError("Camera permission was denied. Please allow camera access in your browser.");
      } else if (err.name === 'NotFoundError') {
        setCameraError("No camera found on this device.");
      } else {
        setCameraError("Failed to open camera. Please try again or use the upload option.");
      }
      setIsCameraOpen(true);
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        stopCamera();
        setPreviewImage(dataUrl);
        processImageVision(dataUrl);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaStream]);


  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setScanState("error");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setPreviewImage(dataUrl);
      processImageVision(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const processImageVision = async (dataUrl: string) => {
    // Phase 1: Uploading
    setScanState("uploading");
    
    // Simulate network delay for upload
    await new Promise(r => setTimeout(r, 800));
    
    // Phase 2: Analyzing Image
    setScanState("analyzing");
    
    try {
      // Actually run the heuristic analysis!
      const result = await analyzeImageMock(dataUrl);
      
      // Phase 3: Identifying Food
      await new Promise(r => setTimeout(r, 1000));
      setScanState("identifying");
      
      // Phase 4: Estimating Freshness
      await new Promise(r => setTimeout(r, 1000));
      setScanState("estimating");
      
      await new Promise(r => setTimeout(r, 800));
      
      // Apply results
      setImageType(result.imageType);
      setOverallConfidence(result.overallConfidence);
      
      if (result.isFood) {
        setIngredients(result.ingredients);
        setScanState("success");
      } else {
        setIngredients([]);
        setScanState("failed");
      }

    } catch (error) {
      console.error(error);
      setScanState("error");
    }
  };

  const handleScanAgain = () => {
    setScanState("idle");
    setPreviewImage(null);
    setIngredients([]);
    setImageType(null);
    setOverallConfidence(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeIngredient = (id: string) => {
    setIngredients(prev => prev.filter(item => item.id !== id));
  };

  const addIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    
    const newItem: DetectedItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      confidence: 100,
      freshness: "high",
      category: "Pantry",
      expiry: "Unknown"
    };
    
    setIngredients(prev => [newItem, ...prev]);
    setNewItemName("");
  };

  const isScanning = ["uploading", "analyzing", "identifying", "estimating"].includes(scanState);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-sm font-medium text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground transition-colors">
          Dashboard
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground">AI Scanner</span>
      </nav>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Fridge Scanner</h1>
          <p className="text-muted-foreground mt-1">
            Upload or snap a photo of your fridge to instantly detect ingredients.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* Left Column: Upload / Preview Area */}
        <Card className="overflow-hidden border-2 h-full flex flex-col min-h-[450px]">
          {scanState === "idle" || scanState === "error" ? (
            <div 
              className={`flex-1 flex flex-col items-center justify-center p-8 text-center transition-colors border-dashed border-2 rounded-xl m-4 ${
                isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:bg-muted/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <UploadCloud className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Drag & Drop image</h3>
              <p className="text-sm text-muted-foreground mb-8 max-w-xs mx-auto">
                Supports JPG, PNG and WEBP. Maximum file size 5MB.
              </p>
              
              {scanState === "error" && (
                <div className="mb-6 flex items-center gap-2 text-destructive bg-destructive/10 px-4 py-2 rounded-md">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Please upload a valid image file.</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <ImageIcon className="h-4 w-4" />
                  Browse Image
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileSelect}
                />
                <button 
                  onClick={startCamera}
                  className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <CameraIcon className="h-4 w-4" />
                  Camera
                </button>
              </div>
            </div>
          ) : (
            <div className="relative flex-1 bg-black/5 rounded-xl m-4 overflow-hidden group">
              {previewImage && (
                <img 
                  src={previewImage} 
                  alt="Fridge Preview" 
                  className="w-full h-full object-cover"
                />
              )}
              
              {isScanning && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                  <div className="relative mb-6">
                    <div className="h-24 w-24 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-primary animate-pulse" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground">
                    {scanState === "uploading" && "Uploading image..."}
                    {scanState === "analyzing" && "Analyzing Image..."}
                    {scanState === "identifying" && "Identifying Food..."}
                    {scanState === "estimating" && "Estimating Freshness..."}
                  </h3>
                  
                  <div className="w-full max-w-xs bg-muted rounded-full h-2 mt-4 overflow-hidden">
                    <div 
                      className="bg-primary h-full transition-all duration-500" 
                      style={{ 
                        width: scanState === "uploading" ? "25%" : 
                               scanState === "analyzing" ? "50%" : 
                               scanState === "identifying" ? "75%" : "95%"
                      }} 
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Right Column: Results Area */}
        <div className="flex flex-col h-full min-h-[450px]">
          {scanState === "idle" || scanState === "error" ? (
            <Card className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-muted/30 border-dashed border-2">
              <div className="h-16 w-16 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm">
                <Sparkles className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-medium text-muted-foreground">No ingredients detected yet</h3>
              <p className="text-sm text-muted-foreground max-w-xs mt-2">
                Upload a photo of your fridge to let our AI identify your ingredients.
              </p>
            </Card>
          ) : isScanning ? (
            <Card className="flex-1">
              <CardHeader>
                <Skeleton className="h-7 w-1/3 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-md" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-8 w-16 rounded-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : scanState === "failed" ? (
            <Card className="flex-1 flex flex-col items-center justify-center p-8 text-center border-destructive/30 bg-destructive/5">
              <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4 text-destructive">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-foreground">No food ingredients detected.</h3>
              <p className="text-sm text-muted-foreground max-w-xs mt-2">
                Please upload or capture a clear image of the inside of your refrigerator or pantry.
              </p>
              
              <div className="mt-6 w-full max-w-xs bg-background rounded-lg border p-4 text-left">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Diagnostic Info</p>
                <p className="text-sm font-medium">Type: <span className="text-foreground">{imageType}</span></p>
                <p className="text-sm font-medium mt-1">Confidence: <span className="text-destructive">{overallConfidence}%</span></p>
              </div>

              <button 
                onClick={handleScanAgain}
                className="mt-6 bg-background border border-input hover:bg-accent text-accent-foreground px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
              >
                <RefreshCcw className="h-4 w-4" /> Try Again
              </button>
            </Card>
          ) : (
            <Card className="flex-1 flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      Scan Complete
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Detected {ingredients.length} ingredients from <span className="font-medium text-foreground">{imageType}</span>.
                    </CardDescription>
                  </div>
                  <button 
                    onClick={handleScanAgain}
                    className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-muted transition-colors"
                    title="Scan Again"
                  >
                    <RefreshCcw className="h-5 w-5" />
                  </button>
                </div>
                {/* Confidence Metric */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                  <span className="text-sm font-medium">Overall Confidence:</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-[100px]">
                    <div className="h-full bg-emerald-500" style={{ width: `${overallConfidence}%` }} />
                  </div>
                  <span className="text-sm font-bold text-emerald-600">{overallConfidence}%</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col overflow-hidden">
                
                {/* Add Item Form */}
                <form onSubmit={addIngredient} className="flex gap-2 mb-4">
                  <input 
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Add missing ingredient..."
                    className="flex-1 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                  <button 
                    type="submit"
                    disabled={!newItemName.trim()}
                    className="h-9 px-3 bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-md text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </form>

                <div className="space-y-3 flex-1 overflow-y-auto pr-2 pb-4">
                  {ingredients.map((item) => {
                    const IconComponent = getCategoryIcon(item.category);
                    return (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border bg-card hover:bg-accent/50 transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium leading-none mb-1.5">{item.name}</p>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                              <span className="bg-muted px-2 py-0.5 rounded-full">{item.category}</span>
                              <div className="flex items-center gap-1">
                                <div className={`h-2 w-2 rounded-full ${getFreshnessColor(item.freshness)}`} />
                                <span className="capitalize">{item.freshness}</span>
                              </div>
                              <span>• Exp: {item.expiry}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button 
                            onClick={() => removeIngredient(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <div className="text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                            {item.confidence}% Match
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {ingredients.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      No ingredients remaining. Add some manually or scan again.
                    </div>
                  )}
                </div>
                
                <div className="pt-4 mt-auto border-t">
                  <button 
                    disabled={ingredients.length === 0}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:hover:shadow-none flex items-center justify-center gap-2"
                  >
                    <ChefHat className="h-5 w-5" />
                    Generate Recipes
                  </button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Camera Modal Overlay */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          <div className="bg-card w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-lg">Take a Photo</h3>
              <button onClick={stopCamera} className="p-1 hover:bg-muted rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="relative bg-black aspect-video flex items-center justify-center overflow-hidden">
              {cameraError ? (
                <div className="text-center p-6">
                  <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-4" />
                  <p className="text-muted-foreground max-w-sm">{cameraError}</p>
                </div>
              ) : (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover"
                />
              )}
              {/* Hidden canvas for capturing */}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            <div className="p-4 flex justify-center gap-4 bg-muted/30">
              <button 
                onClick={stopCamera}
                className="px-6 py-2.5 rounded-full font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              {!cameraError && (
                <button 
                  onClick={capturePhoto}
                  className="px-8 py-2.5 rounded-full font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-colors flex items-center gap-2"
                >
                  <CameraIcon className="h-4 w-4" />
                  Capture
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
