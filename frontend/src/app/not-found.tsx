import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-24 px-4 text-center">
        <h1 className="text-9xl font-black text-primary/20 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Oops! The page you're looking for seems to have been eaten by the AI. Let's get you back to the kitchen.
        </p>
        <Link 
          href="/" 
          className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          Return Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
