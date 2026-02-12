import { SectionNumber } from '../ui/SectionNumber';
import Image from 'next/image';

export function Team() {
    return (
        <section id="team" className="relative overflow-hidden bg-[#0B0B0B] py-28 md:py-36">
            {/* ================= BACKGROUND (premium black) ================= */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Base depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0B0B0B] to-[#050505]" />

                {/* Accent spotlight */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(246,158,0,0.14),transparent_60%)]" />

                {/* Subtle side glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_60%_at_85%_35%,rgba(246,158,0,0.08),transparent_65%)]" />

                {/* Editorial grid */}
                <div className="absolute inset-0 opacity-[0.18] hidden md:block">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px]" />
                    <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_70%,transparent_100%)] bg-[#0B0B0B]" />
                </div>

                {/* Grain */}
                <div
                    className="absolute inset-0 opacity-[0.035] hidden md:block"
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
                        <SectionNumber number="04" className="mb-6" />
                        <h2 className="font-heading font-bold text-[clamp(2.3rem,4.6vw,4.4rem)] leading-[0.95] tracking-tight text-white">
                            Chi <span className="italic font-light text-[#F69E00]">Siamo.</span>
                        </h2>
                    </div>

                    <div className="max-w-md">
                        <p className="font-body text-white/65 text-lg font-light leading-relaxed border-l border-white/10 pl-6">
                            THE ITALIANS nasce dall’unione tra storytelling umano e struttura produttiva solida. Un progetto editoriale
                            che entra nelle aziende per dare voce a chi le costruisce ogni giorno.
                        </p>
                    </div>
                </div>

                {/* ================= GRID ================= */}
                <div className="grid gap-10 md:grid-cols-2 md:gap-16">
                    {/* ================= CARD: RICCARDO ================= */}
                    <div className="group">
                        {/* Media frame */}
                        <div className="relative mx-auto mb-8 w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
                            {/* Accent top line */}
                            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-[#F69E00]/45 via-white/10 to-transparent opacity-70 z-20" />

                            <div className="relative aspect-[3/4]">
                                <Image
                                    src="/riccardo-segna.jpg"
                                    alt="Riccardo Segna (Riccardo Segnalini) - Content Creator e Host di THE ITALIANS, storyteller imprese italiane"
                                    fill
                                    className="object-cover grayscale-[35%] contrast-[1.05] transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-[1.04]"
                                    sizes="(max-width: 768px) 100vw, 400px"
                                    quality={80}
                                    loading="lazy"
                                    decoding="async"
                                />

                                {/* Cinematic overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                                {/* Badge */}
                                <div className="absolute left-6 top-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/35 px-4 py-2 backdrop-blur-md">
                                    <span className="h-2 w-2 rounded-full bg-[#F69E00]" />
                                    <span className="font-body text-[10px] font-semibold tracking-[0.28em] uppercase text-white/80">
                                        CONTENT CREATOR
                                    </span>
                                </div>

                                {/* Name */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="font-heading text-3xl font-bold tracking-tight text-white">Riccardo Segna</h3>
                                    <p className="mt-2 font-body text-[12px] tracking-[0.22em] uppercase text-[#F69E00]/90">
                                        Host · Interviewer
                                    </p>
                                </div>
                            </div>

                            {/* Soft hover glow */}
                            <div className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-[520px] -translate-x-1/2 rounded-full bg-[#F69E00]/10 blur-[70px] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                        </div>

                        {/* Body */}
                        <div className="space-y-6">
                            <p className="font-body text-white/65 leading-relaxed font-light">
                                <strong className="text-white/85">Riccardo Segna</strong> (Riccardo Segnalini) è un content creator e
                                storyteller italiano specializzato in street interview e racconto d&apos;impresa. Con oltre 155.000 follower
                                su Instagram, 330.000 su TikTok e 30 milioni di visualizzazioni, racconta persone e
                                professionisti con uno stile diretto, autentico e cinematografico. Come host e
                                interviewer di THE ITALIANS, entra nelle aziende italiane per dare voce a chi le
                                costruisce ogni giorno.
                            </p>

                            {/* Metrics */}
                            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                                <a
                                    href="https://instagram.com/riccardosegna"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/m block rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-500 hover:border-[#F69E00]/30 hover:bg-white/[0.03]"
                                >
                                    <div className="font-heading text-xl font-bold text-white">155k</div>
                                    <div className="mt-1 font-body text-[10px] uppercase tracking-widest text-white/45">
                                        Instagram
                                    </div>
                                    <div className="mt-3 h-px w-full bg-gradient-to-r from-[#F69E00]/40 to-transparent opacity-60" />
                                </a>

                                <a
                                    href="https://tiktok.com/@riccardosegna"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/m block rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-500 hover:border-[#F69E00]/30 hover:bg-white/[0.03]"
                                >
                                    <div className="font-heading text-xl font-bold text-white">330k+</div>
                                    <div className="mt-1 font-body text-[10px] uppercase tracking-widest text-white/45">TikTok</div>
                                    <div className="mt-3 h-px w-full bg-gradient-to-r from-[#F69E00]/40 to-transparent opacity-60" />
                                </a>

                                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                                    <div className="font-heading text-xl font-bold text-white">30M+</div>
                                    <div className="mt-1 font-body text-[10px] uppercase tracking-widest text-white/45">Views</div>
                                    <div className="mt-3 h-px w-full bg-gradient-to-r from-[#F69E00]/40 to-transparent opacity-60" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= CARD: DELOS ================= */}
                    <div className="group md:mt-20">
                        {/* Media frame */}
                        <div className="relative mx-auto mb-8 w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_30px_90px_rgba(0,0,0,0.65)] transition-colors duration-500 group-hover:border-[#F69E00]/20">
                            {/* Accent top line */}
                            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-[#F69E00]/45 via-white/10 to-transparent opacity-70 z-20" />

                            <div className="relative aspect-[3/4]">
                                <Image
                                    src="/delos-lab.png"
                                    alt="Delos Lab - Agenzia creativa Roma, partner di produzione THE ITALIANS, marketing e video"
                                    fill
                                    className="object-cover grayscale-[35%] contrast-[1.05] transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-[1.04]"
                                    sizes="(max-width: 768px) 100vw, 400px"
                                    quality={80}
                                    loading="lazy"
                                    decoding="async"
                                />

                                {/* Cinematic overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                                {/* Badge */}
                                <div className="absolute left-6 top-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/35 px-4 py-2 backdrop-blur-md">
                                    <span className="h-2 w-2 rounded-full bg-[#F69E00]" />
                                    <span className="font-body text-[10px] font-semibold tracking-[0.28em] uppercase text-white/80">
                                        PRODUCTION PARTNER
                                    </span>
                                </div>

                                {/* Name */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="font-heading text-3xl font-bold tracking-tight text-white">Delos Lab</h3>
                                    <p className="mt-2 font-body text-[12px] tracking-[0.22em] uppercase text-[#F69E00]/90">
                                        Direction · Production · Post
                                    </p>
                                </div>
                            </div>

                            {/* Soft hover glow */}
                            <div className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-[520px] -translate-x-1/2 rounded-full bg-[#F69E00]/10 blur-[70px] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                        </div>

                        {/* Body */}
                        <div className="space-y-6">
                            <p className="font-body text-white/65 leading-relaxed font-light">
                                <strong className="text-white/85">Delos Lab</strong> è un&apos;agenzia di marketing, produzione video
                                e consulenza con sede a Roma (Via Gaetano Donizetti 7/b, 00198). Fondata da Edoardo
                                De Juliis e Marco Losso, il team ha generato oltre 4 miliardi di visualizzazioni e
                                seguito più di 5 milioni di follower per i propri clienti. In THE ITALIANS, Delos Lab
                                cura direzione creativa, produzione e post-produzione di ogni episodio.
                            </p>

                            {/* Metrics */}
                            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-500 hover:border-[#F69E00]/25 hover:bg-white/[0.03]">
                                    <div className="font-heading text-xl font-bold text-white">4B+</div>
                                    <div className="mt-1 font-body text-[10px] uppercase tracking-widest text-white/45">Views Gen.</div>
                                    <div className="mt-3 h-px w-full bg-gradient-to-r from-[#F69E00]/40 to-transparent opacity-60" />
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-500 hover:border-[#F69E00]/25 hover:bg-white/[0.03]">
                                    <div className="font-heading text-xl font-bold text-white">5M+</div>
                                    <div className="mt-1 font-body text-[10px] uppercase tracking-widest text-white/45">Followers</div>
                                    <div className="mt-3 h-px w-full bg-gradient-to-r from-[#F69E00]/40 to-transparent opacity-60" />
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-500 hover:border-[#F69E00]/25 hover:bg-white/[0.03]">
                                    <div className="font-heading text-xl font-bold text-white">Data</div>
                                    <div className="mt-1 font-body text-[10px] uppercase tracking-widest text-white/45">Driven</div>
                                    <div className="mt-3 h-px w-full bg-gradient-to-r from-[#F69E00]/40 to-transparent opacity-60" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= QUOTE ================= */}
                <div className="mt-20 md:mt-28 text-center">
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-6 flex items-center justify-center gap-4">
                            <div className="h-px w-10 bg-white/10" />
                            <span className="font-body text-[11px] tracking-[0.28em] uppercase text-white/40">
                                Vision
                            </span>
                            <div className="h-px w-10 bg-white/10" />
                        </div>

                        <p className="font-heading text-2xl md:text-3xl font-bold italic text-white/85">
                            “Due visioni diverse, un solo racconto: quello delle imprese italiane.”
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
