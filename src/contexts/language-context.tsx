'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ja' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 翻訳辞書
const translations: Record<Language, Record<string, string>> = {
  ja: {
    // Header
    'header.login': 'ログイン',
    'header.signup': '無料で始める',
    'header.dashboard': 'ダッシュボード',
    'header.analytics': '分析',
    'header.pricing': '料金',
    'header.appName': 'Money Tracker',
    'header.plan.free': '無料プラン',
    'header.plan.premium': 'プレミアム',

    // Home Page - Hero
    'home.hero.title1': '3つの機能だけ。',
    'home.hero.title2': '続けられる家計簿',
    'home.hero.description': '複雑な機能は一切なし。支出の記録、カテゴリ分類、ダッシュボードの3つだけ。',
    'home.hero.description2': 'シンプルだから、毎日続けられます。',
    'home.hero.signup': '無料で始める',
    'home.hero.pricing': '料金プランを見る',

    // Home Page - Features
    'home.features.title': '3つの機能',
    'home.features.subtitle': '必要最小限の機能だけを厳選しました',
    'home.features.expense.title': '1. 支出記録',
    'home.features.expense.subtitle': '金額、カテゴリ、日付を入力するだけ',
    'home.features.expense.description': 'シンプルなフォームで素早く記録。メモも追加できます。',
    'home.features.category.title': '2. カテゴリ分類',
    'home.features.category.subtitle': '9つの固定カテゴリで自動分類',
    'home.features.category.description': '食費、日用品、交通費など、よく使う9つのカテゴリを用意。',
    'home.features.dashboard.title': '3. ダッシュボード',
    'home.features.dashboard.subtitle': '今週・今月の合計を一目で確認',
    'home.features.dashboard.description': 'プレミアムプランなら詳細な分析グラフも見られます。',

    // Home Page - CTA
    'home.cta.title': '今すぐ始めましょう',
    'home.cta.description': '無料プランで全ての基本機能が使えます',
    'home.cta.signup': '無料アカウントを作成',

    // Sign In/Up
    'signin.title': 'ログイン',
    'signin.description': 'アカウントにログインして家計簿を管理',
    'signup.title': '新規登録',
    'signup.description': '無料で始めて、支出を簡単に管理',

    // Expense Form
    'expenseForm.amount.label': '金額',
    'expenseForm.amount.placeholder': '1000',
    'expenseForm.category.label': 'カテゴリ',
    'expenseForm.category.placeholder': 'カテゴリを選択',
    'expenseForm.date.label': '日付',
    'expenseForm.note.label': 'メモ',
    'expenseForm.note.optional': '任意',
    'expenseForm.note.placeholder': 'メモを入力（任意）',
    'expenseForm.button.submit': '記録する',
    'expenseForm.button.submitting': '記録中...',
    'expenseForm.success.created': '支出を記録しました',
    'expenseForm.error.submitFailed': '支出の記録に失敗しました',

    // Dashboard
    'dashboard.title': 'ダッシュボード',
    'dashboard.description': '支出を記録して、支出状況を確認しましょう',
    'dashboard.thisWeek.title': '今週の合計',
    'dashboard.thisWeek.description': '月曜日から今日まで',
    'dashboard.thisMonth.title': '今月の合計',
    'dashboard.noExpenses': '支出記録がまだありません',
    'dashboard.recordExpense.title': '支出を記録',
    'dashboard.recordExpense.description': '日々の支出を記録しましょう',
    'dashboard.recentExpenses.title': '最近の支出',
    'dashboard.recentExpenses.description': '最新の支出履歴を表示',

    // Analytics Page
    'analytics.title': 'プレミアム分析',
    'analytics.description': 'カテゴリ別の支出をグラフで詳しく分析',
    'analytics.pieChart.title': 'カテゴリ別割合',
    'analytics.barChart.title': 'カテゴリ別金額',
    'analytics.lineChart.title': '月別支出推移',
    'analytics.selectedMonth': '選択中',
    'analytics.showAllMonths': '全期間を表示',
    'analytics.clickToSelect': 'ドットをクリックして月を選択（再クリックで解除）',
    'analytics.noData': 'データがありません',

    // Analytics Guide
    'analytics.guide.title': '分析機能の使い方',
    'analytics.guide.monthly.title': '月別支出推移',
    'analytics.guide.monthly.item1': '過去12ヶ月の支出推移を折れ線グラフで表示',
    'analytics.guide.monthly.item2': 'ドットをクリックして特定の月を選択できます',
    'analytics.guide.monthly.item3': '月を選択すると、その月のデータだけを下のグラフで確認できます',
    'analytics.guide.weekly.title': '週別支出推移',
    'analytics.guide.weekly.item1': '過去8週間の支出推移を棒グラフで表示',
    'analytics.guide.weekly.item2': '月を選択している場合は、その月内の週別データを表示',
    'analytics.guide.category.title': 'カテゴリ別分析',
    'analytics.guide.category.item1': '円グラフで各カテゴリの割合を確認',
    'analytics.guide.category.item2': '棒グラフで各カテゴリの金額を比較',
    'analytics.guide.tip.title': '使い方のヒント',
    'analytics.guide.tip.description': '月別グラフで特定の月を選択すると、週別・カテゴリ別グラフがその月のデータだけに絞り込まれます。より詳しく分析したい月をクリックしてみましょう。',

    // Period Switcher
    'analytics.period.label': '期間',
    'analytics.period.daily': '日次',
    'analytics.period.weekly': '週次',
    'analytics.period.monthly': '月次',

    // Period Comparison
    'analytics.comparison.title': '前期間比較',
    'analytics.comparison.today': '今日',
    'analytics.comparison.yesterday': '昨日',
    'analytics.comparison.thisWeek': '今週',
    'analytics.comparison.lastWeek': '先週',
    'analytics.comparison.thisMonth': '今月',
    'analytics.comparison.lastMonth': '先月',
    'analytics.comparison.difference': '差額',
    'analytics.comparison.noChange': '変化なし',
    'analytics.comparison.increaseMessage': '前期間より支出が増えています',
    'analytics.comparison.decreaseMessage': '前期間より支出が減っています',

    // Category Charts Period Label
    'analytics.category.period.daily': '今日',
    'analytics.category.period.weekly': '今週',
    'analytics.category.period.monthly': '今月',
  },
  en: {
    // Header
    'header.login': 'Login',
    'header.signup': 'Get Started Free',
    'header.dashboard': 'Dashboard',
    'header.analytics': 'Analytics',
    'header.pricing': 'Pricing',
    'header.appName': 'Money Tracker',
    'header.plan.free': 'Free Plan',
    'header.plan.premium': 'Premium',

    // Home Page - Hero
    'home.hero.title1': 'Just 3 Features.',
    'home.hero.title2': 'An Expense Tracker You Can Stick With',
    'home.hero.description': 'No complex features. Just expense recording, categorization, and dashboard.',
    'home.hero.description2': 'Simple enough to use every day.',
    'home.hero.signup': 'Get Started Free',
    'home.hero.pricing': 'View Pricing',

    // Home Page - Features
    'home.features.title': '3 Core Features',
    'home.features.subtitle': 'Carefully selected essential features only',
    'home.features.expense.title': '1. Expense Recording',
    'home.features.expense.subtitle': 'Just enter amount, category, and date',
    'home.features.expense.description': 'Quick recording with a simple form. Add notes if needed.',
    'home.features.category.title': '2. Categorization',
    'home.features.category.subtitle': 'Auto-categorize with 9 fixed categories',
    'home.features.category.description': 'Pre-set 9 commonly used categories like food, household items, and transportation.',
    'home.features.dashboard.title': '3. Dashboard',
    'home.features.dashboard.subtitle': 'View weekly and monthly totals at a glance',
    'home.features.dashboard.description': 'Premium plan includes detailed analytics charts.',

    // Home Page - CTA
    'home.cta.title': 'Get Started Now',
    'home.cta.description': 'All basic features available in the free plan',
    'home.cta.signup': 'Create Free Account',

    // Sign In/Up
    'signin.title': 'Sign In',
    'signin.description': 'Log in to manage your expenses',
    'signup.title': 'Sign Up',
    'signup.description': 'Start free and manage your expenses easily',

    // Expense Form
    'expenseForm.amount.label': 'Amount',
    'expenseForm.amount.placeholder': '1000',
    'expenseForm.category.label': 'Category',
    'expenseForm.category.placeholder': 'Select category',
    'expenseForm.date.label': 'Date',
    'expenseForm.note.label': 'Note',
    'expenseForm.note.optional': 'Optional',
    'expenseForm.note.placeholder': 'Add a note (optional)',
    'expenseForm.button.submit': 'Record',
    'expenseForm.button.submitting': 'Recording...',
    'expenseForm.success.created': 'Expense recorded successfully',
    'expenseForm.error.submitFailed': 'Failed to record expense',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.description': 'Record and track your expenses',
    'dashboard.thisWeek.title': 'This Week Total',
    'dashboard.thisWeek.description': 'Monday to today',
    'dashboard.thisMonth.title': 'This Month Total',
    'dashboard.noExpenses': 'No expenses recorded yet',
    'dashboard.recordExpense.title': 'Record Expense',
    'dashboard.recordExpense.description': 'Track your daily expenses',
    'dashboard.recentExpenses.title': 'Recent Expenses',
    'dashboard.recentExpenses.description': 'Latest expense history',

    // Analytics Page
    'analytics.title': 'Premium Analytics',
    'analytics.description': 'Detailed analysis of expenses by category',
    'analytics.pieChart.title': 'Category Breakdown',
    'analytics.barChart.title': 'Category Amounts',
    'analytics.lineChart.title': 'Monthly Expense Trend',
    'analytics.selectedMonth': 'Selected',
    'analytics.showAllMonths': 'Show All Months',
    'analytics.clickToSelect': 'Click dot to select month (click again to deselect)',
    'analytics.noData': 'No data available',

    // Analytics Guide
    'analytics.guide.title': 'How to Use Analytics',
    'analytics.guide.monthly.title': 'Monthly Expense Trend',
    'analytics.guide.monthly.item1': 'View expense trends for the past 12 months in a line chart',
    'analytics.guide.monthly.item2': 'Click on a dot to select a specific month',
    'analytics.guide.monthly.item3': 'When a month is selected, the charts below will show data for that month only',
    'analytics.guide.weekly.title': 'Weekly Expense Trend',
    'analytics.guide.weekly.item1': 'View expense trends for the past 8 weeks in a bar chart',
    'analytics.guide.weekly.item2': 'If a month is selected, shows weekly data within that month',
    'analytics.guide.category.title': 'Category Analysis',
    'analytics.guide.category.item1': 'View the proportion of each category in a pie chart',
    'analytics.guide.category.item2': 'Compare amounts across categories in a bar chart',
    'analytics.guide.tip.title': 'Tip',
    'analytics.guide.tip.description': 'Selecting a specific month in the monthly chart will filter the weekly and category charts to show only that month\'s data. Try clicking on a month you want to analyze in detail.',

    // Period Switcher
    'analytics.period.label': 'Period',
    'analytics.period.daily': 'Daily',
    'analytics.period.weekly': 'Weekly',
    'analytics.period.monthly': 'Monthly',

    // Period Comparison
    'analytics.comparison.title': 'Period Comparison',
    'analytics.comparison.today': 'Today',
    'analytics.comparison.yesterday': 'Yesterday',
    'analytics.comparison.thisWeek': 'This Week',
    'analytics.comparison.lastWeek': 'Last Week',
    'analytics.comparison.thisMonth': 'This Month',
    'analytics.comparison.lastMonth': 'Last Month',
    'analytics.comparison.difference': 'Difference',
    'analytics.comparison.noChange': 'No Change',
    'analytics.comparison.increaseMessage': 'Expenses increased from previous period',
    'analytics.comparison.decreaseMessage': 'Expenses decreased from previous period',

    // Category Charts Period Label
    'analytics.category.period.daily': 'Today',
    'analytics.category.period.weekly': 'This Week',
    'analytics.category.period.monthly': 'This Month',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ja');

  // ローカルストレージから言語設定を読み込む
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ja' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
