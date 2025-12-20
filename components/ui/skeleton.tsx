import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  )
}

/**
 * カードスケルトン
 * カード形式のスケルトンローダー
 */
function CardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <Skeleton className="mb-4 h-6 w-3/4" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  )
}

/**
 * テーブル行スケルトン
 * テーブルのローディング表示
 */
function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 border-b border-gray-200 py-3">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="h-4 w-20" />
    </div>
  )
}

/**
 * 支出一覧スケルトン
 * 支出リストのローディング表示
 */
function ExpenseListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * ダッシュボードサマリースケルトン
 * ダッシュボードカードのローディング表示
 */
function DashboardSummarySkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <CardSkeleton />
      <CardSkeleton />
    </div>
  )
}

export {
  Skeleton,
  CardSkeleton,
  TableRowSkeleton,
  ExpenseListSkeleton,
  DashboardSummarySkeleton
}
