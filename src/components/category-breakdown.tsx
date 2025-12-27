'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Utensils,
  ShoppingBasket,
  Train,
  Gamepad2,
  Shirt,
  HeartPulse,
  Home,
  Smartphone,
  MoreHorizontal,
  TrendingDown,
  type LucideIcon,
} from 'lucide-react';
import type { Expense } from '@/lib/types';
import { CATEGORY_COLORS, type ExpenseCategory } from '@/lib/constants';
import { calculateCategoryBreakdown, type CategoryBreakdown as CategoryBreakdownType } from '@/lib/date-utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface CategoryBreakdownProps {
  refreshTrigger?: number;
}

// カテゴリアイコンのマッピング
const CATEGORY_ICON_MAP: Record<ExpenseCategory, LucideIcon> = {
  食費: Utensils,
  日用品: ShoppingBasket,
  交通費: Train,
  娯楽: Gamepad2,
  '衣服・美容': Shirt,
  '医療・健康': HeartPulse,
  住居費: Home,
  通信費: Smartphone,
  その他: MoreHorizontal,
};

export function CategoryBreakdown({ refreshTrigger }: CategoryBreakdownProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [breakdown, setBreakdown] = useState<CategoryBreakdownType[]>([]);

  const fetchExpenses = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await fetch('/api/expenses');

      if (!response.ok) {
        throw new Error('支出の取得に失敗しました');
      }

      const data = await response.json();
      const expenseData = data.data || [];

      setExpenses(expenseData);
      setBreakdown(calculateCategoryBreakdown(expenseData));
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses, refreshTrigger]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-48 mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (breakdown.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-blue-600" />
            <CardTitle>カテゴリ別支出</CardTitle>
          </div>
          <CardDescription>支出をカテゴリごとに集計</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-8">まだ支出がありません</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-blue-600" />
          <CardTitle>カテゴリ別支出</CardTitle>
        </div>
        <CardDescription>支出をカテゴリごとに集計</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {breakdown.map((item) => {
            const CategoryIcon = CATEGORY_ICON_MAP[item.category] || MoreHorizontal;
            const categoryColor = CATEGORY_COLORS[item.category] || 'bg-gray-500';

            return (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`${categoryColor} rounded-full p-1.5 flex-shrink-0`}>
                      <CategoryIcon className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{item.category}</span>
                    <span className="text-xs text-gray-500">({item.count}件)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">
                      ¥{item.amount.toLocaleString('ja-JP')}
                    </span>
                    <span className="text-xs text-gray-500 w-12 text-right">
                      {item.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                {/* プログレスバー */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${categoryColor} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
