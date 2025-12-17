import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Supabaseクライアント（クライアントサイド用）
 * 匿名キーを使用
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Supabaseクライアント（サーバーサイド用）
 * Service Role Keyを使用し、RLSをバイパス
 * API RouteやServer Componentsで使用
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * サーバーサイドでユーザーの支出データを取得するヘルパー関数
 * Service Role Keyを使用し、user_idでフィルタリング
 */
export async function getExpensesForUser(userId: string) {
  const { data, error } = await supabaseAdmin
    .from('expenses')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }

  return data;
}

/**
 * サーバーサイドで支出を作成するヘルパー関数
 */
export async function createExpenseForUser(
  userId: string,
  expenseData: {
    amount: number;
    category: string;
    date: string;
    note?: string;
  }
) {
  const { data, error } = await supabaseAdmin
    .from('expenses')
    .insert({
      user_id: userId,
      ...expenseData,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating expense:', error);
    throw error;
  }

  return data;
}

/**
 * サーバーサイドで支出を更新するヘルパー関数
 */
export async function updateExpenseForUser(
  userId: string,
  expenseId: string,
  updates: {
    amount?: number;
    category?: string;
    date?: string;
    note?: string;
  }
) {
  const { data, error } = await supabaseAdmin
    .from('expenses')
    .update(updates)
    .eq('id', expenseId)
    .eq('user_id', userId) // 所有権チェック
    .select()
    .single();

  if (error) {
    console.error('Error updating expense:', error);
    throw error;
  }

  return data;
}

/**
 * サーバーサイドで支出を削除するヘルパー関数
 */
export async function deleteExpenseForUser(userId: string, expenseId: string) {
  const { error } = await supabaseAdmin
    .from('expenses')
    .delete()
    .eq('id', expenseId)
    .eq('user_id', userId); // 所有権チェック

  if (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }

  return true;
}
