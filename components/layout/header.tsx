import Link from 'next/link';
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">Money Tracker</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="ghost">ダッシュボード</Button>
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
              <Link href="/pricing">
                <Button variant="ghost">料金プラン</Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="ghost">ログイン</Button>
              </Link>
              <Link href="/sign-up">
                <Button>無料で始める</Button>
              </Link>
            </SignedOut>
          </nav>
        </div>
      </div>
    </header>
  );
}
