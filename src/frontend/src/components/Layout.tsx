import { Outlet, useNavigate } from '@tanstack/react-router';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { Button } from '@/components/ui/button';
import { BookOpen, Heart } from 'lucide-react';

export default function Layout() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      {/* Decorative background pattern */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/assets/generated/poetry-bg-pattern.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate({ to: '/' })}
              className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <BookOpen className="w-8 h-8" />
              <span className="hidden sm:inline">{t('websiteName')}</span>
            </button>

            <nav className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate({ to: '/' })}
                className="text-base"
              >
                {t('home')}
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate({ to: '/owner-poetry' })}
                className="text-base"
              >
                {t('ownerPoetry')}
              </Button>
              <LanguageToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/40 bg-background/80 backdrop-blur-sm py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            {t('builtWith')} <Heart className="w-4 h-4 text-red-500 fill-red-500" /> {t('using')}{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
          <p className="mt-2 text-xs">© {new Date().getFullYear()} {t('websiteName')}</p>
        </div>
      </footer>
    </div>
  );
}
