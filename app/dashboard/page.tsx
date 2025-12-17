import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Welcome Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">ダッシュボード</h1>
            <p className="mt-2 text-gray-600">
              支出を記録して、支出状況を確認しましょう
            </p>
          </div>

          {/* Summary Cards */}
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>今週の合計</CardTitle>
                <CardDescription>月曜日から今日まで</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">¥0</p>
                <p className="mt-2 text-sm text-gray-600">
                  支出記録がまだありません
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>今月の合計</CardTitle>
                <CardDescription>{new Date().getMonth() + 1}月</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">¥0</p>
                <p className="mt-2 text-sm text-gray-600">
                  支出記録がまだありません
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Expense Form Placeholder */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>支出を記録</CardTitle>
              <CardDescription>
                日々の支出を記録しましょう
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">
                支出記録フォームはフェーズ2で実装予定です
              </p>
            </CardContent>
          </Card>

          {/* Recent Expenses Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>最近の支出</CardTitle>
              <CardDescription>
                最新の支出履歴を表示
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">
                支出履歴はフェーズ2で実装予定です
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
