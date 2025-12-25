'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExpenseForm } from '@/components/expense-form';
import { useLanguage } from '@/contexts/language-context';

export default function DashboardPage() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/sign-in');
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Welcome Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.title')}</h1>
            <p className="mt-2 text-gray-600">
              {t('dashboard.description')}
            </p>
          </div>

          {/* Summary Cards */}
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.thisWeek.title')}</CardTitle>
                <CardDescription>{t('dashboard.thisWeek.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">¥0</p>
                <p className="mt-2 text-sm text-gray-600">
                  {t('dashboard.noExpenses')}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.thisMonth.title')}</CardTitle>
                <CardDescription>{new Date().getMonth() + 1}月</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">¥0</p>
                <p className="mt-2 text-sm text-gray-600">
                  {t('dashboard.noExpenses')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Expense Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t('dashboard.recordExpense.title')}</CardTitle>
              <CardDescription>
                {t('dashboard.recordExpense.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExpenseForm />
            </CardContent>
          </Card>

          {/* Recent Expenses Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.recentExpenses.title')}</CardTitle>
              <CardDescription>
                {t('dashboard.recentExpenses.description')}
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
