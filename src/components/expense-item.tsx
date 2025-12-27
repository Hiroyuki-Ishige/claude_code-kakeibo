'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
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
  Pencil,
  Trash2,
  type LucideIcon,
} from 'lucide-react';
import type { Expense } from '@/lib/types';
import { CATEGORY_COLORS, type ExpenseCategory } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { EditExpenseDialog } from '@/components/edit-expense-dialog';
import { DeleteConfirmDialog } from '@/components/delete-confirm-dialog';
import { toast } from 'sonner';

interface ExpenseItemProps {
  expense: Expense;
  onUpdate: () => void;
  onDelete: (id: string) => void;
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

export function ExpenseItem({ expense, onUpdate, onDelete }: ExpenseItemProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const categoryName = expense.category?.name as ExpenseCategory;
  const CategoryIcon = CATEGORY_ICON_MAP[categoryName] || MoreHorizontal;
  const categoryColor = CATEGORY_COLORS[categoryName] || 'bg-gray-500';

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const response = await fetch(`/api/expenses/${expense.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '支出の削除に失敗しました');
      }

      toast.success('支出を削除しました');
      onDelete(expense.id);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Failed to delete expense:', error);
      toast.error(error instanceof Error ? error.message : '支出の削除に失敗しました');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-300 rounded-2xl p-5 shadow-md hover:shadow-lg hover:border-gray-400 transition-all duration-200">
        <div className="flex items-start justify-between gap-4">
          {/* 左側: アイコンと情報 */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* カテゴリアイコン */}
            <div className={`${categoryColor} rounded-full p-3 flex-shrink-0`}>
              <CategoryIcon className="h-5 w-5 text-white" aria-hidden="true" />
            </div>

            {/* 支出情報 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="text-lg font-semibold text-gray-900">{categoryName}</h3>
                <p className="text-2xl font-bold text-gray-900">
                  ¥{expense.amount.toLocaleString('ja-JP')}
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {format(new Date(expense.date), 'yyyy年M月d日(E)', { locale: ja })}
              </p>
              {expense.note && (
                <p className="text-sm text-gray-700 mt-2 break-words">{expense.note}</p>
              )}
            </div>
          </div>

          {/* 右側: アクションボタン */}
          <div className="flex items-start gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditDialogOpen(true)}
              className="shadow-sm hover:shadow-md transition-shadow"
              aria-label="支出を編集"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="shadow-sm hover:shadow-md transition-shadow text-red-600 hover:text-red-700 hover:bg-red-50"
              aria-label="支出を削除"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 編集ダイアログ */}
      <EditExpenseDialog
        expense={expense}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSuccess={onUpdate}
      />

      {/* 削除確認ダイアログ */}
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
      />
    </>
  );
}
