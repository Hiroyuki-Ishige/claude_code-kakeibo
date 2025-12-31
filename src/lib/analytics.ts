import { Expense, ExpenseCategory } from '@/lib/types';
import { CATEGORY_CHART_COLORS } from './constants';

/**
 * カテゴリ別集計データの型定義
 */
export interface CategoryAnalytics {
  category: ExpenseCategory;
  amount: number;
  percentage: number;
  color: string;
}

/**
 * 支出データをカテゴリ別に集計
 */
export function aggregateByCategory(expenses: Expense[]): CategoryAnalytics[] {
  // カテゴリ別の合計金額を計算
  const categoryTotals = expenses.reduce((acc, expense) => {
    // categoryオブジェクトからnameを取得（存在する場合のみ）
    const category = expense.category?.name;
    if (category) {
      acc[category] = (acc[category] || 0) + expense.amount;
    }
    return acc;
  }, {} as Record<ExpenseCategory, number>);

  // 全体の合計金額
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // カテゴリ別の配列に変換し、割合を計算
  const analytics = Object.entries(categoryTotals).map(([category, amount]) => ({
    category: category as ExpenseCategory,
    amount: amount as number,
    percentage: totalAmount > 0 ? ((amount as number) / totalAmount) * 100 : 0,
    color: CATEGORY_CHART_COLORS[category as ExpenseCategory],
  }));

  // 金額の降順でソート
  return analytics.sort((a, b) => b.amount - a.amount);
}

/**
 * 全カテゴリの支出データを生成（0円のカテゴリも含む）
 */
export function getAllCategoryAnalytics(expenses: Expense[]): CategoryAnalytics[] {
  const categoryTotals = aggregateByCategory(expenses);
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // 既存のカテゴリをマップに変換
  const categoryMap = new Map(
    categoryTotals.map((item) => [item.category, item])
  );

  // 全カテゴリをループして、0円のカテゴリも追加
  const allCategories = Object.keys(CATEGORY_CHART_COLORS) as ExpenseCategory[];

  return allCategories.map((category) => {
    if (categoryMap.has(category)) {
      return categoryMap.get(category)!;
    }
    return {
      category,
      amount: 0,
      percentage: 0,
      color: CATEGORY_CHART_COLORS[category],
    };
  });
}

/**
 * 円グラフ用のデータ形式に変換（0円のカテゴリは除外）
 */
export interface PieChartData {
  name: string;
  value: number;
  fill: string;
  [key: string]: string | number;
}

export function toPieChartData(analytics: CategoryAnalytics[]): PieChartData[] {
  return analytics
    .filter((item) => item.amount > 0) // 0円のカテゴリは除外
    .map((item) => ({
      name: item.category,
      value: item.amount,
      fill: item.color,
    }));
}

/**
 * 棒グラフ用のデータ形式に変換（0円のカテゴリも含む）
 */
export interface BarChartData {
  category: string;
  amount: number;
  fill: string;
}

export function toBarChartData(analytics: CategoryAnalytics[]): BarChartData[] {
  return analytics.map((item) => ({
    category: item.category,
    amount: item.amount,
    fill: item.color,
  }));
}

/**
 * 金額をフォーマット（カンマ区切り）
 */
export function formatCurrency(amount: number): string {
  return `¥${amount.toLocaleString()}`;
}

/**
 * パーセンテージをフォーマット
 */
export function formatPercentage(percentage: number): string {
  return `${percentage.toFixed(1)}%`;
}

/**
 * 月別支出データの型定義
 */
export interface MonthlyExpense {
  month: string; // YYYY-MM形式
  monthLabel: string; // 表示用ラベル（例: 2024年1月）
  amount: number;
}

/**
 * 支出データを月別に集計（過去12ヶ月）
 */
export function aggregateByMonth(expenses: Expense[], language: 'ja' | 'en' = 'ja'): MonthlyExpense[] {
  const now = new Date();
  const monthlyData = new Map<string, number>();

  // 過去12ヶ月の月を生成
  const months: string[] = [];
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    months.push(monthKey);
    monthlyData.set(monthKey, 0);
  }

  // 支出データを月ごとに集計
  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.date);
    const monthKey = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, '0')}`;

    if (monthlyData.has(monthKey)) {
      monthlyData.set(monthKey, (monthlyData.get(monthKey) || 0) + expense.amount);
    }
  });

  // 結果を配列に変換
  return months.map((monthKey) => {
    const [year, month] = monthKey.split('-');
    const monthLabel = language === 'ja'
      ? `${year}年${parseInt(month)}月`
      : `${year}/${month}`;

    return {
      month: monthKey,
      monthLabel,
      amount: monthlyData.get(monthKey) || 0,
    };
  });
}

/**
 * 折れ線グラフ用のデータ形式に変換
 */
export interface LineChartData {
  month: string;
  amount: number;
}

export function toLineChartData(monthlyExpenses: MonthlyExpense[]): LineChartData[] {
  return monthlyExpenses.map((item) => ({
    month: item.monthLabel,
    amount: item.amount,
  }));
}

/**
 * 選択された月の支出データのみをフィルタリング
 * @param expenses 全支出データ
 * @param selectedMonth 選択された月（YYYY-MM形式）
 */
export function filterExpensesByMonth(expenses: Expense[], selectedMonth: string): Expense[] {
  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const monthKey = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, '0')}`;
    return monthKey === selectedMonth;
  });
}

