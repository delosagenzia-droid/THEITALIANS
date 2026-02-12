import Image from 'next/image';
import Link from 'next/link';

export function ComeFacciamo() {
    return (
        <section className="relative overflow-hidden bg-[#1D1D1D]">
            {/* ================= BACKGROUND ================= */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_0%_50%,rgba(246,158,0,0.08),transparent_60%)]" />
                <div className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-28">
                <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center">
                    {/* ================= TEXT ================= */}
                    <div className="relative pl-6 md:pl-8 border-l-2 border-[#F69E00]/30">
                        {/* Decorative dot on the border */}
                        <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-[#F69E00]" />

                        {/* Label */}
                        <p className="font-body text-[13px] font-medium uppercase tracking-[0.32em] text-[#F69E00] mb-3">
                            Il Progetto
                        </p>

                        {/* Heading */}
                        <h2 className="font-heading text-[clamp(2rem,4vw,2.625rem)] font-semibold leading-[1.1] tracking-tight text-white mb-4">
                            Come lo facciamo
                        </h2>

                        {/* Decorative line */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="h-px w-12 bg-gradient-to-r from-[#F69E00] to-transparent" />
                            <div className="h-1 w-1 rounded-full bg-[#F69E00]/50" />
                        </div>

                        {/* Body */}
                        <p className="font-body text-[17px] font-normal leading-[1.75] text-white/75 max-w-lg mb-8">
                            Da un&apos;idea di <span className="text-white font-medium">Riccardo Segna</span> nasce
                            THE ITALIANS: un progetto editoriale che vuole{' '}
                            <span className="text-white/90 font-medium">dare luce e spazio</span> alle realtà
                            imprenditoriali italiane. Entriamo nelle aziende per raccontare le persone, i valori
                            e il lavoro che rendono unico il{' '}
                            <span className="text-[#F69E00]/90 font-medium">Made in Italy</span>.
                        </p>

                        {/* CTA */}
                        <Link
                            href="/chi-siamo"
                            className="group inline-flex items-center gap-3 rounded-lg bg-[#F69E00] px-7 py-3.5 font-body text-[15px] font-semibold text-white transition-all duration-300 hover:bg-[#E08E00] hover:shadow-[0_8px_30px_rgba(246,158,0,0.35)] hover:gap-4"
                        >
                            Scopri il format
                            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* ================= IMAGE (più piccola) ================= */}
                    <div className="relative w-[220px] md:w-[260px] mx-auto md:mx-0">
                        <div className="absolute -inset-4 rounded-2xl bg-[#F69E00]/8 blur-[40px]" />

                        <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                            <div className="relative aspect-[3/4]">
                                <Image
                                    src="/riccardo-segna.jpg"
                                    alt="Riccardo Segna - Host e interviewer di THE ITALIANS"
                                    fill
                                    className="object-cover"
                                    sizes="260px"
                                    quality={80}
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1D]/70 via-transparent to-transparent" />
                            </div>

                            {/* Caption bar */}
                            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="font-heading text-base font-semibold text-white">Riccardo Segna</p>
                                <p className="font-body text-[11px] tracking-[0.22em] uppercase text-[#F69E00]/90">
                                    Host · Interviewer
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= BANNER CTA - NESSUN COSTO ================= */}
                <div className="mt-12 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm px-6 py-5 md:px-8 md:py-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
                        {/* Icona */}
                        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#F69E00]/10 border border-[#F69E00]/20">
                            <svg className="w-6 h-6 text-[#F69E00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                            </svg>
                        </div>

                        {/* Testo */}
                        <div className="flex-1">
                            <p className="font-heading text-[16px] font-bold text-white mb-1">
                                Nessun costo per l&apos;azienda
                            </p>
                            <p className="font-body text-[14px] font-normal leading-relaxed text-white/60">
                                THE ITALIANS è un progetto editoriale. Non chiediamo pagamenti: cerchiamo imprese con storie
                                vere da raccontare. Voi collaborate, noi creiamo contenuti video professionali per canali
                                con milioni di visualizzazioni.
                            </p>
                        </div>

                        {/* CTA */}
                        <Link
                            href="/candidati"
                            className="flex-shrink-0 inline-flex items-center justify-center gap-2 rounded-lg border border-[#F69E00] px-6 py-3 font-body text-[15px] font-semibold text-[#F69E00] transition-all duration-300 hover:bg-[#F69E00] hover:text-white hover:shadow-[0_8px_30px_rgba(246,158,0,0.25)]"
                        >
                            Candidati ora
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}