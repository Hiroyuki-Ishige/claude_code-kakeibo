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
    <Card className="bg-white border border-gray-300 rounded-2xl shadow-md p-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">
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
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
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
