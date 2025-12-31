'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Expense } from '@/lib/types';
import { aggregateByCategory, toPieChartData, formatCurrency, PeriodType } from '@/lib/analytics';
import { useLanguage } from '@/contexts/language-context';

interface CategoryPieChartProps {
  expenses: Expense[];
  periodType: PeriodType;
}

export function CategoryPieChart({ expenses, periodType }: CategoryPieChartProps) {
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
  const chartData = toPieChartData(analytics);

  const periodLabel = getPeriodLabel();

  // 支出がない場合
  if (chartData.length === 0) {
    return (
      <Card className="bg-white border border-gray-300 rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            {t('analytics.pieChart.title')}
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
          {t('analytics.pieChart.title')}
          <span className="text-sm font-normal text-gray-600 ml-2">({periodLabel})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name || ''} ${percent ? (percent * 100).toFixed(0) : 0}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => formatCurrency(value as number)}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
