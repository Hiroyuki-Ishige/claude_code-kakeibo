'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Header } from '@/components/layout/header';
import { Expense } from '@/lib/types';
import { PlanProtect } from '@/components/plan-protect';
import { CategoryPieChart } from '@/components/analytics/category-pie-chart';
import { CategoryBarChart } from '@/components/analytics/category-bar-chart';
import { MonthlyLineChart } from '@/components/analytics/monthly-line-chart';
import { WeeklyBarChart } from '@/components/analytics/weekly-bar-chart';
import { DailyBarChart } from '@/components/analytics/daily-bar-chart';
import { AnalyticsGuide } from '@/components/analytics/analytics-guide';
import { PeriodSwitcher } from '@/components/analytics/period-switcher';
import { PeriodComparisonCard } from '@/components/analytics/period-comparison-card';
import { filterExpensesByMonth, aggregateByMonth, PeriodType, calculatePeriodComparison, filterExpensesByPeriod } from '@/lib/analytics';
import { useLanguage } from '@/contexts/language-context';
import { Crown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AnalyticsPage() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const { t, language } = useLanguage();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('monthly');

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/sign-in');
    }
  }, [isLoaded, userId, router]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/expenses');

        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }

        const data = await response.json();
        setExpenses(data.data || []);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchExpenses();
    }
  }, [userId]);

  // 期間タイプに応じてフィルタリングされた支出データ
  const filteredExpenses = useMemo(() => {
    return filterExpensesByPeriod(expenses, selectedPeriod, selectedMonth);
  }, [expenses, selectedPeriod, selectedMonth]);

  // 選択された月のラベルを取得
  const selectedMonthLabel = useMemo(() => {
    if (!selectedMonth) return null;
    const monthlyData = aggregateByMonth(expenses, language);
    const found = monthlyData.find(m => m.month === selectedMonth);
    return found?.monthLabel || null;
  }, [selectedMonth, expenses, language]);

  // 期間比較データを計算
  const periodComparison = useMemo(() => {
    return calculatePeriodComparison(expenses, selectedPeriod, language);
  }, [expenses, selectedPeriod, language]);

  const handleMonthSelect = (month: string | null) => {
    setSelectedMonth(month);
  };

  const handleResetMonth = () => {
    setSelectedMonth(null);
  };

  // 期間タイプが変更されたら月選択をリセット
  useEffect(() => {
    if (selectedPeriod !== 'monthly') {
      setSelectedMonth(null);
    }
  }, [selectedPeriod]);

  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
        {/* Premium Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzQjgyRjYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bS0yIDJ2Mmgydi0yaC0yem0wLTR2Mmgydi0yaC0yem0tMiA0djJoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative z-10">
          {/* Page Header */}
          <div className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-5 shadow-xl border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">{t('analytics.title')}</h1>
            </div>
            <p className="text-blue-50 text-base">
              {t('analytics.description')}
            </p>
          </div>

          {/* Premium Analytics Content */}
          <PlanProtect>
            {isLoading ? (
              <div className="flex items-center justify-center py-12 text-gray-500">
                {t('analytics.noData')}...
              </div>
            ) : (
              <div className="space-y-6">
                {/* Analytics Guide */}
                <AnalyticsGuide />

                {/* Period Switcher */}
                <PeriodSwitcher
                  selectedPeriod={selectedPeriod}
                  onPeriodChange={setSelectedPeriod}
                />

                {/* Period Comparison */}
                <PeriodComparisonCard
                  comparison={periodComparison}
                  periodType={selectedPeriod}
                />

                {/* Period-based Charts */}
                {selectedPeriod === 'daily' && (
                  <DailyBarChart expenses={expenses} />
                )}

                {selectedPeriod === 'weekly' && (
                  <WeeklyBarChart expenses={expenses} />
                )}

                {selectedPeriod === 'monthly' && (
                  <>
                    <MonthlyLineChart
                      expenses={expenses}
                      onMonthSelect={handleMonthSelect}
                      selectedMonth={selectedMonth}
                    />

                    {/* Selected Month Indicator and Reset */}
                    {selectedMonth && selectedMonthLabel && (
                      <div className="flex items-center justify-center gap-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                        <span className="text-blue-900 font-medium">
                          {t('analytics.selectedMonth')}: {selectedMonthLabel}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleResetMonth}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                        >
                          <X className="h-4 w-4 mr-1" />
                          {t('analytics.showAllMonths')}
                        </Button>
                      </div>
                    )}
                  </>
                )}

                {/* Category Charts - Side by Side */}
                <div className="grid gap-6 md:grid-cols-2">
                  <CategoryPieChart expenses={filteredExpenses} periodType={selectedPeriod} />
                  <CategoryBarChart expenses={filteredExpenses} periodType={selectedPeriod} />
                </div>
              </div>
            )}
          </PlanProtect>
        </div>
      </main>
    </div>
  );
}
