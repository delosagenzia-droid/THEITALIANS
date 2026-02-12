import { Metadata } from 'next';
import { SectionNumber } from '@/components/ui/SectionNumber';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Chi Siamo — THE ITALIANS | Riccardo Segna e Delos Lab',
    description:
        'Scopri il team dietro THE ITALIANS: Riccardo Segna (Riccardo Segnalini), content creator con 30M+ views, e Delos Lab, agenzia creativa di Roma con 4B+ visualizzazioni generate.',
    openGraph: {
        title: 'Chi Siamo — THE ITALIANS | Riccardo Segna e Delos Lab',
        description:
            'Scopri il team dietro THE ITALIANS: Riccardo Segna e Delos Lab.',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'THE ITALIANS — Chi Siamo' }],
    },
    alternates: {
        canonical: 'https://the-italians.it/chi-siamo',
    },
};

export default function ChiSiamoPage() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-[#0B0B0B] pt-32 pb-24 md:pt-40 md:pb-36">
            {/* ================= BACKGROUND ================= */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0B0B0B] to-[#050505]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(246,158,0,0.14),transparent_60%)]" />
            </div>

            <div className="relative z-10 mx-auto max-w-5xl px-6">
                {/* ================= HEADER ================= */}
                <SectionNumber number="TEAM" className="mb-6" />

                <h1 className="font-heading font-bold text-[clamp(2.3rem,4.6vw,4.4rem)] leading-[0.95] tracking-tight text-white mb-6">
                    Chi c&apos;è dietro{' '}
                    <span className="italic font-light text-[#F69E00]">THE ITALIANS.</span>
                </h1>

                <p className="font-body text-white/65 text-lg font-light leading-relaxed max-w-2xl mb-20">
                    Un progetto editoriale nato dall&apos;unione tra storytelling umano e struttura produttiva solida.
                </p>

                {/* ================= RICCARDO ================= */}
                <div className="grid md:grid-cols-2 gap-16 items-start mb-24">
                    <div className="relative aspect-[3/4] max-w-sm mx-auto md:mx-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
                        <Image
                            src="/riccardo-segna.jpg"
                            alt="Riccardo Segna (Riccardo Segnalini) - Content Creator e Host di THE ITALIANS, storyteller imprese italiane"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 400px"
                            quality={80}
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <h2 className="font-heading text-3xl font-bold tracking-tight text-white">Riccardo Segna</h2>
                            <p className="mt-2 font-body text-[12px] tracking-[0.22em] uppercase text-[#F69E00]/90">
                                Host · Interviewer · Content Creator
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <p className="font-body text-white/75 leading-relaxed text-[17px]">
                            <strong className="text-white">Riccardo Segna</strong> (Riccardo Segnalini) è un content creator e
                            storyteller italiano specializzato in street interview e racconto d&apos;impresa.
                        </p>
                        <p className="font-body text-white/65 leading-relaxed">
                            Con oltre <strong className="text-white">155.000 follower su Instagram</strong>,{' '}
                            <strong className="text-white">330.000 su TikTok</strong> e{' '}
                            <strong className="text-white">30 milioni di visualizzazioni</strong>, racconta persone e
                            professionisti con uno stile diretto, autentico e cinematografico.
                        </p>
                        <p className="font-body text-white/65 leading-relaxed">
                            Come host e interviewer di THE ITALIANS, entra nelle aziende italiane per dare voce a chi le
                            costruisce ogni giorno. Le sue interviste sono autentiche, mai costruite, e mettono al centro
                            le storie, i valori e le persone dietro le imprese del Made in Italy.
                        </p>

                        <div className="flex flex-wrap gap-3 pt-4">
                            <a
                                href="https://instagram.com/riccardosegna"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 font-body text-[11px] uppercase tracking-[0.24em] text-white/70 hover:text-white hover:border-[#F69E00]/30 transition-colors"
                            >
                                Instagram
                            </a>
                            <a
                                href="https://tiktok.com/@riccardosegna"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 font-body text-[11px] uppercase tracking-[0.24em] text-white/70 hover:text-white hover:border-[#F69E00]/30 transition-colors"
                            >
                                TikTok
                            </a>
                        </div>
                    </div>
                </div>

                {/* ================= DELOS LAB ================= */}
                <div className="grid md:grid-cols-2 gap-16 items-start mb-24">
                    <div className="relative aspect-[3/4] max-w-sm mx-auto md:mx-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_30px_90px_rgba(0,0,0,0.65)] md:order-2">
                        <Image
                            src="/delos-lab.png"
                            alt="Delos Lab - Agenzia creativa Roma, partner di produzione THE ITALIANS, marketing e video"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 400px"
                            quality={80}
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <h2 className="font-heading text-3xl font-bold tracking-tight text-white">Delos Lab</h2>
                            <p className="mt-2 font-body text-[12px] tracking-[0.22em] uppercase text-[#F69E00]/90">
                                Direction · Production · Post
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6 md:order-1">
                        <p className="font-body text-white/75 leading-relaxed text-[17px]">
                            <strong className="text-white">Delos Lab</strong> è un&apos;agenzia di marketing, produzione video
                            e consulenza con sede a <strong className="text-white">Roma</strong>.
                        </p>
                        <p className="font-body text-white/65 leading-relaxed">
                            Fondata da Edoardo De Juliis e Marco Losso, il team ha generato oltre{' '}
                            <strong className="text-white">4 miliardi di visualizzazioni</strong> e seguito più di{' '}
                            <strong className="text-white">5 milioni di follower</strong> per i propri clienti.
                        </p>
                        <p className="font-body text-white/65 leading-relaxed">
                            In THE ITALIANS, Delos Lab cura direzione creativa, produzione e post-produzione di ogni episodio.
                            Trasforma le storie in contenuti coerenti, curati e strategici, mantenendo uno stile
                            cinematografico e professionale.
                        </p>

                        <div className="flex flex-wrap gap-3 pt-4">
                            <a
                                href="https://delos-lab.it"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 font-body text-[11px] uppercase tracking-[0.24em] text-white/70 hover:text-white hover:border-[#F69E00]/30 transition-colors"
                            >
                                Sito Web
                            </a>
                            <a
                                href="https://it.linkedin.com/company/deloslab"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 font-body text-[11px] uppercase tracking-[0.24em] text-white/70 hover:text-white hover:border-[#F69E00]/30 transition-colors"
                            >
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

                {/* ================= CTA ================= */}
                <div className="text-center border-t border-white/10 pt-16">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                        Vuoi essere raccontato?
                    </h2>
                    <p className="font-body text-white/65 text-lg font-light mb-8 max-w-lg mx-auto">
                        Se la tua impresa ha una storia da raccontare, candidati per essere parte di THE ITALIANS.
                    </p>
                    <Link href="/candidati">
                        <Button variant="primary">Candidati Ora</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
