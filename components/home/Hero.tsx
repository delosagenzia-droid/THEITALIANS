'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui/Button';

export function Hero() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Trigger animations after mount
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative h-screen flex items-center overflow-hidden bg-bg">

            {/* ===== BACKGROUND LAYERS ===== */}

            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-bg via-bg-elevated to-bg" />

            {/* Radial glow - subtle golden light from top */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(196,160,82,0.15),transparent)]" />

            {/* Bottom fade for smooth transition to next section */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent" />

            {/* Film Grain Overlay - cinematic texture */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 animate-grain"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* ===== DECORATIVE ELEMENTS ===== */}

            {/* Large decorative circle - top right */}
            <div
                className="absolute -top-20 -right-20 w-[500px] h-[500px] border border-accent/10 rounded-full transition-transform duration-[3000ms] ease-out"
                style={{ transform: isLoaded ? 'scale(1)' : 'scale(0.8)' }}
            />
            <div
                className="absolute -top-10 -right-10 w-[400px] h-[400px] border border-accent/5 rounded-full transition-transform duration-[3500ms] ease-out delay-200"
                style={{ transform: isLoaded ? 'scale(1)' : 'scale(0.8)' }}
            />

            {/* Small decorative circle - bottom left */}
            <div className="absolute -bottom-32 -left-32 w-[300px] h-[300px] border border-white/5 rounded-full" />

            {/* Diagonal accent line */}
            <div className="absolute top-0 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent hidden lg:block" />

            {/* Horizontal accent line */}
            <div className="absolute top-1/3 right-0 w-32 h-px bg-gradient-to-l from-transparent via-accent/20 to-transparent hidden lg:block" />

            {/* ===== MAIN CONTENT ===== */}

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-20">

                {/* Section indicator */}
                <div
                    className={`
                        flex items-center gap-4 mb-12
                        transition-all duration-1000 ease-out
                        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    `}
                >
                    <span className="font-body text-[11px] tracking-[4px] text-accent/70 uppercase">
                        01
                    </span>
                    <div className="w-12 h-px bg-gradient-to-r from-accent/50 to-transparent" />
                    <span className="font-body text-[10px] tracking-[2px] text-text-subtle/50 uppercase hidden sm:inline">
                        The Italians
                    </span>
                </div>

                {/* Main Title */}
                <h1
                    className={`
                        font-display text-[clamp(2.5rem,8vw,7rem)] font-light leading-[1.05] tracking-tight mb-8
                        transition-all duration-1000 delay-200 ease-out
                        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                    `}
                >
                    <span className="text-white">Raccontiamo le</span>
                    <br />
                    <span className="italic text-accent">Imprese Italiane</span>
                </h1>

                {/* Tagline / Description */}
                <p
                    className={`
                        font-body text-text-muted text-base md:text-lg font-light leading-relaxed max-w-xl mb-6
                        transition-all duration-1000 delay-400 ease-out
                        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                    `}
                >
                    Entriamo nelle fabbriche, nei laboratori, nelle cucine.
                    <br className="hidden md:block" />
                    Ascoltiamo le voci di chi lavora ogni giorno dietro l'eccellenza italiana.
                </p>

                {/* Collaboration credit */}
                <p
                    className={`
                        font-body text-[11px] tracking-[3px] text-text-subtle uppercase mb-12
                        transition-all duration-1000 delay-500 ease-out
                        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                    `}
                >
                    Riccardo Segna
                    <span className="inline-block mx-3 text-accent">×</span>
                    Delos Lab — 2026
                </p>

                {/* CTA Buttons */}
                <div
                    className={`
                        flex flex-col sm:flex-row items-start gap-4
                        transition-all duration-1000 delay-700 ease-out
                        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                    `}
                >
                    <Button variant="primary" size="lg">
                        Scopri il Format
                    </Button>
                    <Button variant="outline" size="lg">
                        Guarda le Storie
                    </Button>
                </div>
            </div>

            {/* ===== SCROLL INDICATOR ===== */}

            <div
                className={`
                    absolute bottom-12 left-12 hidden lg:flex items-center gap-6
                    transition-all duration-1000 delay-1000 ease-out
                    ${isLoaded ? 'opacity-100' : 'opacity-0'}
                `}
            >
                {/* Animated vertical line */}
                <div className="relative h-16 w-px overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent to-transparent animate-scroll-line" />
                </div>

                <span
                    className="font-body text-[10px] tracking-[2px] text-text-subtle uppercase"
                    style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
                >
                    Scroll
                </span>
            </div>

            {/* ===== SIDE DECORATIONS ===== */}

            {/* Right side vertical text */}
            <div
                className={`
                    absolute right-12 top-1/2 -translate-y-1/2 hidden xl:block
                    transition-all duration-1000 delay-800 ease-out
                    ${isLoaded ? 'opacity-100' : 'opacity-0'}
                `}
            >
                <span
                    className="font-body text-[10px] tracking-[3px] text-text-subtle/50 uppercase"
                    style={{ writingMode: 'vertical-lr' }}
                >
                    Storie di Eccellenza
                </span>
            </div>

            {/* Bottom right - social hint */}
            <div
                className={`
                    absolute bottom-12 right-12 hidden lg:flex items-center gap-4
                    transition-all duration-1000 delay-1100 ease-out
                    ${isLoaded ? 'opacity-100' : 'opacity-0'}
                `}
            >
                <span className="font-body text-[10px] tracking-[2px] text-text-subtle/50 uppercase">
                    @theitalians
                </span>
                <div className="w-8 h-px bg-white/10" />
            </div>
        </section>
    );
}