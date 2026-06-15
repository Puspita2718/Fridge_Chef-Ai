import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="relative rounded-3xl border border-border overflow-hidden">
        <Skeleton className="h-40 w-full" />
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-16 mb-6">
            <Skeleton className="w-32 h-32 rounded-2xl border-4 border-background" />
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-5 w-48" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-28 rounded-3xl" />
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <Skeleton className="h-80 rounded-3xl" />
        <Skeleton className="h-80 rounded-3xl" />
      </div>
    </div>
  );
}
