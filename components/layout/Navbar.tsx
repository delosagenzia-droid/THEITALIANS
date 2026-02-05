import Link from 'next/link';
import { Button } from '../ui/Button';

export function Navbar() {
    return (
        <header className="fixed top-0 w-full z-50 px-6 py-6 pointer-events-none">
            <nav className="max-w-7xl mx-auto h-16 flex items-center justify-between px-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] pointer-events-auto transition-all duration-500 hover:border-white/20">

                {/* Logo con effetto Hover Glow */}
                <Link
                    href="/"
                    className="group relative font-display text-xl tracking-[0.2em] text-white flex items-center gap-2"
                >
                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <span className="group-hover:text-accent transition-colors duration-300">
                        THE ITALIANS
                    </span>
                </Link>

                {/* Navigazione Centrale con Indicatori Minimali */}
                <div className="hidden md:flex items-center gap-10">
                    {[
                        { name: 'Format', href: '#format' },
                        { name: 'Storie', href: '#storie' },
                        { name: 'Team', href: '#team' }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="relative text-[11px] font-display font-medium tracking-[0.2em] uppercase text-white/50 hover:text-white transition-all duration-300 group"
                        >
                            {item.name}
                            {/* Linea decorativa sotto il link */}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Azione Finale: Pulsante High-End */}
                <div className="flex items-center gap-6">
                    <Link href="#candidati">
                        <Button
                            variant="ghost"
                            className="relative overflow-hidden group border border-accent/30 hover:border-accent transition-colors rounded-full px-6 py-2"
                        >
                            <span className="relative z-10 text-[11px] font-display tracking-[0.2em] uppercase text-white">
                                Candidati
                            </span>
                            {/* Effetto riempimento al passaggio del mouse */}
                            <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
                        </Button>
                    </Link>
                </div>

            </nav>

            {/* Sottile linea di progresso o decorazione opzionale sotto la nav */}
            <div className="max-w-[100px] mx-auto h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent mt-2 opacity-50" />
        </header>
    );
}