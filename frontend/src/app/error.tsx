"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-24 px-4 text-center">
        <h1 className="text-4xl font-bold text-destructive mb-4">Something went wrong!</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          The oven got a bit too hot. We encountered an unexpected error while trying to serve this page.
        </p>
        <button
          onClick={() => reset()}
          className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
      </main>
      <Footer />
    </div>
  );
}
