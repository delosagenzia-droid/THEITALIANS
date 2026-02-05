import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface EpisodePageProps {
    params: {
        id: string;
    };
}

// Generate static params for all published episodes to improve performance
export async function generateStaticParams() {
    const { data: episodes } = await supabase
        .from('episodes')
        .select('id')
        .eq('status', 'published');

    return episodes?.map(({ id }) => ({ id })) || [];
}

export default async function EpisodePage({ params }: EpisodePageProps) {
    const { data: episode } = await supabase
        .from('episodes')
        .select('*')
        .eq('id', params.id)
        .single();

    if (!episode) {
        notFound();
    }

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[80vh] w-full bg-neutral-900">
                {episode.hero_image_url ? (
                    <img
                        src={episode.hero_image_url}
                        alt={episode.title || 'Episode Hero'}
                        className="w-full h-full object-cover opacity-60"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-bg-card">
                        <span className="text-white/20 font-display italic text-4xl">No Image Available</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-20">
                    <div className="max-w-7xl mx-auto">
                        <Link href="/#storie" className="inline-block mb-6 text-accent text-xs uppercase tracking-widest hover:text-white transition-colors">
                            ← Torna alle storie
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-display text-white mb-4 italic">
                            {episode.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-text-muted">{episode.company_name}</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-4 gap-12 mb-20 border-b border-white/5 pb-12">
                    <div>
                        <span className="block text-xs uppercase tracking-widest text-text-subtle mb-1">Settore</span>
                        <span className="text-white">{episode.sector}</span>
                    </div>
                    <div>
                        <span className="block text-xs uppercase tracking-widest text-text-subtle mb-1">Località</span>
                        <span className="text-white">{episode.location}</span>
                    </div>
                    <div>
                        <span className="block text-xs uppercase tracking-widest text-text-subtle mb-1">Sito Web</span>
                        {episode.website ? (
                            <a href={episode.website} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline truncate block">
                                Visita Sito
                            </a>
                        ) : (
                            <span className="text-text-muted">-</span>
                        )}
                    </div>
                    <div>
                        <span className="block text-xs uppercase tracking-widest text-text-subtle mb-1">Data</span>
                        <span className="text-white">{episode.publish_date}</span>
                    </div>
                </div>

                <div className="prose prose-invert prose-lg max-w-none mb-20">
                    <h2 className="text-3xl font-display italic text-white mb-8">La Storia</h2>
                    <p className="text-text-muted leading-relaxed whitespace-pre-line">
                        {episode.description}
                    </p>
                </div>

                {/* Videos */}
                <div className="space-y-12">
                    {episode.video_riccardo_url && (
                        <div>
                            <h3 className="text-2xl font-display text-white mb-6">Intervista Riccardo Segna</h3>
                            <div className="aspect-video bg-neutral-900 rounded-sm border border-white/5 flex items-center justify-center">
                                <a href={episode.video_riccardo_url} target="_blank" rel="noreferrer">
                                    <Button variant="outline">Guarda su YouTube</Button>
                                </a>
                            </div>
                        </div>
                    )}

                    {episode.video_theitalians_url && (
                        <div>
                            <h3 className="text-2xl font-display text-white mb-6">Documentario THE ITALIANS</h3>
                            <div className="aspect-video bg-neutral-900 rounded-sm border border-white/5 flex items-center justify-center">
                                <a href={episode.video_theitalians_url} target="_blank" rel="noreferrer">
                                    <Button variant="outline">Guarda su YouTube</Button>
                                </a>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