/**
 * 期間タイプに応じて支出データをフィルタリング
 * @param expenses 全支出データ
 * @param periodType 期間タイプ（daily/weekly/monthly）
 * @param selectedMonth 選択された月（月次の場合のみ使用、オプション）
 */
export function filterExpensesByPeriod(
  expenses: Expense[],
  periodType: PeriodType,
  selectedMonth?: string | null
): Expense[] {
  const now = new Date();

  if (periodType === 'daily') {
    // 今日のデータのみ
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= todayStart && expenseDate <= todayEnd;
    });
  } else if (periodType === 'weekly') {
    // 今週のデータのみ（月曜日始まり）
    const day = now.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const thisWeekStart = new Date(now);
    thisWeekStart.setDate(now.getDate() + diff);
    thisWeekStart.setHours(0, 0, 0, 0);
    const thisWeekEnd = new Date(thisWeekStart);
    thisWeekEnd.setDate(thisWeekStart.getDate() + 6);
    thisWeekEnd.setHours(23, 59, 59, 999);

    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= thisWeekStart && expenseDate <= thisWeekEnd;
    });
  } else if (periodType === 'monthly') {
    // 選択された月がある場合はその月、なければ今月のデータ
    if (selectedMonth) {
      return filterExpensesByMonth(expenses, selectedMonth);
    } else {
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
      const thisMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

      return expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= thisMonthStart && expenseDate <= thisMonthEnd;
      });
    }
  }

  return expenses;
}

/**
 * 週別支出データの型定義
 */
export interface WeeklyExpense {
  week: string; // YYYY-WW形式（年-週番号）
  weekLabel: string; // 表示用ラベル（例: 12/16 - 12/22）
  amount: number;
}

/**
 * 支出データを週別に集計（過去8週間）
 */
export function aggregateByWeek(expenses: Expense[], language: 'ja' | 'en' = 'ja'): WeeklyExpense[] {
  const now = new Date();
  const weeklyData = new Map<string, { start: Date; end: Date; amount: number }>();

  // 過去8週間の週を生成（月曜日始まり）
  for (let i = 7; i >= 0; i--) {
    const weekDate = new Date(now);
    weekDate.setDate(now.getDate() - i * 7);

    // その週の月曜日を取得
    const day = weekDate.getDay();
    const diff = day === 0 ? -6 : 1 - day; // 日曜日の場合は-6、それ以外は1-day
    const monday = new Date(weekDate);
    monday.setDate(weekDate.getDate() + diff);
    monday.setHours(0, 0, 0, 0);

    // その週の日曜日を取得
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    // 週のキーを生成（YYYY-WW形式）
    const year = monday.getFullYear();
    const weekNumber = Math.ceil((monday.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
    const weekKey = `${year}-W${String(weekNumber).padStart(2, '0')}`;

    weeklyData.set(weekKey, { start: monday, end: sunday, amount: 0 });
  }

  // 支出データを週ごとに集計
  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.date);

    // どの週に属するか判定
    for (const [weekKey, weekInfo] of weeklyData.entries()) {
      if (expenseDate >= weekInfo.start && expenseDate <= weekInfo.end) {
        weekInfo.amount += expense.amount;
        break;
      }
    }
  });

  // 結果を配列に変換
  const result: WeeklyExpense[] = [];
  for (const [weekKey, weekInfo] of weeklyData.entries()) {
    const startMonth = weekInfo.start.getMonth() + 1;
    const startDay = weekInfo.start.getDate();
    const endMonth = weekInfo.end.getMonth() + 1;
    const endDay = weekInfo.end.getDate();

    const weekLabel = language === 'ja'
      ? `${startMonth}/${startDay} - ${endMonth}/${endDay}`
      : `${startMonth}/${startDay} - ${endMonth}/${endDay}`;

    result.push({
      week: weekKey,
      weekLabel,
      amount: weekInfo.amount,
    });
  }

  return result;
}

