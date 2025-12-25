'use client';

import Link from 'next/link';
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/language-toggle';
import { useLanguage } from '@/contexts/language-context';

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
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="ghost">{t('header.dashboard')}</Button>
              </Link>
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
