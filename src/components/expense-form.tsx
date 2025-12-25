'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { createExpenseSchema, type CreateExpenseFormData } from '@/lib/validations';
import { EXPENSE_CATEGORIES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/language-context';

interface ExpenseFormProps {
  onSuccess?: () => void;
}

export function ExpenseForm({ onSuccess }: ExpenseFormProps) {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateExpenseFormData>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd'),
      note: '',
    },
  });

  const selectedCategory = watch('category');
  const selectedDate = watch('date');

  const onSubmit = async (data: CreateExpenseFormData) => {
    try {
      setIsSubmitting(true);

      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('[Form] API error:', errorData);
        const errorMessage = errorData.error || t('expenseForm.error.submitFailed');
        const errorDetails = errorData.details ? `\n詳細: ${errorData.details}` : '';
        throw new Error(errorMessage + errorDetails);
      }

      toast.success(t('expenseForm.success.created'));
      reset({
        date: format(new Date(), 'yyyy-MM-dd'),
        note: '',
      });
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create expense:', error);
      toast.error(error instanceof Error ? error.message : t('expenseForm.error.submitFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* 金額入力 */}
      <div className="space-y-2">
        <Label htmlFor="amount">{t('expenseForm.amount.label')}</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">¥</span>
          <Input
            id="amount"
            type="number"
            placeholder={t('expenseForm.amount.placeholder')}
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
        <Label htmlFor="category">{t('expenseForm.category.label')}</Label>
        <Select value={selectedCategory} onValueChange={(value) => setValue('category', value)}>
          <SelectTrigger id="category" aria-invalid={errors.category ? 'true' : 'false'}>
            <SelectValue placeholder={t('expenseForm.category.placeholder')} />
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
        <Label htmlFor="date">{t('expenseForm.date.label')}</Label>
        <Input
          id="date"
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
        <Label htmlFor="note">
          {t('expenseForm.note.label')} <span className="text-sm text-gray-500">({t('expenseForm.note.optional')})</span>
        </Label>
        <Textarea
          id="note"
          placeholder={t('expenseForm.note.placeholder')}
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

      {/* 送信ボタン */}
      <Button
        type="submit"
        className="w-full bg-blue-600 text-white hover:bg-blue-700 shadow-md"
        disabled={isSubmitting}
      >
        {isSubmitting ? t('expenseForm.button.submitting') : t('expenseForm.button.submit')}
      </Button>
    </form>
  );
}
