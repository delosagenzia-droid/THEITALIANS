import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { SectionNumber } from '@/components/ui/SectionNumber';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const revalidate = 3600; // ISR: 1 hour

export const metadata: Metadata = {
    title: 'Le Storie — Imprese Italiane Raccontate | THE ITALIANS',
    description:
        'Le imprese italiane raccontate da THE ITALIANS. Storie di artigianato, innovazione e passione dal Made in Italy. Interviste cinematografiche di Riccardo Segna e Delos Lab.',
    openGraph: {
        title: 'Le Storie — Imprese Italiane Raccontate | THE ITALIANS',
        description:
            'Storie di artigianato, innovazione e passione dal Made in Italy.',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'THE ITALIANS — Le Storie' }],
    },
    alternates: {
        canonical: 'https://the-italians.it/storie',
    },
};

export default async function StoriePage() {
    const { data: episodes } = await supabase
        .from('episodes')
        .select('*')
        .eq('status', 'published')
        .order('publish_date', { ascending: false });

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#0B0B0B] pt-32 pb-24 md:pt-40 md:pb-36">
            {/* ================= BACKGROUND ================= */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0B0B0B] to-[#050505]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(246,158,0,0.14),transparent_60%)]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                {/* ================= HEADER ================= */}
                <SectionNumber number="STORIE" className="mb-6" />

                <h1 className="font-heading font-bold text-[clamp(2.3rem,4.6vw,4.4rem)] leading-[0.95] tracking-tight text-white mb-6">
                    Le{' '}
                    <span className="italic font-light text-[#F69E00]">Storie.</span>
                </h1>

                <p className="font-body text-white/65 text-lg font-light leading-relaxed max-w-2xl mb-16">
                    Imprese italiane raccontate attraverso interviste autentiche e produzione cinematografica.
                    Ogni episodio entra in un&apos;azienda per scoprire le persone, i processi e la passione
                    dietro l&apos;eccellenza del Made in Italy.
                </p>

                {/* ================= EPISODES GRID ================= */}
                {episodes && episodes.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {episodes.map((episode) => (
                            <Link
                                key={episode.id}
                                href={`/storie/${episode.id}`}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#F69E00]/30 transition-all duration-500"
                            >
                                {episode.thumbnail_url && (
                                    <div className="relative aspect-video">
                                        <Image
                                            src={episode.thumbnail_url}
                                            alt={`${episode.company_name} — Episodio THE ITALIANS, impresa italiana raccontata`}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                                            quality={80}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-[10px] uppercase tracking-widest text-[#F69E00]">
                                            #{episode.episode_number}
                                        </span>
                                        <span className="text-[10px] text-white/40">{episode.location}</span>
                                    </div>
                                    <h2 className="font-heading text-xl font-bold text-white group-hover:text-[#F69E00] transition-colors mb-2">
                                        {episode.company_name}
                                    </h2>
                                    <p className="font-body text-sm text-white/50 line-clamp-2">
                                        {episode.title}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-white/30 text-sm uppercase tracking-widest mb-4">
                            Prossimi episodi in arrivo
                        </p>
                        <p className="font-body text-white/50 max-w-lg mx-auto">
                            THE ITALIANS è un format video di storytelling aziendale che racconta le imprese italiane.
                            I prossimi episodi sono in fase di produzione. Ogni storia mostra l&apos;eccellenza del Made in
                            Italy attraverso interviste autentiche di Riccardo Segna e la produzione cinematografica di Delos Lab.
                        </p>
                    </div>
                )}

                {/* ================= CTA ================= */}
                <div className="text-center mt-20 border-t border-white/10 pt-16">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                        Vuoi far parte delle nostre storie?
                    </h2>
                    <p className="font-body text-white/65 text-lg font-light mb-8 max-w-lg mx-auto">
                        Candidati per raccontare la tua impresa con THE ITALIANS.
                    </p>
                    <Link href="/candidati">
                        <Button variant="primary">Candidati Ora</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
