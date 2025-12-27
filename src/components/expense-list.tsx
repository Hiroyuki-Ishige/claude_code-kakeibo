'use client';

import { useEffect, useState, useCallback } from 'react';
import { Receipt } from 'lucide-react';
import type { Expense } from '@/lib/types';
import { ExpenseItem } from '@/components/expense-item';
import { Spinner } from '@/components/ui/spinner';

interface ExpenseListProps {
  refreshTrigger?: number;
}

export function ExpenseList({ refreshTrigger }: ExpenseListProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/expenses');

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '支出の取得に失敗しました');
      }

      const data = await response.json();
      setExpenses(data.data || []);
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
      setError(error instanceof Error ? error.message : '支出の取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses, refreshTrigger]);

  // オプティミスティックUI: 削除時に即座にUIから削除
  const handleDelete = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }, []);

  // 更新時にデータを再取得
  const handleUpdate = useCallback(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // ローディング状態
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner className="h-8 w-8 text-blue-600" />
      </div>
    );
  }

  // エラー状態
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
        <p className="text-red-700 font-medium">{error}</p>
        <button
          onClick={fetchExpenses}
          className="mt-4 text-sm text-red-600 hover:text-red-700 underline"
        >
          再試行
        </button>
      </div>
    );
  }

  // 空状態
  if (expenses.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-300 rounded-2xl p-12 text-center">
        <Receipt className="h-16 w-16 text-gray-400 mx-auto mb-4" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">まだ支出が記録されていません</h3>
        <p className="text-gray-600">上のフォームから最初の支出を記録してみましょう。</p>
      </div>
    );
  }

  // 支出一覧表示
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-gray-900">支出履歴</h2>
        <p className="text-sm text-gray-600">{expenses.length}件の支出</p>
      </div>
      <div className="space-y-3">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
