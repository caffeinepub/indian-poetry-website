import { useLanguage } from '../contexts/LanguageContext';
import IndiaMap from '../components/IndiaMap';
import { BookOpen } from 'lucide-react';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="w-12 h-12 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {t('welcomeTitle')}
          </h1>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('welcomeSubtitle')}
        </p>
      </div>

      <div className="mb-8 text-center">
        <p className="text-base text-muted-foreground">
          {t('selectState')}
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <IndiaMap />
      </div>
    </div>
  );
}
