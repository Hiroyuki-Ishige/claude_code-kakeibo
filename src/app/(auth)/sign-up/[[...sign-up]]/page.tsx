'use client';

import { SignUp } from '@clerk/nextjs';
import { Header } from '@/components/layout/header';
import { useLanguage } from '@/contexts/language-context';

export default function SignUpPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">{t('signup.title')}</h1>
            <p className="mt-2 text-sm text-gray-600">
              {t('signup.description')}
            </p>
          </div>
          <SignUp
            appearance={{
              elements: {
                rootBox: 'mx-auto',
                card: 'shadow-lg',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
