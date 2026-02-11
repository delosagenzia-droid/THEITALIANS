'use client';

import { SectionNumber } from '../ui/SectionNumber';

export function Problem() {
    return (
        <section className="relative overflow-hidden bg-white py-24 md:py-40">
            {/* ================= BACKGROUND (clean editorial) ================= */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Soft accent spotlight (top) */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_-10%,rgba(246,158,0,0.12),transparent_60%)]" />

                {/* Subtle secondary glow (right) */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_55%_at_85%_35%,rgba(246,158,0,0.08),transparent_65%)]" />

                {/* Editorial grid (dark on white, subtle) */}
                <div className="absolute inset-0 opacity-[0.30]">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:42px_42px]" />
                    <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_65%,transparent_100%)] bg-white" />
                </div>

                {/* Grain (ultra subtle) */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Decorative rings (premium, minimal) */}
                <div className="absolute -top-28 -left-28 h-[520px] w-[520px] rounded-full border border-black/5" />
                <div className="absolute -top-16 -left-16 h-[420px] w-[420px] rounded-full border border-[#F69E00]/15" />
                <div className="absolute bottom-[-220px] right-[-220px] h-[520px] w-[520px] rounded-full border border-[#F69E00]/10" />
            </div>

            <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24">
                {/* ================= LEFT: TEXT ================= */}
                <div className="relative">
                    <div className="inline-block mb-8">
                        <SectionNumber number="01" />
                    </div>

                    <h2 className="font-heading font-bold text-[clamp(2.2rem,4.8vw,4.2rem)] leading-[1.02] tracking-tight text-[#111111] mb-8">
                        Cos'è il progetto <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#111111]/85 to-[#F69E00]">
                            THE ITALIANS?
                        </span>
                    </h2>

                    <div className="space-y-7 max-w-xl">
                        <p className="font-body text-[18px] md:text-[20px] font-light leading-relaxed text-[#4B4B4B]">
                            L&apos;Italia è la culla di{' '}
                            <span className="text-[#111111] font-medium">imprese straordinarie</span>. Realtà imprenditoriali che
                            costruiscono valore ogni giorno, ma restano intrappolate in una comunicazione invisibile.
                        </p>

                        {/* Divider label (more premium than the old bar) */}
                        <div className="flex items-center gap-4 pt-1">
                            <div className="h-px flex-1 bg-gradient-to-r from-[#F69E00]/60 via-black/10 to-transparent" />
                            <span className="font-body text-[11px] uppercase tracking-[0.28em] font-semibold text-[#F69E00]">
                                Il problema
                            </span>
                            <div className="h-px w-10 bg-black/10" />
                        </div>

                        <p className="font-body text-[16px] md:text-[17px] font-light leading-relaxed text-[#5A5A5A]">
                            Il valore di un brand oggi non risiede solo in ciò che produce, ma nella{' '}
                            <span className="text-[#111111] italic font-normal">capacità di emozionare</span> attraverso uno schermo.
                            Senza video, la tua storia non esiste.
                        </p>

                        {/* Quote / Manifesto block (luxury card on white) */}
                        <div className="relative">
                            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#F69E00]/20 via-transparent to-transparent blur opacity-60" />
                            <div className="relative rounded-2xl border border-black/10 bg-white/70 backdrop-blur-md p-7 shadow-[0_18px_50px_rgba(0,0,0,0.10)]">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 h-10 w-10 rounded-xl bg-[#F69E00]/12 border border-[#F69E00]/25 flex items-center justify-center">
                                        <span className="text-[#F69E00] font-bold text-2xl leading-none">“</span>
                                    </div>

                                    <p className="font-body text-[16px] md:text-[17px] font-light leading-snug text-[#111111]">
                                        Diamo <span className="text-[#F69E00] font-semibold">voce</span> alle imprese
                                        italiane. Non facciamo video, costruiamo{' '}
                                        <span className="italic">eredità visive</span>.
                                    </p>
                                </div>

                                {/* Small signature line */}
                                <div className="mt-5 flex items-center gap-3">
                                    <div className="h-px flex-1 bg-black/10" />
                                    <span className="font-body text-[11px] tracking-[0.22em] uppercase text-[#7A7A7A]">
                                        The Italians — 2026
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Optional: 2 bullet "impact" lines (adds style + clarity) */}
                        <div className="pt-2 space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="mt-2 h-2 w-2 rounded-full bg-[#F69E00]" />
                                <p className="font-body text-[14px] md:text-[15px] text-[#5A5A5A] leading-relaxed">
                                    Senza contenuto verticale, l’attenzione si perde in pochi secondi.
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-2 h-2 w-2 rounded-full bg-[#F69E00]" />
                                <p className="font-body text-[14px] md:text-[15px] text-[#5A5A5A] leading-relaxed">
                                    La percezione del brand non dipende solo dal prodotto, ma dal racconto.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= RIGHT: VERTICAL VIDEO MOCKUP ================= */}
                <div className="relative">
                    {/* Hover glow */}
                    <div className="absolute -inset-10 rounded-[48px] bg-[#F69E00]/10 blur-[90px] opacity-60" />

                    {/* Phone-like vertical frame */}
                    <div className="relative mx-auto w-full max-w-[380px]">
                        {/* Outer shell */}
                        <div className="relative rounded-[44px] border border-black/10 bg-white shadow-[0_40px_120px_rgba(0,0,0,0.18)]">
                            {/* Side buttons (subtle detail) */}
                            <div className="absolute left-[-2px] top-28 h-10 w-[3px] rounded-full bg-black/10" />
                            <div className="absolute left-[-2px] top-44 h-16 w-[3px] rounded-full bg-black/10" />
                            <div className="absolute right-[-2px] top-36 h-20 w-[3px] rounded-full bg-black/10" />

                            {/* Screen */}
                            <div className="relative m-[10px] overflow-hidden rounded-[36px] bg-[#0B0B0B]">
                                {/* 9:16 aspect ratio */}
                                <div className="relative aspect-[9/16]">
                                    {/* Gradient overlay for readability */}
                                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/25 via-transparent to-black/55 pointer-events-none" />

                                    {/* Notch */}
                                    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 h-6 w-28 rounded-full bg-black/70 border border-white/10" />

                                    {/* VIDEO (placeholder) — sostituisci src con il tuo verticale */}
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="absolute inset-0 h-full w-full object-cover opacity-90"
                                    >
                                        {/* Placeholder: metti qui un vero reel verticale quando lo hai */}
                                        <source
                                            src="https://assets.mixkit.co/videos/preview/mixkit-woman-taking-a-video-of-a-street-45041-large.mp4"
                                            type="video/mp4"
                                        />
                                    </video>

                                    {/* HUD / labels */}
                                    <div className="absolute inset-0 z-20 p-5 flex flex-col justify-between pointer-events-none">
                                        <div className="flex items-start justify-between">
                                            <div className="rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md border border-white/10">
                                                <p className="font-body text-[10px] tracking-[0.24em] uppercase text-white/85 font-semibold">
                                                    Reel · Vertical Story
                                                </p>
                                            </div>

                                            <div className="rounded-full bg-[#F69E00]/20 px-3 py-1.5 backdrop-blur-md border border-[#F69E00]/30">
                                                <p className="font-body text-[10px] tracking-[0.24em] uppercase text-[#F69E00] font-semibold">
                                                    #F69E00
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-end justify-between gap-4">
                                            <div className="rounded-2xl bg-black/35 backdrop-blur-md px-4 py-3 border border-white/10">
                                                <p className="font-heading text-white font-bold text-[18px] leading-none italic">
                                                    The Italians
                                                </p>
                                                <p className="mt-1 font-body text-[10px] tracking-[0.22em] uppercase font-semibold text-[#F69E00]">
                                                    Visual Legacy
                                                </p>
                                            </div>

                                            {/* Fake UI dots (style) */}
                                            <div className="flex flex-col gap-2 opacity-90">
                                                <div className="h-9 w-9 rounded-full bg-white/10 border border-white/10 backdrop-blur-md" />
                                                <div className="h-9 w-9 rounded-full bg-white/10 border border-white/10 backdrop-blur-md" />
                                                <div className="h-9 w-9 rounded-full bg-white/10 border border-white/10 backdrop-blur-md" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom caption under the phone (adds “premium pitch deck” feel) */}
                            <div className="px-6 pb-6 pt-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-px flex-1 bg-black/10" />
                                    <span className="font-body text-[11px] tracking-[0.22em] uppercase text-[#7A7A7A]">
                                        Placeholder · Vertical Video
                                    </span>
                                    <div className="h-px w-10 bg-black/10" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Micro badge (optional) */}
                    <div className="mt-8 flex justify-center">
                        <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/70 px-5 py-2 backdrop-blur-md">
                            <span className="h-2 w-2 rounded-full bg-[#F69E00]" />
                            <span className="font-body text-[12px] tracking-widest uppercase text-[#5A5A5A]">
                                Formato ottimizzato per TikTok / Reels / Shorts
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
