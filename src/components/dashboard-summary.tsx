'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { TrendingUp, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import type { Expense } from '@/lib/types';
import {
  calculateWeekTotal,
  calculateMonthTotal,
  filterWeekExpenses,
  filterMonthExpenses,
  formatWeekPeriod,
  formatMonthPeriod
} from '@/lib/date-utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardSummaryProps {
  refreshTrigger?: number;
}

export function DashboardSummary({ refreshTrigger }: DashboardSummaryProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [weekOffset, setWeekOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);

  // Calculate totals based on offset
  const weekTotal = useMemo(() => calculateWeekTotal(expenses, weekOffset), [expenses, weekOffset]);
  const monthTotal = useMemo(() => calculateMonthTotal(expenses, monthOffset), [expenses, monthOffset]);

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
      <>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-32 mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-4 w-40 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-32 mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-4 w-40 mt-2" />
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
      {/* 今週の合計 */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <Button
              variant="ghost"
              size="icon"
              className="h-48 w-48"
              onClick={() => setWeekOffset((prev) => prev - 1)}
              aria-label="前の週"
            >
              <ArrowLeft className="h-24 w-24" />
            </Button>
            <CardTitle>
              {weekOffset === 0 ? '今週の支出' : weekOffset < 0 ? `${Math.abs(weekOffset)}週前の支出` : `${weekOffset}週後の支出`}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-48 w-48"
              onClick={() => setWeekOffset((prev) => prev + 1)}
              aria-label="次の週"
            >
              <ArrowRight className="h-24 w-24" />
            </Button>
          </div>
          <CardDescription>{formatWeekPeriod(weekOffset)}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-gray-900">
            ¥{weekTotal.toLocaleString('ja-JP')}
          </p>
          {weekTotal === 0 ? (
            <p className="mt-2 text-sm text-gray-600">まだ支出がありません</p>
          ) : (
            <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
              <TrendingUp className="h-4 w-4" />
              <span>{filterWeekExpenses(expenses, weekOffset).length}件の支出</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 今月の合計 */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <Button
              variant="ghost"
              size="icon"
              className="h-48 w-48"
              onClick={() => setMonthOffset((prev) => prev - 1)}
              aria-label="前の月"
            >
              <ArrowLeft className="h-24 w-24" />
            </Button>
            <CardTitle>
              {monthOffset === 0 ? '今月の支出' : monthOffset < 0 ? `${Math.abs(monthOffset)}ヶ月前の支出` : `${monthOffset}ヶ月後の支出`}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-48 w-48"
              onClick={() => setMonthOffset((prev) => prev + 1)}
              aria-label="次の月"
            >
              <ArrowRight className="h-24 w-24" />
            </Button>
          </div>
          <CardDescription>{formatMonthPeriod(monthOffset)}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-gray-900">
            ¥{monthTotal.toLocaleString('ja-JP')}
          </p>
          {monthTotal === 0 ? (
            <p className="mt-2 text-sm text-gray-600">まだ支出がありません</p>
          ) : (
            <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
              <TrendingUp className="h-4 w-4" />
              <span>{filterMonthExpenses(expenses, monthOffset).length}件の支出</span>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
