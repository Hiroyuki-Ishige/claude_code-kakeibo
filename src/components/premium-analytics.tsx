'use client';

import { useEffect, useState } from 'react';
import { Expense } from '@/lib/types';
import { PlanProtect } from '@/components/plan-protect';
import { CategoryPieChart } from '@/components/analytics/category-pie-chart';
import { CategoryBarChart } from '@/components/analytics/category-bar-chart';
import { useLanguage } from '@/contexts/language-context';

interface PremiumAnalyticsProps {
  refreshTrigger: number;
}

export function PremiumAnalytics({ refreshTrigger }: PremiumAnalyticsProps) {
  const { language } = useLanguage();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

    fetchExpenses();
  }, [refreshTrigger]);

  return (
    <PlanProtect>
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-sm font-semibold shadow-md">
            <span className="text-lg">👑</span>
            <span>{language === 'ja' ? 'プレミアム分析' : 'Premium Analytics'}</span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12 text-gray-500">
            {language === 'ja' ? '読み込み中...' : 'Loading...'}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <CategoryPieChart expenses={expenses} periodType="monthly" />
            <CategoryBarChart expenses={expenses} periodType="monthly" />
          </div>
        )}
      </div>
    </PlanProtect>
  );
}
