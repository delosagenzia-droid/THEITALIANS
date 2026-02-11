import { SectionNumber } from '../ui/SectionNumber';
import { Camera, Clapperboard, MessageSquare, Send, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Button } from '../ui/Button';
import Image from 'next/image';

const steps = [
    {
        number: '01',
        title: 'Contatto e Selezione',
        description:
            'Facciamo una prima call per conoscerci e capire come valorizzare al meglio i vostri punti di forza',
        icon: Send,
    },
    {
        number: '02',
        title: 'Pianificazione',
        description:
            'Definiamo insieme i temi, le persone da intervistare, la giornata di riprese. Sopralluogo (se necessario) per organizzare al meglio.',
        icon: MessageSquare,
    },
    {
        number: '03',
        title: 'Giornata di Riprese',
        description: 'Veniamo da voi con una troupe leggera. Riprendiamo interviste, ambienti, processo produttivo.',
        icon: Camera,
    },
    {
        number: '04',
        title: 'Post-produzione e Pubblicazione',
        description:
            'Montiamo i contenuti, li revisioniamo insieme a voi. Pubblichiamo sui canali secondo il piano concordato.',
        icon: Clapperboard,
    },
];

export async function Format() {
    const { data: episodes } = await supabase
        .from('episodes')
        .select('*')
        .eq('status', 'published')
        .order('publish_date', { ascending: false });

    return (
        <section id="format" className="relative overflow-hidden bg-[#0B0B0B] py-28 md:py-36">
            {/* ================= BACKGROUND (premium black) ================= */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Base depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0B0B0B] to-[#050505]" />

                {/* Accent spotlight (top center) */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(246,158,0,0.14),transparent_60%)]" />

                {/* Subtle right glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_60%_at_85%_35%,rgba(246,158,0,0.08),transparent_65%)]" />

                {/* Editorial grid (very subtle) */}
                <div className="absolute inset-0 opacity-[0.20]">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px]" />
                    <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_70%,transparent_100%)] bg-[#0B0B0B]" />
                </div>

                {/* Film grain */}
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Decorative rings */}
                <div className="absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full border border-white/5" />
                <div className="absolute -top-10 -left-10 h-[420px] w-[420px] rounded-full border border-[#F69E00]/10" />
                <div className="absolute bottom-[-260px] right-[-260px] h-[560px] w-[560px] rounded-full border border-[#F69E00]/10" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                {/* ================= HEADER ================= */}
                <div className="mb-16 md:mb-24 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <SectionNumber number="02" className="mb-6" />

                        <h2 className="font-heading font-bold text-[clamp(2.3rem,4.6vw,4.4rem)] leading-[0.95] tracking-tight text-white">
                            Come <br />
                            <span className="italic font-light text-[#F69E00]">funziona.</span>
                        </h2>
                    </div>

                    <div className="max-w-md">
                        <p className="font-body text-white/65 text-lg font-light leading-relaxed border-l border-white/10 pl-6">
                            Dalla selezione alla pubblicazione — un flusso chiaro, rapido e ripetibile.
                        </p>
                    </div>
                </div>

                {/* ================= LIST ================= */}
                <div className="space-y-5 mb-32">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className={[
                                'group relative overflow-hidden rounded-3xl',
                                'border border-white/8 bg-white/[0.02]',
                                'px-7 py-8 md:px-10 md:py-10',
                                'transition-all duration-700',
                                'hover:bg-white/[0.035] hover:border-white/15 hover:-translate-y-[2px]',
                                'shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:shadow-[0_30px_90px_rgba(0,0,0,0.65)]',
                            ].join(' ')}
                        >
                            {/* Accent highlight line (top) */}
                            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-[#F69E00]/45 via-white/10 to-transparent opacity-60" />

                            {/* Giant number (editorial) */}
                            <span className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 select-none font-heading text-[9.5rem] font-bold text-white/[0.02] transition-colors duration-700 lg:block group-hover:text-[#F69E00]/[0.05]">
                                {step.number}
                            </span>

                            <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row md:items-start">
                                {/* Icon: premium coin */}
                                <div className="relative flex-shrink-0">
                                    <div className="absolute -inset-4 rounded-full bg-[#F69E00]/10 blur-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                                    <div className="relative grid h-20 w-20 place-items-center rounded-full border border-white/10 bg-[#0A0A0A] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_55px_rgba(0,0,0,0.65)] transition-colors duration-500 group-hover:border-[#F69E00]/35">
                                        <div className="grid h-[66px] w-[66px] place-items-center rounded-full border border-[#F69E00]/15 bg-gradient-to-b from-white/[0.03] to-transparent">
                                            <step.icon className="h-7 w-7 text-white/85 transition-all duration-500 group-hover:scale-110 group-hover:text-[#F69E00]" />
                                        </div>
                                    </div>
                                </div>

                                {/* Text */}
                                <div className="flex-1 text-center md:text-left">
                                    <div className="mb-3 flex items-center justify-center gap-4 md:justify-start">
                                        <span className="font-body text-[12px] font-semibold tracking-[0.28em] text-[#F69E00]">
                                            {step.number}
                                        </span>
                                        <div className="h-px w-10 bg-[#F69E00]/30" />
                                        <span className="font-body text-[12px] tracking-[0.28em] text-white/35 uppercase">
                                            Step
                                        </span>
                                    </div>

                                    <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
                                        {step.title}
                                    </h3>

                                    <p className="font-body text-[16px] md:text-[17px] font-light leading-relaxed text-white/65 max-w-2xl">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Right micro CTA: luxury indicator */}
                                <div className="hidden md:flex items-center gap-3 opacity-0 translate-x-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                                    <div className="h-10 w-10 rounded-full border border-white/15 bg-white/[0.02] grid place-items-center">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#F69E00]" />
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-white/40" />
                                </div>
                            </div>

                            {/* Bottom accent glow (controlled) */}
                            <div className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-[520px] -translate-x-1/2 rounded-full bg-[#F69E00]/8 blur-[70px] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                        </div>
                    ))}
                </div>


                {/* ================= EXAMPLES SUBSECTION ================= */}
                {episodes && episodes.length > 0 && (
                    <div id="storie" className="border-t border-white/10 pt-24">
                        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h3 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
                                    Storie Recenti
                                </h3>
                                <p className="text-text-muted font-light max-w-xl">
                                    Esempi reali di come raccontiamo le eccellenze.
                                </p>
                            </div>
                            <Link href="/storie" className="hidden md:block">
                                <Button variant="outline">Tutte le Storie</Button>
                            </Link>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Featured Preview (First Episode) */}
                            {episodes[0] && (
                                <div className="lg:col-span-2 group relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-bg-card">
                                    {episodes[0].thumbnail_url && (
                                        <div className="relative h-full w-full">
                                            <Image
                                                src={episodes[0].thumbnail_url}
                                                alt={episodes[0].company_name || 'Episodio The Italians'}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 840px"
                                                priority
                                            />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-8 flex flex-col justify-end">
                                        <span className="mb-3 inline-block w-fit rounded-full border border-[#F69E00]/40 bg-[#F69E00]/10 px-3 py-1 text-[10px] uppercase tracking-widest text-[#F69E00] backdrop-blur-md">
                                            In Evidenza
                                        </span>
                                        <h4 className="font-heading text-3xl font-bold text-white mb-2">
                                            {episodes[0].title}
                                        </h4>
                                        <p className="text-white/70 line-clamp-2 max-w-lg">
                                            {episodes[0].description}
                                        </p>
                                    </div>
                                    <Link href={`/storie/${episodes[0].id}`} className="absolute inset-0 z-20" />
                                </div>
                            )}

                            {/* List of others */}
                            <div className="flex flex-col gap-4">
                                {episodes.slice(1, 4).map((episode) => (
                                    <Link
                                        key={episode.id}
                                        href={`/storie/${episode.id}`}
                                        className="group relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-bg-card hover:border-[#F69E00]/30 transition-colors p-6 flex flex-col justify-center"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-[10px] uppercase tracking-widest text-[#F69E00]">#{episode.episode_number}</span>
                                            <span className="text-[10px] text-white/40">{episode.location}</span>
                                        </div>
                                        <h5 className="font-heading text-xl font-bold text-white group-hover:text-[#F69E00] transition-colors mb-1">
                                            {episode.company_name}
                                        </h5>
                                        <p className="text-sm text-white/50 line-clamp-2">
                                            {episode.title}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 md:hidden text-center">
                            <Link href="/storie">
                                <Button variant="outline" className="w-full">Tutte le Storie</Button>
                            </Link>
                        </div>
                    </div>
                )}

                {(!episodes || episodes.length === 0) && (
                    <div id="storie" className="border-t border-white/10 pt-24 text-center">
                        <p className="text-white/30 text-sm uppercase tracking-widest">
                            Prossime storie in arrivo
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
