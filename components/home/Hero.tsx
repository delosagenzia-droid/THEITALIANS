'use client';

import { useEffect, useState, useRef } from 'react';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { motion, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';

export function Hero() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse tracking for 3D parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for mouse movement
    const springConfig = { damping: 25, stiffness: 100 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Parallax transforms for different layers
    const layer1X = useTransform(springX, [-0.5, 0.5], [-20, 20]);
    const layer1Y = useTransform(springY, [-0.5, 0.5], [-20, 20]);

    const layer2X = useTransform(springX, [-0.5, 0.5], [30, -30]);
    const layer2Y = useTransform(springY, [-0.5, 0.5], [30, -30]);

    const layer3X = useTransform(springX, [-0.5, 0.5], [-10, 10]);
    const layer3Y = useTransform(springY, [-0.5, 0.5], [-10, 10]);

    // Spotlight effect
    const spotX = useTransform(springX, [-0.5, 0.5], ["30%", "70%"]);
    const spotY = useTransform(springY, [-0.5, 0.5], ["30%", "70%"]);
    const spotlightGradient = useMotionTemplate`radial-gradient(circle 400px at ${spotX} ${spotY}, rgba(246,158,0,0.08), transparent 80%)`;

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        setIsMobile(window.innerWidth < 768);
        return () => clearTimeout(timer);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { width, height, left, top } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={(e) => {
                // Disable parallax on mobile/touch
                if (window.matchMedia('(hover: hover)').matches) {
                    handleMouseMove(e);
                }
            }}
            className="relative min-h-screen flex items-center overflow-hidden bg-[#1D1D1D] perspective-1000"
        >
            {/* ===================== BACKGROUND ===================== */}

            {/* Base: subtle depth, stays black/charcoal */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-[#1D1D1D] to-[#0D0D0D] z-0" />

            {/* Interactive Spotlight (follows mouse) */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none opacity-60"
                style={{ background: spotlightGradient }}
            />

            {/* Accent glow (ONLY #F69E00) — top spotlight */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(246,158,0,0.12),transparent_60%)] z-0" />

            {/* Secondary accent glow — right side (very subtle) */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_55%_at_85%_30%,rgba(246,158,0,0.08),transparent_65%)] z-0" />

            {/* Film grain overlay (keep, but cleaner) */}
            {/* Film grain overlay (keep, but cleaner) */}
            <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none z-50 hidden md:block"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Bottom fade into next section */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#1D1D1D] to-transparent z-10" />

            {/* ===================== 3D DECOR / LINES ===================== */}

            {/* 3D Floating Elements Container */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Layer 1: Premium Rings (Moves with mouse) */}
                <motion.div
                    style={!isMobile ? { x: layer1X, y: layer1Y, rotate: 0, willChange: 'transform' } : undefined}
                    className="absolute inset-0"
                >
                    <div
                        className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full border border-[#F69E00]/12 transition-transform duration-[2800ms] ease-out"
                        style={{ transform: isLoaded ? 'scale(1)' : 'scale(0.86)' }}
                    />
                </motion.div>

                {/* Layer 2: Inner Ring (Moves opposite to mouse for depth) */}
                <motion.div
                    style={!isMobile ? { x: layer2X, y: layer2Y, rotate: 0, willChange: 'transform' } : undefined}
                    className="absolute inset-0"
                >
                    <div
                        className="absolute -top-12 -right-12 w-[420px] h-[420px] rounded-full border border-[#F69E00]/7 transition-transform duration-[3200ms] ease-out delay-200"
                        style={{ transform: isLoaded ? 'scale(1)' : 'scale(0.88)' }}
                    />
                </motion.div>

                {/* Layer 3: Floating Particles / Orbs */}
                <motion.div
                    style={!isMobile ? { x: layer3X, y: layer3Y, willChange: 'transform' } : undefined}
                    className="absolute inset-0"
                >
                    {/* Orb 1 */}
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#F69E00]/5 rounded-full blur-[80px]" />
                    {/* Orb 2 */}
                    <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#F69E00]/3 rounded-full blur-[100px]" />
                </motion.div>
            </div>

            {/* Minimal grid lines (cinematic, ultra subtle) */}
            <div className="absolute inset-0 opacity-[0.18] pointer-events-none z-0">
                <div className="absolute left-0 top-0 h-full w-px bg-white/5" />
                <div className="absolute right-0 top-0 h-full w-px bg-white/5" />
                <div className="absolute left-1/2 top-0 h-full w-px bg-white/3 hidden lg:block" />
            </div>

            {/* ===================== CONTENT ===================== */}

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-20">

                {/* Title */}
                <h1
                    className={[
                        'font-heading font-bold',
                        'text-[clamp(2.6rem,7.6vw,6.2rem)] leading-[1.02] tracking-tight',
                        'mb-2', // 8px between heading and body (tailwind step ≈ 8px)
                        'transition-all duration-1000 delay-150 ease-out',
                        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                    ].join(' ')}
                >
                    <span className="text-white">Tutti parlano di eccellenza italiana.</span>
                    <br />
                    <span className="text-[#F69E00]">Noi la mostriamo</span>
                </h1>

                {/* Description */}
                <p
                    className={[
                        'font-body font-normal text-white/90',
                        'text-base md:text-lg leading-relaxed',
                        'max-w-xl mb-6',
                        'transition-all duration-1000 delay-300 ease-out',
                        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                    ].join(' ')}
                >
                    THE ITALIANS ha l&apos;obiettivo di raccontare la tua azienda tramite interviste
                    autentiche e distribuirle sui nostri canali social:
                    <br className="hidden md:block" />
                    <span className="text-white">è un progetto editoriale,</span>{' '}
                    <span className="font-extrabold text-white uppercase tracking-wide">NON HA NESSUN COSTO!</span>
                </p>

                {/* Collaboration credit */}
                <p
                    className={[
                        'font-body font-medium text-[12px] tracking-widest uppercase',
                        'text-white/45 mb-6', // 24px total stack control before CTA (here = 24px-ish)
                        'transition-all duration-1000 delay-400 ease-out',
                        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                    ].join(' ')}
                >
                    Riccardo Segna <span className="mx-3 text-[#F69E00]">×</span> Delos Lab — 2026
                </p>

                {/* CTA */}
                <div
                    className={[
                        'flex flex-col sm:flex-row items-center gap-4',
                        'transition-all duration-1000 delay-550 ease-out',
                        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                    ].join(' ')}
                >
                    {/* Primary: #F69E00 + hover #E08E00, radius 8 */}
                    <Link href="#format" className="w-full sm:w-auto">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative w-full sm:w-auto overflow-hidden rounded-[8px] bg-[#F69E00] px-8 py-4 text-[15px] tracking-wide text-white font-body font-bold uppercase shadow-[0_10px_30px_rgba(246,158,0,0.25)] transition-colors hover:bg-[#E08E00] hover:shadow-[0_20px_40px_rgba(246,158,0,0.4)]"
                        >
                            <span className="relative z-10">Scopri il Format</span>

                            {/* Shine effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 z-0" />
                        </motion.button>
                    </Link>

                    {/* Secondary: outline with accent, keeps premium look */}
                    <Link href="/contatti" className="w-full sm:w-auto">
                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto rounded-[8px] border border-white/20 bg-transparent px-8 py-4 text-[15px] tracking-wide text-white font-body font-bold uppercase hover:bg-white/5 hover:border-white/40 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
                        >
                            Contattaci
                        </Button>
                    </Link>
                </div>
            </div>

            {/* ===================== SCROLL / SIDE ===================== */}

            <div
                className={[
                    'absolute bottom-12 left-12 hidden lg:flex items-center gap-6',
                    'transition-all duration-1000 delay-900 ease-out',
                    isLoaded ? 'opacity-100' : 'opacity-0',
                ].join(' ')}
            >
                <div className="relative h-16 w-px overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#F69E00] to-transparent animate-scroll-line" />
                </div>
                <span
                    className="font-body text-[10px] tracking-[2px] text-white/45 uppercase"
                    style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
                >
                    Scroll
                </span>
            </div>

            <div
                className={[
                    'absolute right-12 top-1/2 -translate-y-1/2 hidden xl:block',
                    'transition-all duration-1000 delay-700 ease-out',
                    isLoaded ? 'opacity-100' : 'opacity-0',
                ].join(' ')}
            >
                <span
                    className="font-body text-[10px] tracking-[3px] text-white/35 uppercase"
                    style={{ writingMode: 'vertical-lr' }}
                >
                    Storie di Eccellenza
                </span>
            </div>

            <div
                className={[
                    'absolute bottom-12 right-12 hidden lg:flex items-center gap-4',
                    'transition-all duration-1000 delay-1000 ease-out',
                    isLoaded ? 'opacity-100' : 'opacity-0',
                ].join(' ')}
            >
                <span className="font-body text-[10px] tracking-[2px] text-white/35 uppercase">
                    @theitalians
                </span>
                <div className="w-8 h-px bg-white/10" />
            </div>
        </section>
    );
}
