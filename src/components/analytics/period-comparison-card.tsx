'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PeriodComparison, PeriodType, formatCurrency } from '@/lib/analytics';
import { useLanguage } from '@/contexts/language-context';

interface PeriodComparisonCardProps {
  comparison: PeriodComparison;
  periodType: PeriodType;
}

export function PeriodComparisonCard({ comparison, periodType }: PeriodComparisonCardProps) {
  const { t } = useLanguage();

  const getPeriodLabel = () => {
    switch (periodType) {
      case 'daily':
        return {
          current: t('analytics.comparison.today'),
          previous: t('analytics.comparison.yesterday'),
        };
      case 'weekly':
        return {
          current: t('analytics.comparison.thisWeek'),
          previous: t('analytics.comparison.lastWeek'),
        };
      case 'monthly':
        return {
          current: t('analytics.comparison.thisMonth'),
          previous: t('analytics.comparison.lastMonth'),
        };
    }
  };

  const labels = getPeriodLabel();
  const { currentAmount, previousAmount, difference, percentageChange, isIncrease } = comparison;
  const hasChange = difference !== 0;

  return (
    <Card className="bg-white border border-gray-300 rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {t('analytics.comparison.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 現在期間 */}
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">{labels.current}</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(currentAmount)}</p>
          </div>
        </div>

        {/* 前期間 */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">{labels.previous}</p>
            <p className="text-xl font-semibold text-gray-700">{formatCurrency(previousAmount)}</p>
          </div>
        </div>

        {/* 比較結果 */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              {t('analytics.comparison.difference')}
            </span>
            <div className="flex items-center gap-2">
              {hasChange ? (
                <>
                  {isIncrease ? (
                    <TrendingUp className="h-5 w-5 text-red-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-green-600" />
                  )}
                  <span
                    className={`text-lg font-semibold ${
                      isIncrease ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {isIncrease ? '+' : ''}
                    {formatCurrency(Math.abs(difference))}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      isIncrease ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    ({isIncrease ? '+' : ''}
                    {percentageChange.toFixed(1)}%)
                  </span>
                </>
              ) : (
                <>
                  <Minus className="h-5 w-5 text-gray-400" />
                  <span className="text-lg font-semibold text-gray-400">
                    {t('analytics.comparison.noChange')}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* メッセージ */}
          {hasChange && (
            <p className="mt-2 text-sm text-gray-600">
              {isIncrease
                ? t('analytics.comparison.increaseMessage')
                : t('analytics.comparison.decreaseMessage')}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
