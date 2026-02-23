import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2 font-medium"
    >
      <Languages className="w-4 h-4" />
      {language === 'en' ? 'हिंदी' : 'English'}
    </Button>
  );
}
