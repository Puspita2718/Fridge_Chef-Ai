import { Skeleton } from "@/components/ui/skeleton";

export default function SavedRecipesLoading() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Skeleton className="h-9 w-48 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Skeleton className="h-10 w-full md:w-64 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Skeleton key={i} className="h-[340px] rounded-3xl" />
        ))}
      </div>
    </div>
  );
}
