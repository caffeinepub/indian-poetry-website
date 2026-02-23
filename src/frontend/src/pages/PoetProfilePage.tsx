import { useParams, useNavigate } from '@tanstack/react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { usePoet } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Award, BookOpen, Globe } from 'lucide-react';
import PoetrySectionCard from '../components/PoetrySectionCard';
import { ContentCategory } from '../backend';

export default function PoetProfilePage() {
  const { stateOrUT } = useParams({ from: '/poet/$stateOrUT' });
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { data: poet, isLoading, error } = usePoet(stateOrUT);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-12 w-48 mb-8" />
        <div className="grid md:grid-cols-3 gap-8">
          <Skeleton className="h-64" />
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !poet) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Card className="max-w-md mx-auto p-8">
          <CardContent>
            <p className="text-lg text-muted-foreground mb-4">{t('poetNotFound')}</p>
            <Button onClick={() => navigate({ to: '/' })}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('backToHome')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const categories: ContentCategory[] = [
    ContentCategory.ghazals,
    ContentCategory.kavitas,
    ContentCategory.shers,
    ContentCategory.nazms,
    ContentCategory.kahanis,
    ContentCategory.imageShayaris,
    ContentCategory.videos,
    ContentCategory.audioFiles,
    ContentCategory.top5Shayaris,
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: '/' })}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t('backToHome')}
      </Button>

      {/* Poet Header */}
      <Card className="mb-8 bg-gradient-to-br from-card to-accent/10">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <Avatar className="w-40 h-40 border-4 border-primary/20">
                <AvatarImage src={poet.avatarImage?.url || poet.image?.url} />
                <AvatarFallback className="text-4xl">
                  {poet.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="md:col-span-3 space-y-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">{poet.name}</h1>
                {poet.website && (
                  <a
                    href={poet.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <Globe className="w-4 h-4" />
                    {t('website')}
                  </a>
                )}
              </div>

              {poet.biography && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">{t('biography')}</h2>
                  <p className="text-muted-foreground leading-relaxed">{poet.biography}</p>
                </div>
              )}

              {poet.genres.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">{t('genres')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {poet.genres.map((genre, idx) => (
                      <Badge key={idx} variant="secondary">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {poet.awards.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    {t('awards')}
                  </h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {poet.awards.map((award, idx) => (
                      <li key={idx}>{award}</li>
                    ))}
                  </ul>
                </div>
              )}

              {poet.notableWorks.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {t('notableWorks')}
                  </h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {poet.notableWorks.map((work, idx) => (
                      <li key={idx}>{work}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Poetry Content Tabs */}
      <Tabs defaultValue={ContentCategory.top5Shayaris} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 h-auto p-2 bg-muted/50">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="text-xs md:text-sm"
            >
              {t(category)}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <PoetrySectionCard poetId={poet.id} category={category} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
