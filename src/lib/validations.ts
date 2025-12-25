import { z } from 'zod';

/**
 * 支出作成のバリデーションスキーマ
 */
export const createExpenseSchema = z.object({
  amount: z
    .number({ message: '金額を入力してください' })
    .positive({ message: '金額は0より大きい必要があります' })
    .max(10000000, { message: '金額は1,000万円以下にしてください' }),
  category: z
    .string({ message: 'カテゴリを選択してください' })
    .min(1, { message: 'カテゴリを選択してください' }),
  date: z
    .string({ message: '日付を選択してください' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: '日付の形式が正しくありません' }),
  note: z.string().max(500, { message: 'メモは500文字以内にしてください' }).optional(),
});

export type CreateExpenseFormData = z.infer<typeof createExpenseSchema>;

/**
 * 支出更新のバリデーションスキーマ
 * すべてのフィールドがオプション
 */
export const updateExpenseSchema = z.object({
  amount: z
    .number({ message: '金額を入力してください' })
    .positive({ message: '金額は0より大きい必要があります' })
    .max(10000000, { message: '金額は1,000万円以下にしてください' })
    .optional(),
  category: z
    .string({ message: 'カテゴリを選択してください' })
    .min(1, { message: 'カテゴリを選択してください' })
    .optional(),
  date: z
    .string({ message: '日付を選択してください' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: '日付の形式が正しくありません' })
    .optional(),
  note: z.string().max(500, { message: 'メモは500文字以内にしてください' }).optional(),
});

export type UpdateExpenseFormData = z.infer<typeof updateExpenseSchema>;
