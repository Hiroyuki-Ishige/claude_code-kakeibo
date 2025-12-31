'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Expense } from '@/lib/types';
import { aggregateByMonth, toLineChartData, formatCurrency } from '@/lib/analytics';
import { useLanguage } from '@/contexts/language-context';

interface MonthlyLineChartProps {
  expenses: Expense[];
  onMonthSelect?: (month: string | null) => void;
  selectedMonth?: string | null;
}

export function MonthlyLineChart({ expenses, onMonthSelect, selectedMonth }: MonthlyLineChartProps) {
  const { language, t } = useLanguage();

  const monthlyExpenses = aggregateByMonth(expenses, language);
  const chartData = toLineChartData(monthlyExpenses);

  const handleDotClick = (monthLabel: string) => {
    console.log('Dot clicked! Month label:', monthLabel);
    const monthlyData = monthlyExpenses.find(m => m.monthLabel === monthLabel);
    console.log('Monthly data found:', monthlyData);
    if (monthlyData && onMonthSelect) {
      // 既に選択されている月を再度クリックした場合は選択解除
      if (selectedMonth === monthlyData.month) {
        console.log('Deselecting month');
        onMonthSelect(null);
      } else {
        console.log('Calling onMonthSelect with:', monthlyData.month);
        onMonthSelect(monthlyData.month);
      }
    }
  };

  const handleChartClick = () => {
    // グラフの空白部分をクリックしたら選択解除
    if (selectedMonth && onMonthSelect) {
      console.log('Chart background clicked, deselecting');
      onMonthSelect(null);
    }
  };

  // 支出がない場合
  if (chartData.length === 0) {
    return (
      <Card className="bg-white border border-gray-300 rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            {t('analytics.lineChart.title')}
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
          {t('analytics.lineChart.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 text-sm text-gray-500 text-center">
          {t('analytics.clickToSelect')}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            onClick={handleChartClick}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
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
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload, index } = props;
                const monthlyData = monthlyExpenses.find(m => m.monthLabel === payload.month);
                const isSelected = monthlyData && selectedMonth === monthlyData.month;
                console.log('Rendering dot for:', payload.month, 'index:', index, 'isSelected:', isSelected);
                return (
                  <g>
                    {/* クリック可能な透明な大きい円 */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={12}
                      fill="transparent"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Dot clicked via invisible circle:', payload.month);
                        handleDotClick(payload.month);
                      }}
                      style={{ cursor: 'pointer', pointerEvents: 'all' }}
                    />
                    {/* 表示用の小さい円 */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 6 : 4}
                      fill={isSelected ? '#ef4444' : '#3b82f6'}
                      stroke={isSelected ? '#dc2626' : '#3b82f6'}
                      strokeWidth={isSelected ? 2 : 1}
                      style={{ pointerEvents: 'none' }}
                    />
                  </g>
                );
              }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
