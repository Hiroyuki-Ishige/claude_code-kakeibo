'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Expense } from '@/lib/types';
import { aggregateByDay, formatCurrency } from '@/lib/analytics';
import { useLanguage } from '@/contexts/language-context';

interface DailyBarChartProps {
  expenses: Expense[];
}

export function DailyBarChart({ expenses }: DailyBarChartProps) {
  const { language, t } = useLanguage();

  const dailyExpenses = aggregateByDay(expenses, language);
  const chartData = dailyExpenses.map((item) => ({
    day: item.dateLabel,
    amount: item.amount,
  }));

  // 支出がない場合
  if (chartData.length === 0) {
    return (
      <Card className="bg-white border-2 border-pink-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-right-4">
        <CardHeader className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-t-2xl">
          <CardTitle className="text-lg font-semibold text-gray-900">
            {language === 'ja' ? '日別支出推移' : 'Daily Expense Trend'}
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
    <Card className="bg-white border-2 border-pink-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-right-4 hover:scale-[1.01]">
      <CardHeader className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-t-2xl">
        <CardTitle className="text-lg font-semibold text-gray-900">
          {language === 'ja' ? '日別支出推移' : 'Daily Expense Trend'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 text-sm text-gray-500 text-center">
          {language === 'ja' ? '過去7日間の支出推移' : 'Expense trend for the past 7 days'}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="day"
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
