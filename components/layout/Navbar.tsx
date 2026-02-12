'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

const NAV_ITEMS = [
    { name: 'Home', href: '/' },
    { name: 'Chi Siamo', href: '/chi-siamo' },
    { name: 'Storie', href: '/storie' },
    { name: 'Candidati', href: '/candidati' },
];

export function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 z-50 w-full px-6 py-6 pointer-events-none">
            <nav
                className={[
                    'pointer-events-auto',
                    'mx-auto max-w-7xl h-16',
                    'flex items-center justify-between px-8',
                    'rounded-full',
                    'border border-white/10',
                    'bg-[#0B0B0B]/70 backdrop-blur-xl',
                    'shadow-[0_12px_40px_rgba(0,0,0,0.75)]',
                    'transition-all duration-500',
                    'hover:border-white/20',
                ].join(' ')}
            >
                {/* ================= LOGO ================= */}
                <Link
                    href="/"
                    className="group relative flex items-center gap-3 font-heading font-bold text-[14px] tracking-[0.28em] text-white"
                    onClick={() => setMenuOpen(false)}
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#F69E00] opacity-70 animate-ping" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#F69E00]" />
                    </span>

                    <span className="transition-colors duration-300 group-hover:text-[#F69E00]">
                        THE ITALIANS
                    </span>
                </Link>

                {/* ================= DESKTOP NAV LINKS ================= */}
                <div className="hidden md:flex items-center gap-12">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="group relative font-body text-[11px] font-medium tracking-[0.28em] uppercase text-white/55 transition-colors hover:text-white"
                        >
                            {item.name}

                            {/* Micro underline */}
                            <span className="absolute -bottom-2 left-0 h-[1px] w-0 bg-gradient-to-r from-[#F69E00] to-transparent transition-all duration-500 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* ================= DESKTOP CTA ================= */}
                <div className="hidden md:flex items-center gap-6">
                    <Link href="#candidati">
                        <Button
                            variant="ghost"
                            className={[
                                'relative overflow-hidden',
                                'rounded-full px-6 py-2',
                                'border border-[#F69E00]/35',
                                'transition-all duration-300',
                                'hover:border-[#F69E00]',
                            ].join(' ')}
                        >
                            <span className="relative z-10 font-body text-[11px] font-semibold tracking-[0.28em] uppercase text-white">
                                Candidati
                            </span>

                            {/* Luxury fill hover */}
                            <span className="absolute inset-0 bg-gradient-to-b from-[#F69E00] to-[#E08E00] translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                        </Button>
                    </Link>
                </div>

                {/* ================= HAMBURGER (MOBILE) ================= */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden relative z-[60] flex flex-col items-center justify-center w-10 h-10 gap-[5px] focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <span
                        className={[
                            'block h-[2px] w-6 rounded-full bg-white transition-all duration-300 origin-center',
                            menuOpen ? 'rotate-45 translate-y-[7px]' : '',
                        ].join(' ')}
                    />
                    <span
                        className={[
                            'block h-[2px] w-6 rounded-full bg-white transition-all duration-300',
                            menuOpen ? 'opacity-0 scale-x-0' : '',
                        ].join(' ')}
                    />
                    <span
                        className={[
                            'block h-[2px] w-6 rounded-full bg-white transition-all duration-300 origin-center',
                            menuOpen ? '-rotate-45 -translate-y-[7px]' : '',
                        ].join(' ')}
                    />
                </button>
            </nav>

            {/* ================= MICRO DECOR LINE ================= */}
            <div className="pointer-events-none mx-auto mt-3 h-px w-[120px] bg-gradient-to-r from-transparent via-[#F69E00]/50 to-transparent opacity-60" />

            {/* ================= MOBILE OVERLAY MENU ================= */}
            <div
                className={[
                    'pointer-events-auto fixed inset-0 z-40 md:hidden',
                    'flex flex-col items-center justify-center',
                    'bg-[#0B0B0B]/95 backdrop-blur-2xl',
                    'transition-all duration-500 ease-out',
                    menuOpen
                        ? 'opacity-100 visible'
                        : 'opacity-0 invisible',
                ].join(' ')}
            >
                <div className="flex flex-col items-center gap-8">
                    {NAV_ITEMS.map((item, i) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className={[
                                'font-heading text-2xl font-bold tracking-[0.15em] uppercase text-white/80',
                                'transition-all duration-500 hover:text-[#F69E00]',
                                menuOpen
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-4',
                            ].join(' ')}
                            style={{ transitionDelay: menuOpen ? `${150 + i * 80}ms` : '0ms' }}
                        >
                            {item.name}
                        </Link>
                    ))}

                    {/* Mobile CTA */}
                    <Link
                        href="#candidati"
                        onClick={() => setMenuOpen(false)}
                        className={[
                            'mt-4 transition-all duration-500',
                            menuOpen
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-4',
                        ].join(' ')}
                        style={{ transitionDelay: menuOpen ? `${150 + NAV_ITEMS.length * 80}ms` : '0ms' }}
                    >
                        <span className="inline-block rounded-full border border-[#F69E00]/50 bg-[#F69E00]/10 px-8 py-3 font-body text-[12px] font-semibold tracking-[0.28em] uppercase text-[#F69E00] transition-colors hover:bg-[#F69E00] hover:text-white">
                            Candidati
                        </span>
                    </Link>
                </div>

                {/* Subtle decor in mobile menu */}
                <div className="absolute bottom-12 flex items-center gap-4">
                    <span className="font-body text-[10px] tracking-[2px] text-white/25 uppercase">
                        @theitalians
                    </span>
                </div>
            </div>
        </header>
    );
}
