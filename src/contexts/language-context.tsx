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
    'header.appName': 'Money Tracker',

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
  },
  en: {
    // Header
    'header.login': 'Login',
    'header.signup': 'Get Started Free',
    'header.dashboard': 'Dashboard',
    'header.appName': 'Money Tracker',

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
