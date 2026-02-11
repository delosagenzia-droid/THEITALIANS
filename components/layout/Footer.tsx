import Link from 'next/link';

export function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[#0B0B0B] border-t border-white/5">
            {/* ================= BACKGROUND (premium) ================= */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Base depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0B0B0B] to-[#050505]" />

                {/* Accent spotlight */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(246,158,0,0.12),transparent_60%)]" />

                {/* Subtle grid */}
                <div className="absolute inset-0 opacity-[0.14]">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:72px_72px]" />
                    <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,#000_70%,transparent_100%)] bg-[#0B0B0B]" />
                </div>

                {/* Grain */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Decorative rings */}
                <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full border border-[#F69E00]/10" />
                <div className="absolute -bottom-56 -left-56 h-[620px] w-[620px] rounded-full border border-white/5" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:py-20">
                {/* ================= TOP GRID ================= */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    {/* Brand */}
                    <div className="md:col-span-4">
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-[#F69E00]" />
                            <h3 className="font-heading text-2xl font-semibold text-white tracking-tight">THE ITALIANS</h3>
                        </div>

                        <p className="mt-4 font-body text-white/65 text-sm leading-relaxed max-w-sm">
                            Raccontiamo le imprese italiane attraverso storytelling, produzione e distribuzione premium.
                        </p>

                        <p className="mt-7 font-body text-[11px] uppercase tracking-[0.28em] text-white/45">
                            Project by <span className="text-white/70">Riccardo Segna</span>{' '}
                            <span className="text-[#F69E00] mx-2">×</span>{' '}
                            <span className="text-white/70">Delos Lab</span>
                        </p>

                        {/* Contact badge */}
                        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2">
                            <span className="h-2 w-2 rounded-full bg-[#F69E00]" />
                            <a
                                href="mailto:info@theitalians.it"
                                className="font-body text-[11px] uppercase tracking-[0.24em] text-white/70 hover:text-white transition-colors"
                            >
                                info@theitalians.it
                            </a>
                        </div>
                    </div>

                    {/* Legal links */}
                    <div className="md:col-span-4">
                        <h4 className="font-heading text-white text-sm font-semibold uppercase tracking-[0.28em] mb-5">
                            Legal
                        </h4>

                        <ul className="space-y-3 text-sm">
                            {[
                                { href: '/privacy-policy', label: 'Privacy Policy' },
                                { href: '/cookie-policy', label: 'Cookie Policy' },
                                { href: '/termini-condizioni', label: 'Termini & Condizioni' },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="group inline-flex items-center gap-3 font-body text-white/60 hover:text-white transition-colors"
                                    >
                                        <span className="h-px w-6 bg-white/15 group-hover:bg-[#F69E00]/60 transition-colors" />
                                        <span className="relative">
                                            {item.label}
                                            <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#F69E00]/60 transition-all duration-500 group-hover:w-full" />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company details */}
                    <div className="md:col-span-4">
                        <h4 className="font-heading text-white text-sm font-semibold uppercase tracking-[0.28em] mb-5">
                            Dati societari
                        </h4>

                        <div className="space-y-5 text-sm leading-relaxed">
                            {/* DELOS */}
                            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                                <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-[#F69E00]/55 via-white/10 to-transparent opacity-80" />

                                <div className="text-white font-medium mb-2">Delos</div>
                                <div className="font-body text-white/60">
                                    P.IVA: <span className="text-white/70">16766711002</span>
                                    <br />
                                    Sede:{' '}
                                    <span className="text-white/70">
                                        Via Gaetano Donizetti 7/b, 00198, Roma (RM)
                                    </span>
                                    <br />

                                </div>
                            </div>

                            {/* RICCARDO */}
                            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                                <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-[#F69E00]/55 via-white/10 to-transparent opacity-80" />

                                <div className="text-white font-medium mb-2">Riccardo Segna</div>
                                <div className="font-body text-white/60">
                                    Dati fiscali e sede legale:{' '}
                                    <span className="text-white/70">inserire</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= BOTTOM BAR ================= */}
                <div className="mt-14 border-t border-white/5 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="font-body text-[11px] uppercase tracking-[0.28em] text-white/45">
                        © 2026 THE ITALIANS — All rights reserved
                    </div>

                    <div className="font-body text-[12px] text-white/55 leading-relaxed">
                        Per richieste, collaborazioni o candidature:{' '}
                        <a
                            href="mailto:info@theitalians.it"
                            className="text-white/70 hover:text-white transition-colors"
                        >
                            info@theitalians.it
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
