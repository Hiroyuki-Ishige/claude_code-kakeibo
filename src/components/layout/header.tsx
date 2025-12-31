'use client';

import Link from 'next/link';
import { UserButton, SignedIn, SignedOut, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/language-toggle';
import { useLanguage } from '@/contexts/language-context';
import { Crown } from 'lucide-react';

function PlanBadge() {
  const { has, isLoaded } = useAuth();
  const { t } = useLanguage();

  if (!isLoaded || !has) {
    return null;
  }

  const isPremium = has({ plan: 'premium' });

  if (isPremium) {
    return (
      <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-sm font-semibold shadow-md">
        <Crown className="h-4 w-4" />
        <span>{t('header.plan.premium')}</span>
      </div>
    );
  }

  return (
    <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
      {t('header.plan.free')}
    </div>
  );
}

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">{t('header.appName')}</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <LanguageToggle />
            <Link href="/pricing">
              <Button variant="ghost" className="hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all duration-200">
                {t('header.pricing')}
              </Button>
            </Link>
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="ghost" className="hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all duration-200">
                  {t('header.dashboard')}
                </Button>
              </Link>
              <Link href="/analytics">
                <Button variant="ghost" className="hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all duration-200 flex items-center gap-1">
                  <Crown className="h-4 w-4" />
                  {t('header.analytics')}
                </Button>
              </Link>
              <PlanBadge />
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'h-10 w-10',
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="ghost" className="hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all duration-200">
                  {t('header.login')}
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-blue-600 text-white hover:bg-blue-800 shadow-md cursor-pointer transition-all duration-200">
                  {t('header.signup')}
                </Button>
              </Link>
            </SignedOut>
          </nav>
        </div>
      </div>
    </header>
  );
}
