'use client';

import { SectionNumber } from '../ui/SectionNumber';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function Problem() {
    const videoRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' } // Preload 200px before appearing
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="relative overflow-hidden bg-white py-24 md:py-40">
            {/* ================= BACKGROUND (clean editorial) ================= */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Soft accent spotlight (top) */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_-10%,rgba(246,158,0,0.12),transparent_60%)]" />

                {/* Subtle secondary glow (right) */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_55%_at_85%_35%,rgba(246,158,0,0.08),transparent_65%)]" />

                {/* Editorial grid (dark on white, subtle) */}
                <div className="absolute inset-0 opacity-[0.30] hidden md:block">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:42px_42px]" />
                    <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_65%,transparent_100%)] bg-white" />
                </div>

                {/* Grain (ultra subtle) */}
                <div
                    className="absolute inset-0 opacity-[0.025] hidden md:block"
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
                <div className="relative perspective-[2000px]">
                    {/* Pulsing Hover glow */}
                    <motion.div
                        initial={{ opacity: 0.4, scale: 0.9 }}
                        animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.9, 1.05, 0.9] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -inset-10 rounded-[48px] bg-[#F69E00]/15 blur-[100px]"
                    />

                    {/* Phone-like vertical frame with Floating Animation (Disabled on mobile) */}
                    <div className="relative mx-auto w-full max-w-[380px] preserve-3d md:animate-[float_6s_ease-in-out_infinite]">
                        {/* Wrapper for motion (desktop only) or static (mobile) */}
                        <motion.div
                            className="relative w-full h-full"
                            initial={{ y: 0 }}
                            animate={!isMobile ? { y: [-10, 10, -10] } : undefined}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            {/* Floating Interaction Elements (Orbiting) */}
                            <motion.div
                                animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -right-8 top-20 z-30 hidden lg:flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-4 py-2 shadow-xl border border-black/5"
                            >
                                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                                <span className="text-xs font-bold text-black/80">4.2k</span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [-8, 8, -8], x: [-5, 5, -5] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute -left-6 bottom-32 z-30 hidden lg:flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-4 py-2 shadow-xl border border-black/5"
                            >
                                <MessageCircle className="w-4 h-4 text-blue-500" />
                                <span className="text-xs font-bold text-black/80">342</span>
                            </motion.div>

                            {/* Outer shell (Metal Frame Effect) */}
                            <div className="relative rounded-[50px] p-[6px] bg-gradient-to-b from-[#e3e3e3] via-[#f5f5f5] to-[#d1d1d1] shadow-[0_40px_120px_rgba(0,0,0,0.2),0_10px_30px_rgba(0,0,0,0.1)]">
                                {/* Inner Bezel */}
                                <div className="relative rounded-[44px] bg-black border-[4px] border-black overflow-hidden ring-1 ring-white/20">

                                    {/* Side buttons (subtle) */}
                                    <div className="absolute left-[-8px] top-28 h-10 w-[4px] rounded-l-md bg-[#c0c0c0]" />
                                    <div className="absolute left-[-8px] top-44 h-16 w-[4px] rounded-l-md bg-[#c0c0c0]" />
                                    <div className="absolute right-[-8px] top-36 h-20 w-[4px] rounded-r-md bg-[#c0c0c0]" />

                                    {/* Screen */}
                                    <div className="relative overflow-hidden rounded-[38px] bg-[#0B0B0B]">
                                        {/* 9:16 aspect ratio */}
                                        <div ref={videoRef} className="relative aspect-[9/16]">
                                            {/* Gradient overlay for readability */}
                                            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

                                            {/* Notch */}
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 h-7 w-32 bg-black rounded-b-[18px] flex justify-center items-center">
                                                <div className="w-16 h-1 rounded-full bg-[#1a1a1a]" />
                                            </div>

                                            {/* VIDEO */}
                                            {isInView && (
                                                <video
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                    preload="metadata"
                                                    poster="/poster-placeholder.png"
                                                    className="absolute inset-0 h-full w-full object-cover scale-[1.02]"
                                                >
                                                    <source
                                                        src="https://lcsckuzjasqtxsgvnzse.supabase.co/storage/v1/object/public/brand/VIDEO_rick%20(1)%20(1).mp4?v=optimized"
                                                        type="video/mp4"
                                                    />
                                                </video>
                                            )}

                                            {/* Play Button Overlay (Dynamic) */}
                                            <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                                                </div>
                                            </div>

                                            {/* HUD / labels */}
                                            <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between pointer-events-none">
                                                <div className="flex items-start justify-between mt-6">
                                                    <div className="rounded-full bg-black/30 px-3 py-1.5 backdrop-blur-lg border border-white/10 flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                                        <p className="font-body text-[10px] tracking-[0.1em] uppercase text-white font-medium">
                                                            LIVE
                                                        </p>
                                                    </div>

                                                    <div className="rounded-full bg-[#F69E00]/20 px-3 py-1.5 backdrop-blur-lg border border-[#F69E00]/30 shadow-[0_0_15px_rgba(246,158,0,0.3)]">
                                                        <p className="font-body text-[10px] tracking-[0.1em] uppercase text-[#F69E00] font-bold">
                                                            #ITALIANS
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-end justify-between gap-4">
                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-8 w-8 rounded-full border border-white/20 bg-white/10 backdrop-blur-md p-0.5">
                                                                <img src="/logo-email.png" alt="Logo" className="w-full h-full object-contain opacity-90" />
                                                            </div>
                                                            <span className="text-white font-heading font-semibold text-sm tracking-wide">The Italians</span>
                                                        </div>
                                                        <div className="rounded-2xl bg-black/40 backdrop-blur-md px-4 py-3 border border-white/10">
                                                            <p className="font-heading text-white font-bold text-[22px] leading-none italic">
                                                                Visual Legacy
                                                            </p>
                                                            <p className="mt-1 font-body text-[11px] text-white/70">
                                                                Raccontare l'eccellenza attraverso le immagini.
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Action Bar */}
                                                    <div className="flex flex-col gap-4 pb-2">
                                                        <div className="flex flex-col items-center gap-1">
                                                            <div className="h-10 w-10 rounded-full bg-black/30 backdrop-blur-lg border border-white/10 flex items-center justify-center transition-transform hover:scale-110">
                                                                <Heart className="w-5 h-5 text-white" />
                                                            </div>
                                                            <span className="text-[10px] text-white font-medium">4.2k</span>
                                                        </div>
                                                        <div className="flex flex-col items-center gap-1">
                                                            <div className="h-10 w-10 rounded-full bg-black/30 backdrop-blur-lg border border-white/10 flex items-center justify-center transition-transform hover:scale-110">
                                                                <MessageCircle className="w-5 h-5 text-white" />
                                                            </div>
                                                            <span className="text-[10px] text-white font-medium">342</span>
                                                        </div>
                                                        <div className="flex flex-col items-center gap-1">
                                                            <div className="h-10 w-10 rounded-full bg-black/30 backdrop-blur-lg border border-white/10 flex items-center justify-center transition-transform hover:scale-110">
                                                                <Share2 className="w-5 h-5 text-white" />
                                                            </div>
                                                            <span className="text-[10px] text-white font-medium">Share</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Bottom Reflection */}
                            <div className="absolute -bottom-12 left-10 right-10 h-4 bg-black/20 blur-xl rounded-[100%]" />
                        </motion.div>
                    </div>

                    {/* Micro badge (optional) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 flex justify-center"
                    >
                        <div className="inline-flex items-center gap-3 rounded-full border border-black/5 bg-white/80 px-5 py-2 backdrop-blur-md shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F69E00] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F69E00]"></span>
                            </span>
                            <span className="font-body text-[12px] tracking-widest uppercase text-[#5A5A5A] font-medium">
                                Ottimizzato per Social Media
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
