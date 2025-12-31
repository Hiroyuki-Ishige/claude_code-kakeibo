'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Expense } from '@/lib/types';
import { aggregateByWeek, toWeekBarChartData, formatCurrency } from '@/lib/analytics';
import { useLanguage } from '@/contexts/language-context';

interface WeeklyBarChartProps {
  expenses: Expense[];
}

export function WeeklyBarChart({ expenses }: WeeklyBarChartProps) {
  const { language, t } = useLanguage();

  const weeklyExpenses = aggregateByWeek(expenses, language);
  const chartData = toWeekBarChartData(weeklyExpenses);

  // 支出がない場合
  if (chartData.length === 0) {
    return (
      <Card className="bg-white border border-gray-300 rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            {language === 'ja' ? '週別支出推移' : 'Weekly Expense Trend'}
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
          {language === 'ja' ? '週別支出推移' : 'Weekly Expense Trend'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 text-sm text-gray-500 text-center">
          {language === 'ja' ? '過去8週間の支出推移' : 'Expense trend for the past 8 weeks'}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
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
            <Bar
              dataKey="amount"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
