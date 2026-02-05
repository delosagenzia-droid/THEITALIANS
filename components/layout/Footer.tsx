import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-bg-elevated border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Top grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                    {/* Brand */}
                    <div className="md:col-span-4">
                        <h3 className="font-display text-2xl text-white mb-2">THE ITALIANS</h3>
                        <p className="text-text-subtle text-sm leading-relaxed">
                            Raccontiamo le imprese italiane attraverso storytelling, produzione e distribuzione premium.
                        </p>

                        {/* Small note */}
                        <p className="text-text-muted text-xs mt-6 uppercase tracking-widest">
                            Project by Riccardo Segna × Delos Lab
                        </p>
                    </div>

                    {/* Legal links */}
                    <div className="md:col-span-4">
                        <h4 className="font-display text-white text-sm font-medium uppercase tracking-widest mb-4">
                            Legal
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="text-text-subtle hover:text-white transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cookie-policy"
                                    className="text-text-subtle hover:text-white transition-colors"
                                >
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/termini-condizioni"
                                    className="text-text-subtle hover:text-white transition-colors"
                                >
                                    Termini & Condizioni
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company details */}
                    <div className="md:col-span-4">
                        <h4 className="font-display text-white text-sm font-medium uppercase tracking-widest mb-4">
                            Dati societari
                        </h4>

                        <div className="space-y-5 text-sm leading-relaxed">
                            {/* DELOS */}
                            <div className="rounded-2xl border border-white/5 bg-black/10 p-5">
                                <div className="text-white font-medium mb-2">Delos</div>
                                <div className="text-text-subtle">
                                    P.IVA: <span className="text-text-muted">16766711002</span>
                                    <br />
                                    Sede: <span className="text-text-muted">Via Gaetano Donizetti 7/b, 00198, Roma (RM)</span>
                                    <br />
                                    Cap. Sociale: <span className="text-text-muted">€10.000,00</span>
                                </div>
                            </div>

                            {/* RICCARDO (placeholder) */}
                            <div className="rounded-2xl border border-white/5 bg-black/10 p-5">
                                <div className="text-white font-medium mb-2">Riccardo Segna</div>
                                <div className="text-text-subtle">
                                    {/* TODO: Inserire ragione sociale e dati completi */}
                                    Dati fiscali e sede legale: <span className="text-text-muted">inserire</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-12 border-t border-white/5 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="text-text-subtle text-xs uppercase tracking-widest">
                        © 2026 THE ITALIANS — All rights reserved
                    </div>

                    <div className="text-text-muted text-xs leading-relaxed">
                        Per richieste, collaborazioni o candidature:{" "}
                        <span className="text-text-subtle">info@theitalians.it</span>
                        {/* se vuoi lo trasformo in mailto */}
                    </div>
                </div>
            </div>
        </footer>
    );
}

