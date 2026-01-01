'use client';

import { Calendar, CalendarDays, CalendarRange } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PeriodType } from '@/lib/analytics';
import { useLanguage } from '@/contexts/language-context';

interface PeriodSwitcherProps {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
}

export function PeriodSwitcher({ selectedPeriod, onPeriodChange }: PeriodSwitcherProps) {
  const { t } = useLanguage();

  const periods: { type: PeriodType; label: string; icon: React.ReactNode }[] = [
    {
      type: 'daily',
      label: t('analytics.period.daily'),
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      type: 'weekly',
      label: t('analytics.period.weekly'),
      icon: <CalendarDays className="h-4 w-4" />,
    },
    {
      type: 'monthly',
      label: t('analytics.period.monthly'),
      icon: <CalendarRange className="h-4 w-4" />,
    },
  ];

  return (
    <Card className="bg-gradient-to-r from-white to-blue-50 border-2 border-blue-200 rounded-2xl shadow-lg p-4 animate-in fade-in slide-in-from-top-4 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-800">
          {t('analytics.period.label')}:
        </span>
        <div className="flex gap-2">
          {periods.map((period) => (
            <Button
              key={period.type}
              variant={selectedPeriod === period.type ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPeriodChange(period.type)}
              className={
                selectedPeriod === period.type
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg transition-all duration-200 scale-105'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200'
              }
            >
              <span className="flex items-center gap-2">
                {period.icon}
                {period.label}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}
