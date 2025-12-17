import { ExpenseCategory } from './constants';

/**
 * 支出レコード（データベーススキーマ）
 */
export interface Expense {
  id: string;
  user_id: string;
  amount: number;
  category: ExpenseCategory;
  date: string; // YYYY-MM-DD format
  note: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * 支出作成用の入力データ
 */
export interface CreateExpenseInput {
  amount: number;
  category: ExpenseCategory;
  date: string; // YYYY-MM-DD format
  note?: string;
}

/**
 * 支出更新用の入力データ
 */
export interface UpdateExpenseInput {
  amount?: number;
  category?: ExpenseCategory;
  date?: string; // YYYY-MM-DD format
  note?: string;
}

/**
 * ダッシュボードサマリーデータ（無料版）
 */
export interface DashboardSummary {
  thisWeekTotal: number;
  thisMonthTotal: number;
}

/**
 * プレミアム分析データ
 */
export interface AnalyticsSummary {
  total: number;
  average: number;
  comparisonPercentage: number; // 前期間比（%）
  topCategory: ExpenseCategory;
  categoryBreakdown: CategoryBreakdown[];
}

/**
 * カテゴリ別内訳
 */
export interface CategoryBreakdown {
  category: ExpenseCategory;
  amount: number;
  percentage: number;
  count: number;
}

/**
 * 期間タイプ
 */
export type PeriodType = 'daily' | 'weekly' | 'monthly';

/**
 * APIレスポンス型
 */
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

/**
 * ページネーション
 */
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * ページネーション付きレスポンス
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}
