import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  parseISO,
  addWeeks,
  addMonths,
  format,
} from 'date-fns';
import { ja } from 'date-fns/locale';
import type { Expense } from './types';
import type { ExpenseCategory } from './constants';

/**
 * 指定週の支出をフィルタリング
 * @param offset - 0: 今週, -1: 先週, 1: 来週
 */
export function filterWeekExpenses(expenses: Expense[], offset: number = 0): Expense[] {
  const now = addWeeks(new Date(), offset);
  const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // 月曜日始まり
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

  return expenses.filter((expense) => {
    const expenseDate = parseISO(expense.date);
    return isWithinInterval(expenseDate, { start: weekStart, end: weekEnd });
  });
}

/**
 * 指定週の支出合計を計算
 * @param offset - 0: 今週, -1: 先週, 1: 来週
 */
export function calculateWeekTotal(expenses: Expense[], offset: number = 0): number {
  return filterWeekExpenses(expenses, offset).reduce((sum, expense) => sum + expense.amount, 0);
}

/**
 * 指定月の支出をフィルタリング
 * @param offset - 0: 今月, -1: 先月, 1: 来月
 */
export function filterMonthExpenses(expenses: Expense[], offset: number = 0): Expense[] {
  const now = addMonths(new Date(), offset);
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  return expenses.filter((expense) => {
    const expenseDate = parseISO(expense.date);
    return isWithinInterval(expenseDate, { start: monthStart, end: monthEnd });
  });
}

/**
 * 指定月の支出合計を計算
 * @param offset - 0: 今月, -1: 先月, 1: 来月
 */
export function calculateMonthTotal(expenses: Expense[], offset: number = 0): number {
  return filterMonthExpenses(expenses, offset).reduce((sum, expense) => sum + expense.amount, 0);
}

/**
 * 支出の総合計を計算
 */
export function calculateTotal(expenses: Expense[]): number {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

/**
 * 指定週の期間を文字列でフォーマット
 * @param offset - 0: 今週, -1: 先週, 1: 来週
 */
export function formatWeekPeriod(offset: number = 0): string {
  const now = addWeeks(new Date(), offset);
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

  return `${format(weekStart, 'M/d', { locale: ja })} - ${format(weekEnd, 'M/d', { locale: ja })}`;
}

/**
 * 指定月の期間を文字列でフォーマット
 * @param offset - 0: 今月, -1: 先月, 1: 来月
 */
export function formatMonthPeriod(offset: number = 0): string {
  const now = addMonths(new Date(), offset);
  return format(now, 'yyyy年M月', { locale: ja });
}

/**
 * 日付範囲内の支出を取得
 */
export function filterExpensesByDateRange(
  expenses: Expense[],
  startDate: Date,
  endDate: Date
): Expense[] {
  return expenses.filter((expense) => {
    const expenseDate = parseISO(expense.date);
    return isWithinInterval(expenseDate, { start: startDate, end: endDate });
  });
}

/**
 * カテゴリ別の支出内訳
 */
export interface CategoryBreakdown {
  category: ExpenseCategory;
  amount: number;
  count: number;
  percentage: number;
}

/**
 * カテゴリ別の支出合計を計算
 */
export function calculateCategoryBreakdown(expenses: Expense[]): CategoryBreakdown[] {
  const total = calculateTotal(expenses);

  // カテゴリごとにグループ化
  const categoryMap = new Map<ExpenseCategory, { amount: number; count: number }>();

  expenses.forEach((expense) => {
    const categoryName = expense.category?.name as ExpenseCategory;
    if (!categoryName) return;

    const current = categoryMap.get(categoryName) || { amount: 0, count: 0 };
    categoryMap.set(categoryName, {
      amount: current.amount + expense.amount,
      count: current.count + 1,
    });
  });

  // CategoryBreakdown配列に変換
  const breakdown: CategoryBreakdown[] = [];
  categoryMap.forEach((value, category) => {
    breakdown.push({
      category,
      amount: value.amount,
      count: value.count,
      percentage: total > 0 ? (value.amount / total) * 100 : 0,
    });
  });

  // 金額の降順でソート
  return breakdown.sort((a, b) => b.amount - a.amount);
}