/**
 * 棒グラフ用のデータ形式に変換（週別）
 */
export interface WeekBarChartData {
  week: string;
  amount: number;
}

export function toWeekBarChartData(weeklyExpenses: WeeklyExpense[]): WeekBarChartData[] {
  return weeklyExpenses.map((item) => ({
    week: item.weekLabel,
    amount: item.amount,
  }));
}

/**
 * 期間タイプの定義
 */
export type PeriodType = 'daily' | 'weekly' | 'monthly';

/**
 * 期間比較データの型定義
 */
export interface PeriodComparison {
  currentAmount: number;
  previousAmount: number;
  difference: number;
  percentageChange: number;
  isIncrease: boolean;
}

/**
 * 日次支出データの型定義
 */
export interface DailyExpense {
  date: string; // YYYY-MM-DD形式
  dateLabel: string; // 表示用ラベル
  amount: number;
}

/**
 * 支出データを日次で集計（過去7日間）
 */
export function aggregateByDay(expenses: Expense[], language: 'ja' | 'en' = 'ja'): DailyExpense[] {
  const now = new Date();
  const dailyData = new Map<string, number>();

  // 過去7日間の日付を生成
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    dailyData.set(dateKey, 0);
  }

  // 支出データを日ごとに集計
  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.date);
    const dateKey = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, '0')}-${String(expenseDate.getDate()).padStart(2, '0')}`;

    if (dailyData.has(dateKey)) {
      dailyData.set(dateKey, (dailyData.get(dateKey) || 0) + expense.amount);
    }
  });

  // 結果を配列に変換
  const result: DailyExpense[] = [];
  for (const [dateKey, amount] of dailyData.entries()) {
    const [year, month, day] = dateKey.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const weekdayShort = date.toLocaleDateString(language === 'ja' ? 'ja-JP' : 'en-US', { weekday: 'short' });

    const dateLabel = language === 'ja'
      ? `${parseInt(month)}/${parseInt(day)}(${weekdayShort})`
      : `${parseInt(month)}/${parseInt(day)} ${weekdayShort}`;

    result.push({
      date: dateKey,
      dateLabel,
      amount,
    });
  }

  return result;
}

/**
 * 現在期間と前期間の合計を計算
 */
export function calculatePeriodComparison(
  expenses: Expense[],
  periodType: PeriodType,
  language: 'ja' | 'en' = 'ja'
): PeriodComparison {
  const now = new Date();
  let currentAmount = 0;
  let previousAmount = 0;

  if (periodType === 'daily') {
    // 今日
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    // 昨日
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const yesterdayEnd = new Date(todayEnd);
    yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);

    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      if (expenseDate >= todayStart && expenseDate <= todayEnd) {
        currentAmount += expense.amount;
      } else if (expenseDate >= yesterdayStart && expenseDate <= yesterdayEnd) {
        previousAmount += expense.amount;
      }
    });
  } else if (periodType === 'weekly') {
    // 今週（月曜日始まり）
    const day = now.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const thisWeekStart = new Date(now);
    thisWeekStart.setDate(now.getDate() + diff);
    thisWeekStart.setHours(0, 0, 0, 0);
    const thisWeekEnd = new Date(thisWeekStart);
    thisWeekEnd.setDate(thisWeekStart.getDate() + 6);
    thisWeekEnd.setHours(23, 59, 59, 999);

    // 先週
    const lastWeekStart = new Date(thisWeekStart);
    lastWeekStart.setDate(thisWeekStart.getDate() - 7);
    const lastWeekEnd = new Date(thisWeekEnd);
    lastWeekEnd.setDate(thisWeekEnd.getDate() - 7);

    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      if (expenseDate >= thisWeekStart && expenseDate <= thisWeekEnd) {
        currentAmount += expense.amount;
      } else if (expenseDate >= lastWeekStart && expenseDate <= lastWeekEnd) {
        previousAmount += expense.amount;
      }
    });
  } else if (periodType === 'monthly') {
    // 今月
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
    const thisMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    // 先月
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      if (expenseDate >= thisMonthStart && expenseDate <= thisMonthEnd) {
        currentAmount += expense.amount;
      } else if (expenseDate >= lastMonthStart && expenseDate <= lastMonthEnd) {
        previousAmount += expense.amount;
      }
    });
  }

  const difference = currentAmount - previousAmount;
  const percentageChange = previousAmount > 0 ? (difference / previousAmount) * 100 : 0;
  const isIncrease = difference > 0;

  return {
    currentAmount,
    previousAmount,
    difference,
    percentageChange,
    isIncrease,
  };
}
