'use client';

import { Metadata } from 'next';
import { SectionNumber } from '@/components/ui/SectionNumber';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Metadata must be in a separate layout or use generateMetadata for client components
// Since this page needs IntersectionObserver for lazy iframe, we use client component

export default function CandidatiPage() {
    const iframeRef = useRef<HTMLDivElement>(null);
    const [isIframeVisible, setIsIframeVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsIframeVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '300px' }
        );

        if (iframeRef.current) {
            observer.observe(iframeRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#0B0B0B] pt-32 pb-24 md:pt-40 md:pb-36">
            {/* ================= BACKGROUND ================= */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0B0B0B] to-[#050505]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(246,158,0,0.14),transparent_60%)]" />
            </div>

            <div className="relative z-10 mx-auto max-w-5xl px-6">
                {/* ================= HEADER ================= */}
                <SectionNumber number="CANDIDATI" className="mb-6" />

                <h1 className="font-heading font-bold text-[clamp(2.3rem,4.6vw,4.4rem)] leading-[0.95] tracking-tight text-white mb-6">
                    Raccontiamo la vostra{' '}
                    <span className="italic font-light text-[#F69E00]">storia?</span>
                </h1>

                <p className="font-body text-white/65 text-lg font-light leading-relaxed max-w-2xl mb-8">
                    Se credete che la vostra impresa meriti di essere raccontata, parliamone.
                    THE ITALIANS cerca imprese italiane autentiche con una storia da raccontare.
                </p>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* ================= LEFT: SEO CONTENT ================= */}
                    <div>
                        {/* Info box */}
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.65)] mb-8">
                            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-[#F69E00]/55 via-white/10 to-transparent opacity-80" />
                            <div className="absolute left-0 top-0 h-full w-[3px] bg-[#F69E00]" />

                            <div className="relative">
                                <div className="inline-flex items-center gap-3 rounded-full border border-[#F69E00]/25 bg-[#F69E00]/10 px-4 py-2">
                                    <span className="h-2 w-2 rounded-full bg-[#F69E00]" />
                                    <span className="font-body text-[11px] font-semibold tracking-[0.28em] uppercase text-[#F69E00]">
                                        Nessun Costo
                                    </span>
                                </div>

                                <h2 className="mt-5 font-heading text-xl md:text-2xl font-bold italic text-white">
                                    Un progetto editoriale, non una vendita.
                                </h2>

                                <p className="mt-3 font-body text-[15px] md:text-[16px] font-light leading-relaxed text-white/65">
                                    Non è previsto alcun pagamento per la realizzazione del video. Chiediamo solo collaborazione,
                                    disponibilità e autenticità. Il nostro obiettivo è creare cultura d&apos;impresa e raccontare
                                    l&apos;eccellenza italiana.
                                </p>
                            </div>
                        </div>

                        {/* SEO content block */}
                        <div className="space-y-4">
                            <h3 className="font-heading text-lg font-bold text-white">Come funziona la candidatura</h3>
                            <p className="font-body text-white/60 leading-relaxed text-[15px]">
                                Compila il form in 2 minuti. Ti chiediamo poche informazioni sulla tua impresa: nome, settore,
                                location e una breve descrizione. Il team di THE ITALIANS — composto da{' '}
                                <strong className="text-white/80">Riccardo Segna</strong> (content creator e host) e{' '}
                                <strong className="text-white/80">Delos Lab</strong> (agenzia creativa Roma) — valuta ogni
                                candidatura e ti ricontatta entro pochi giorni.
                            </p>
                            <p className="font-body text-white/60 leading-relaxed text-[15px]">
                                Cerchiamo imprese italiane di ogni settore: artigianato, manifattura, food, tecnologia,
                                design e molto altro. L&apos;unico requisito è l&apos;autenticità della vostra storia.
                            </p>
                        </div>

                        <p className="mt-8 font-body text-[12px] tracking-[0.24em] uppercase text-white/35">
                            Selezione limitata · Qualità editoriale · Produzione 2026
                        </p>
                    </div>

                    {/* ================= RIGHT: ASANA EMBED ================= */}
                    <div className="relative">
                        <div className="absolute -inset-10 rounded-3xl bg-[#F69E00]/10 blur-[90px] opacity-50" />

                        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-[0_35px_110px_rgba(0,0,0,0.70)]">
                            {/* Top bar */}
                            <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-5 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-2.5 w-2.5 rounded-full bg-white/25" />
                                    <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
                                    <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-body text-[10px] tracking-[0.28em] uppercase text-white/45">
                                        Application Form
                                    </span>
                                    <span className="h-1 w-1 rounded-full bg-[#F69E00]" />
                                </div>
                                <div className="h-6 w-24 rounded-full border border-white/10 bg-white/[0.02]" />
                            </div>

                            {/* Iframe Container with Lazy Loading */}
                            <div ref={iframeRef} className="w-full h-[620px] md:h-[740px]">
                                {isIframeVisible && (
                                    <iframe
                                        src="https://form.asana.com/?k=B70srIf2zslDQP0oN0b2Hw&d=1206426076358288&embed=true"
                                        className="w-full h-full border-0"
                                        title="Modulo di Candidatura THE ITALIANS - Imprese Italiane"
                                        loading="lazy"
                                    />
                                )}
                            </div>

                            {/* Footer */}
                            <div className="border-t border-white/10 bg-black/30 px-6 py-4 text-center">
                                <a
                                    href="https://asana.com/it?utm_source=embedded_form"
                                    target="_blank"
                                    rel="nofollow noopener"
                                    className="font-body text-[10px] uppercase tracking-[0.28em] text-white/40 hover:text-white/70 transition-colors"
                                >
                                    Powered by Asana
                                </a>
                            </div>
                        </div>

                        <p className="mt-4 text-center font-body text-[12px] text-white/45">
                            Compila in 2 minuti — ti rispondiamo appena valutata la candidatura.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
