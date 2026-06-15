import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Skeleton className="h-9 w-40 mb-2" />
          <Skeleton className="h-5 w-72" />
        </div>
        <Skeleton className="h-10 w-36 rounded-full" />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-12 w-full rounded-xl" />
          ))}
        </div>
        <div className="md:col-span-2 space-y-6">
          <Skeleton className="h-48 rounded-3xl" />
          <Skeleton className="h-40 rounded-3xl" />
          <Skeleton className="h-32 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
