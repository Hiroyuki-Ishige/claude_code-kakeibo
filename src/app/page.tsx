'use client';

import Link from 'next/link';
import { Receipt, PieChart, LayoutDashboard } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-24 md:py-32 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-gray-200 opacity-30" aria-hidden="true"></div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
                <span className="block animate-slide-up">{t('home.hero.title1')}</span>
                <span className="block text-blue-600 animate-slide-up animation-delay-100 mt-4">{t('home.hero.title2')}</span>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-xl text-gray-600 animate-slide-up animation-delay-200">
                {t('home.hero.description')}
                <br />
                {t('home.hero.description2')}
              </p>
              <div className="mt-12 flex justify-center gap-4 animate-slide-up animation-delay-300">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 text-lg px-8 py-6 rounded-xl transform hover:scale-105"
                  >
                    {t('home.hero.signup')}
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 cursor-pointer transition-all duration-300 text-lg px-8 py-6 rounded-xl transform hover:scale-105"
                  >
                    {t('home.hero.pricing')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900">{t('home.features.title')}</h2>
              <p className="mt-6 text-xl text-gray-600">
                {t('home.features.subtitle')}
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {/* 機能1: 支出記録 */}
              <Card className="bg-white border border-gray-300 rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-gray-400 transition-all duration-300 transform hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 rounded-full p-3">
                      <Receipt className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{t('home.features.expense.title')}</CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {t('home.features.expense.subtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {t('home.features.expense.description')}
                  </p>
                </CardContent>
              </Card>

              {/* 機能2: カテゴリ分け */}
              <Card className="bg-white border border-gray-300 rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-gray-400 transition-all duration-300 transform hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 rounded-full p-3">
                      <PieChart className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{t('home.features.category.title')}</CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {t('home.features.category.subtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {t('home.features.category.description')}
                  </p>
                </CardContent>
              </Card>

              {/* 機能3: ダッシュボード */}
              <Card className="bg-white border border-gray-300 rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-gray-400 transition-all duration-300 transform hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 rounded-full p-3">
                      <LayoutDashboard className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{t('home.features.dashboard.title')}</CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {t('home.features.dashboard.subtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {t('home.features.dashboard.description')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 py-20 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div className="absolute inset-0 bg-grid-white"></div>
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white md:text-5xl">
                {t('home.cta.title')}
              </h2>
              <p className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto">
                {t('home.cta.description')}
              </p>
              <div className="mt-10">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-300 text-lg px-10 py-6 rounded-xl transform hover:scale-105"
                  >
                    {t('home.cta.signup')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
