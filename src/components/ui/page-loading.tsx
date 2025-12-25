import { Spinner } from './spinner';
import { Skeleton } from './skeleton';
import { Card } from './card';

/**
 * ページローディングコンポーネント
 * ページ全体のローディング表示
 */
export function PageLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" />
        <p className="text-sm font-medium text-gray-700">読み込み中...</p>
      </div>
    </div>
  );
}

/**
 * ダッシュボードローディング
 * ダッシュボードページのローディング表示
 */
export function DashboardLoading() {
  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-6">
      {/* ヘッダースケルトン */}
      <div className="mb-6">
        <Skeleton className="mb-2 h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* サマリーカードスケルトン */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <Skeleton className="mb-2 h-4 w-24" />
          <Skeleton className="h-8 w-32" />
        </Card>
        <Card className="p-6">
          <Skeleton className="mb-2 h-4 w-24" />
          <Skeleton className="h-8 w-32" />
        </Card>
      </div>

      {/* フォームスケルトン */}
      <Card className="p-6">
        <Skeleton className="mb-4 h-6 w-32" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-24" />
        </div>
      </Card>

      {/* リストスケルトン */}
      <Card className="p-6">
        <Skeleton className="mb-4 h-6 w-32" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/**
 * コンテンツローディング
 * コンテンツエリアのローディング表示
 */
export function ContentLoading({ message = '読み込み中...' }: { message?: string }) {
  return (
    <div className="flex min-h-50 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="md" />
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
}
