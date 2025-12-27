'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { updateExpenseSchema, type UpdateExpenseFormData } from '@/lib/validations';
import { EXPENSE_CATEGORIES } from '@/lib/constants';
import type { Expense } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface EditExpenseDialogProps {
  expense: Expense;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EditExpenseDialog({
  expense,
  open,
  onOpenChange,
  onSuccess,
}: EditExpenseDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateExpenseFormData>({
    resolver: zodResolver(updateExpenseSchema),
    defaultValues: {
      amount: expense.amount,
      category: expense.category?.name,
      date: expense.date,
      note: expense.note || '',
    },
  });

  const selectedCategory = watch('category');
  const selectedDate = watch('date');

  // expenseが変更されたらフォームをリセット
  useEffect(() => {
    reset({
      amount: expense.amount,
      category: expense.category?.name,
      date: expense.date,
      note: expense.note || '',
    });
  }, [expense, reset]);

  const onSubmit = async (data: UpdateExpenseFormData) => {
    try {
      setIsSubmitting(true);

      const response = await fetch(`/api/expenses/${expense.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('[Edit Dialog] API error:', errorData);
        throw new Error(errorData.error || '支出の更新に失敗しました');
      }

      toast.success('支出を更新しました');
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Failed to update expense:', error);
      toast.error(error instanceof Error ? error.message : '支出の更新に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>支出を編集</DialogTitle>
          <DialogDescription>支出の内容を変更できます。</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 金額入力 */}
          <div className="space-y-2">
            <Label htmlFor="edit-amount">金額</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">¥</span>
              <Input
                id="edit-amount"
                type="number"
                placeholder="0"
                className="pl-8"
                {...register('amount', { valueAsNumber: true })}
                aria-invalid={errors.amount ? 'true' : 'false'}
              />
            </div>
            {errors.amount && (
              <p className="text-sm text-red-600" role="alert">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* カテゴリ選択 */}
          <div className="space-y-2">
            <Label htmlFor="edit-category">カテゴリ</Label>
            <Select value={selectedCategory} onValueChange={(value) => setValue('category', value)}>
              <SelectTrigger id="edit-category" aria-invalid={errors.category ? 'true' : 'false'}>
                <SelectValue placeholder="カテゴリを選択" />
              </SelectTrigger>
              <SelectContent>
                {EXPENSE_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-600" role="alert">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* 日付選択 */}
          <div className="space-y-2">
            <Label htmlFor="edit-date">日付</Label>
            <Input
              id="edit-date"
              type="date"
              value={selectedDate}
              onChange={(e) => setValue('date', e.target.value)}
              max={format(new Date(), 'yyyy-MM-dd')}
              aria-invalid={errors.date ? 'true' : 'false'}
            />
            {errors.date && (
              <p className="text-sm text-red-600" role="alert">
                {errors.date.message}
              </p>
            )}
          </div>

          {/* メモ入力 */}
          <div className="space-y-2">
            <Label htmlFor="edit-note">
              メモ <span className="text-sm text-gray-500">(任意)</span>
            </Label>
            <Textarea
              id="edit-note"
              placeholder="メモを入力"
              rows={3}
              {...register('note')}
              aria-invalid={errors.note ? 'true' : 'false'}
            />
            {errors.note && (
              <p className="text-sm text-red-600" role="alert">
                {errors.note.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700 shadow-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? '更新中...' : '更新する'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
