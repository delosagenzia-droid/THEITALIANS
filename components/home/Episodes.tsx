import { supabase } from '@/lib/supabase';
import { SectionNumber } from '../ui/SectionNumber';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/Button';

export async function Episodes() {
    const { data: episodes } = await supabase
        .from('episodes')
        .select('*')
        .eq('status', 'published')
        .order('publish_date', { ascending: false });

    // Fallback for no episodes
    if (!episodes || episodes.length === 0) {
        return (
            <section id="storie" className="py-24">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <SectionNumber number="03" className="justify-center" />
                    <h2 className="font-display text-4xl text-white">Le Storie</h2>
                    <p className="text-text-muted mt-4">Nessuna storia pubblicata al momento. Torna presto.</p>
                </div>
            </section>
        );
    }

    const featuredEpisode = episodes[0];
    const otherEpisodes = episodes.slice(1);

    return (
        <section id="storie" className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                <SectionNumber number="03" />
                <h2 className="font-display text-4xl md:text-5xl text-white mb-16">Le Storie</h2>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main List */}
                    <div className="lg:col-span-1 space-y-8">
                        {episodes.map((episode) => (
                            <div key={episode.id} className="group cursor-pointer border-b border-white/5 pb-8 last:border-0 hover:border-accent/30 transition-colors">
                                <div className="flex justify-between items-baseline mb-2">
                                    <span className="text-xs uppercase tracking-widest text-accent">#{episode.episode_number}</span>
                                    <span className="text-xs text-text-subtle">{episode.location}</span>
                                </div>
                                <h3 className="text-2xl font-display text-white group-hover:text-accent transition-colors mb-2">
                                    {episode.company_name}
                                </h3>
                                <p className="text-sm text-text-muted line-clamp-2">{episode.title}</p>
                            </div>
                        ))}
                    </div>

                    {/* Featured Preview */}
                    <div className="lg:col-span-2 relative aspect-[4/3] lg:aspect-auto bg-bg-card rounded-sm overflow-hidden border border-white/5 group">
                        {/* Note: Using placeholder if no image, in real app use Next Image properly */}
                        <div className="absolute inset-0 bg-neutral-800">
                            {featuredEpisode.thumbnail_url && (
                                <img
                                    src={featuredEpisode.thumbnail_url}
                                    alt={featuredEpisode.company_name}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700"
                                />
                            )}
                        </div>

                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full bg-gradient-to-t from-bg via-bg/80 to-transparent">
                            <span className="inline-block px-3 py-1 border border-accent/50 text-accent text-xs uppercase tracking-widest mb-4">
                                In Evidenza
                            </span>
                            <h3 className="font-display text-4xl md:text-5xl text-white mb-4 italic">
                                {featuredEpisode.title}
                            </h3>
                            <p className="text-text-muted max-w-xl mb-8 leading-relaxed">
                                {featuredEpisode.description}
                            </p>
                            <Link href={`/storie/${featuredEpisode.id}`}>
                                <Button variant="outline">Guarda Episodio</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
