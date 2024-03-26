import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col">
      <div className="bg-white dark:bg-dark rounded-lg flex flex-col p-4 mb-10">
        <div className="flex gap-5 mb-7">
          <Skeleton className="w-24 h-12" />
          <Skeleton className="w-36 h-12" />
        </div>
        <div className="flex flex-col gap-10">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-16" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-96" />
          <Skeleton className="w-24 h-12" />
        </div>
      </div>
    </div>
  );
}
