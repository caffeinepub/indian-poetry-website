import { useLanguage } from '../contexts/LanguageContext';
import { usePoemsByCategory } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ContentCategory } from '../backend';
import { Music, Video, Image as ImageIcon } from 'lucide-react';

interface PoetrySectionCardProps {
  poetId: string;
  category: ContentCategory;
}

export default function PoetrySectionCard({ poetId, category }: PoetrySectionCardProps) {
  const { t } = useLanguage();
  const { data: poems, isLoading } = usePoemsByCategory(poetId, category);

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!poems || poems.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">{t('noContent')}</p>
      </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {poems.map((poem) => (
        <Card key={poem.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl">{poem.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Text Content */}
            {poem.content && (
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap leading-relaxed text-foreground">
                  {poem.content}
                </p>
              </div>
            )}

            {/* Images */}
            {poem.images.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <ImageIcon className="w-4 h-4" />
                  <span>Images</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {poem.images.map((image, idx) => (
                    <img
                      key={idx}
                      src={image.getDirectURL()}
                      alt={`${poem.title} - Image ${idx + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Videos */}
            {poem.videos.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Video className="w-4 h-4" />
                  <span>Videos</span>
                </div>
                {poem.videos.map((video, idx) => (
                  <video
                    key={idx}
                    controls
                    className="w-full rounded-lg"
                    src={video.getDirectURL()}
                  >
                    Your browser does not support the video tag.
                  </video>
                ))}
              </div>
            )}

            {/* Audio */}
            {poem.audio && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Music className="w-4 h-4" />
                  <span>Audio</span>
                </div>
                <audio controls className="w-full" src={poem.audio.getDirectURL()}>
                  Your browser does not support the audio tag.
                </audio>
              </div>
            )}

            {/* Visual Assets */}
            {poem.visualAssets.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {poem.visualAssets.map((asset, idx) => (
                  <img
                    key={idx}
                    src={asset.getDirectURL()}
                    alt={`${poem.title} - Asset ${idx + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
