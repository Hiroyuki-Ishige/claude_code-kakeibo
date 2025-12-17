/**
 * 固定カテゴリリスト（9種類）
 * ユーザーはこのリストを変更できません
 */
export const EXPENSE_CATEGORIES = [
  '食費',
  '日用品',
  '交通費',
  '娯楽',
  '衣服・美容',
  '医療・健康',
  '住居費',
  '通信費',
  'その他',
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

/**
 * カテゴリごとのアイコン名（lucide-react）
 */
export const CATEGORY_ICONS: Record<ExpenseCategory, string> = {
  食費: 'utensils',
  日用品: 'shopping-basket',
  交通費: 'train',
  娯楽: 'gamepad-2',
  '衣服・美容': 'shirt',
  '医療・健康': 'heart-pulse',
  住居費: 'home',
  通信費: 'smartphone',
  その他: 'more-horizontal',
};

/**
 * カテゴリごとの色（Tailwind CSS）
 */
export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  食費: 'bg-orange-500',
  日用品: 'bg-green-500',
  交通費: 'bg-blue-500',
  娯楽: 'bg-purple-500',
  '衣服・美容': 'bg-pink-500',
  '医療・健康': 'bg-red-500',
  住居費: 'bg-yellow-500',
  通信費: 'bg-cyan-500',
  その他: 'bg-gray-500',
};

/**
 * プレミアムプランのスラグ
 */
export const PREMIUM_PLAN_SLUG = 'premium';
