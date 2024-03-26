import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="flex flex-col">
      <div className="bg-white dark:bg-dark rounded-lg flex flex-col p-4 mb-10">
        <div className="flex justify-between gap-5 mb-7">
          <Skeleton className="w-24 h-12" />
          <Skeleton className="w-12 h-12 rounded-full" />
        </div>
        <div className="flex flex-col gap-10">
          <Skeleton className="w-full h-[70vh]" />
        </div>
      </div>
    </div>
  );
}
