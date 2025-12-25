'use client';

import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ja' ? 'en' : 'ja');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="hover:bg-blue-50 cursor-pointer transition-all duration-200"
      aria-label="言語を切り替える"
    >
      <span className="font-semibold">
        {language === 'ja' ? 'EN' : 'JA'}
      </span>
    </Button>
  );
}
