'use client';

import Link from 'next/link';
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
        <section className="bg-gradient-to-b from-blue-50 to-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">{t('home.hero.title1')}</span>
                <span className="block text-blue-600">{t('home.hero.title2')}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
                {t('home.hero.description')}
                <br />
                {t('home.hero.description2')}
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Link href="/sign-up">
                  <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-800 shadow-md cursor-pointer transition-all duration-200 text-lg">
                    {t('home.hero.signup')}
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 cursor-pointer transition-all duration-200 text-lg">
                    {t('home.hero.pricing')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">{t('home.features.title')}</h2>
              <p className="mt-4 text-lg text-gray-600">
                {t('home.features.subtitle')}
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>{t('home.features.expense.title')}</CardTitle>
                  <CardDescription>
                    {t('home.features.expense.subtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {t('home.features.expense.description')}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t('home.features.category.title')}</CardTitle>
                  <CardDescription>
                    {t('home.features.category.subtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {t('home.features.category.description')}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t('home.features.dashboard.title')}</CardTitle>
                  <CardDescription>
                    {t('home.features.dashboard.subtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {t('home.features.dashboard.description')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">
                {t('home.cta.title')}
              </h2>
              <p className="mt-4 text-lg text-blue-100">
                {t('home.cta.description')}
              </p>
              <div className="mt-8">
                <Link href="/sign-up">
                  <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 shadow-md cursor-pointer transition-all duration-200 text-lg">
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
