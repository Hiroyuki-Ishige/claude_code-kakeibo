'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExpenseForm } from '@/components/expense-form';
import { ExpenseList } from '@/components/expense-list';
import { DashboardSummary } from '@/components/dashboard-summary';
import { CategoryBreakdown } from '@/components/category-breakdown';
import { useLanguage } from '@/contexts/language-context';

export default function DashboardPage() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/sign-in');
    }
  }, [isLoaded, userId, router]);

  const handleExpenseCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

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

          {/* Main Layout - Left Content + Right Sidebar */}
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Summary Cards */}
              <div className="grid gap-6 md:grid-cols-2">
                <DashboardSummary refreshTrigger={refreshTrigger} />
              </div>

              {/* Category Breakdown */}
              <CategoryBreakdown refreshTrigger={refreshTrigger} />

              {/* Expense List */}
              <ExpenseList refreshTrigger={refreshTrigger} onSuccess={handleExpenseCreated} />
            </div>

            {/* Right Sidebar - Expense Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('dashboard.recordExpense.title')}</CardTitle>
                    <CardDescription>
                      {t('dashboard.recordExpense.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ExpenseForm onSuccess={handleExpenseCreated} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
