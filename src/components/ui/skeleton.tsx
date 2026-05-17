import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("skeleton rounded-none", className)}
      {...props}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="space-y-0">
      <Skeleton className="aspect-[3/4] w-full" />
      <div className="p-4 space-y-2 bg-[#111]">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

export function OrderSkeleton() {
  return (
    <div className="p-6 bg-[#111] border border-[#1A1A1A] space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}

export { Skeleton };
