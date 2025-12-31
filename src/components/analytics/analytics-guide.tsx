'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useLanguage } from '@/contexts/language-context';

export function AnalyticsGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl shadow-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="p-4">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between p-0 hover:bg-transparent"
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                  <Info className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('analytics.guide.title')}
                </h3>
              </div>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-gray-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-600" />
              )}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <CardContent className="p-0 pt-4 space-y-4">
              {/* 月別支出推移 */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs">
                    1
                  </span>
                  {t('analytics.guide.monthly.title')}
                </h4>
                <ul className="ml-8 space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{t('analytics.guide.monthly.item1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{t('analytics.guide.monthly.item2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{t('analytics.guide.monthly.item3')}</span>
                  </li>
                </ul>
              </div>

              {/* 週別支出推移 */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs">
                    2
                  </span>
                  {t('analytics.guide.weekly.title')}
                </h4>
                <ul className="ml-8 space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{t('analytics.guide.weekly.item1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{t('analytics.guide.weekly.item2')}</span>
                  </li>
                </ul>
              </div>

              {/* カテゴリ別分析 */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs">
                    3
                  </span>
                  {t('analytics.guide.category.title')}
                </h4>
                <ul className="ml-8 space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{t('analytics.guide.category.item1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{t('analytics.guide.category.item2')}</span>
                  </li>
                </ul>
              </div>

              {/* 使い方のヒント */}
              <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700 font-medium mb-2">
                  💡 {t('analytics.guide.tip.title')}
                </p>
                <p className="text-sm text-gray-600">
                  {t('analytics.guide.tip.description')}
                </p>
              </div>
            </CardContent>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </Card>
  );
}
