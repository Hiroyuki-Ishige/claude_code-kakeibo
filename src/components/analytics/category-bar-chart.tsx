'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Expense } from '@/lib/types';
import { aggregateByCategory, toBarChartData, formatCurrency, PeriodType } from '@/lib/analytics';
import { useLanguage } from '@/contexts/language-context';

interface CategoryBarChartProps {
  expenses: Expense[];
  periodType: PeriodType;
}

export function CategoryBarChart({ expenses, periodType }: CategoryBarChartProps) {
  const { t, language } = useLanguage();

  const getPeriodLabel = () => {
    switch (periodType) {
      case 'daily':
        return t('analytics.category.period.daily');
      case 'weekly':
        return t('analytics.category.period.weekly');
      case 'monthly':
        return t('analytics.category.period.monthly');
    }
  };

  const analytics = aggregateByCategory(expenses);
  const chartData = toBarChartData(analytics);

  const periodLabel = getPeriodLabel();

  // 支出がない場合
  if (chartData.length === 0 || chartData.every((item) => item.amount === 0)) {
    return (
      <Card className="bg-white border border-gray-300 rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            {t('analytics.barChart.title')}
            <span className="text-sm font-normal text-gray-600 ml-2">({periodLabel})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-gray-500">
            {t('analytics.noData')}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-gray-300 rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {t('analytics.barChart.title')}
          <span className="text-sm font-normal text-gray-600 ml-2">({periodLabel})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `¥${value.toLocaleString()}`}
            />
            <Tooltip
              formatter={(value) => formatCurrency(value as number)}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
            />
            <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
