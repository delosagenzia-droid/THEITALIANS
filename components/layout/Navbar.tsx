import Link from 'next/link';
import { Button } from '../ui/Button';

export function Navbar() {
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
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#F69E00] opacity-70 animate-ping" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#F69E00]" />
                    </span>

                    <span className="transition-colors duration-300 group-hover:text-[#F69E00]">
                        THE ITALIANS
                    </span>
                </Link>

                {/* ================= NAV LINKS ================= */}
                <div className="hidden md:flex items-center gap-12">
                    {[
                        { name: 'Chi Siamo', href: '/chi-siamo' },
                        { name: 'Storie', href: '/storie' },
                        { name: 'Candidati', href: '/candidati' },
                    ].map((item) => (
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

                {/* ================= CTA ================= */}
                <div className="flex items-center gap-6">
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
            </nav>

            {/* ================= MICRO DECOR LINE ================= */}
            <div className="pointer-events-none mx-auto mt-3 h-px w-[120px] bg-gradient-to-r from-transparent via-[#F69E00]/50 to-transparent opacity-60" />
        </header>
    );
}
