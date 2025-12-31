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

      <main className="flex-1 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Crown className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">{t('analytics.title')}</h1>
            </div>
            <p className="text-gray-600">
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
