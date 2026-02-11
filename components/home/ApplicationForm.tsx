'use client';

import { SectionNumber } from '../ui/SectionNumber';

export function ApplicationForm() {
    return (
        <section id="candidati" className="relative overflow-hidden bg-[#0B0B0B] py-24 md:py-32">
            {/* ================= BACKGROUND (premium black) ================= */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Base depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0B0B0B] to-[#050505]" />

                {/* Accent spotlight */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(246,158,0,0.14),transparent_60%)]" />

                {/* Side glow (right) */}
                <div className="absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[#F69E00]/10 blur-[140px]" />

                {/* Editorial grid */}
                <div className="absolute inset-0 opacity-[0.18]">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px]" />
                    <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_70%,transparent_100%)] bg-[#0B0B0B]" />
                </div>

                {/* Grain */}
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Decorative rings */}
                <div className="absolute -bottom-56 -left-56 h-[600px] w-[600px] rounded-full border border-white/5" />
                <div className="absolute -bottom-40 -left-40 h-[460px] w-[460px] rounded-full border border-[#F69E00]/10" />
            </div>

            <div className="relative z-10 mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-24">
                {/* ================= LEFT: COPY ================= */}
                <div>
                    <SectionNumber number="05" />

                    <h2 className="mt-6 font-heading font-bold text-[clamp(2.2rem,3.6vw,3.2rem)] leading-[1.05] tracking-tight text-white">
                        Raccontiamo la vostra storia?
                    </h2>

                    <p className="mt-5 max-w-xl font-body text-lg font-light leading-relaxed text-white/65">
                        Se credete che la vostra impresa meriti di essere raccontata, parliamone.
                    </p>

                    {/* Info box (manifesto style) */}
                    <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
                        {/* Accent top line */}
                        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-[#F69E00]/55 via-white/10 to-transparent opacity-80" />
                        {/* Accent side mark */}
                        <div className="absolute left-0 top-0 h-full w-[3px] bg-[#F69E00]" />

                        {/* Glow */}
                        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[520px] -translate-x-1/2 rounded-full bg-[#F69E00]/10 blur-[70px] opacity-60" />

                        <div className="relative">
                            <div className="inline-flex items-center gap-3 rounded-full border border-[#F69E00]/25 bg-[#F69E00]/10 px-4 py-2">
                                <span className="h-2 w-2 rounded-full bg-[#F69E00]" />
                                <span className="font-body text-[11px] font-semibold tracking-[0.28em] uppercase text-[#F69E00]">
                                    Nessun Costo
                                </span>
                            </div>

                            <h4 className="mt-5 font-heading text-xl md:text-2xl font-bold italic text-white">
                                Un progetto editoriale, non una vendita.
                            </h4>

                            <p className="mt-3 font-body text-[15px] md:text-[16px] font-light leading-relaxed text-white/65">
                                Non è previsto alcun pagamento per la realizzazione del video. Chiediamo solo collaborazione,
                                disponibilità e autenticità. Il nostro obiettivo è creare cultura d’impresa.
                            </p>

                            {/* Micro bullets (adds professional clarity) */}
                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                <div className="flex items-start gap-3">
                                    <span className="mt-2 h-2 w-2 rounded-full bg-[#F69E00]" />
                                    <p className="font-body text-[13px] text-white/55 leading-relaxed">
                                        Riprese snelle, impatto alto.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="mt-2 h-2 w-2 rounded-full bg-[#F69E00]" />
                                    <p className="font-body text-[13px] text-white/55 leading-relaxed">
                                        Racconto autentico, stile cinematografico.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Optional: small trust line */}
                    <p className="mt-8 font-body text-[12px] tracking-[0.24em] uppercase text-white/35">
                        Selezione limitata · Qualità editoriale · Produzione 2026
                    </p>
                </div>

                {/* ================= RIGHT: ASANA EMBED (premium frame) ================= */}
                <div className="relative">
                    {/* Accent glow behind panel */}
                    <div className="absolute -inset-10 rounded-3xl bg-[#F69E00]/10 blur-[90px] opacity-50" />

                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-[0_35px_110px_rgba(0,0,0,0.70)]">
                        {/* Top bar (premium browser-like) */}
                        <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-5 py-4">
                            <div className="flex items-center gap-2">
                                <div className="h-2.5 w-2.5 rounded-full bg-white/25" />
                                <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
                                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="font-body text-[10px] tracking-[0.28em] uppercase text-white/45">
                                    Application Form
                                </span>
                                <span className="h-1 w-1 rounded-full bg-[#F69E00]" />
                            </div>

                            <div className="h-6 w-24 rounded-full border border-white/10 bg-white/[0.02]" />
                        </div>

                        {/* Iframe */}
                        <div className="w-full h-[620px] md:h-[740px]">
                            <iframe
                                src="https://form.asana.com/?k=B70srIf2zslDQP0oN0b2Hw&d=1206426076358288&embed=true"
                                className="w-full h-full border-0"
                                title="Modulo di Candidatura Asana"
                                loading="lazy"
                            />
                        </div>

                        {/* Footer */}
                        <div className="border-t border-white/10 bg-black/30 px-6 py-4 text-center">
                            <a
                                href="https://asana.com/it?utm_source=embedded_form"
                                target="_blank"
                                rel="nofollow noopener"
                                className="font-body text-[10px] uppercase tracking-[0.28em] text-white/40 hover:text-white/70 transition-colors"
                            >
                                Powered by Asana
                            </a>
                        </div>
                    </div>

                    {/* Small note under panel */}
                    <p className="mt-4 text-center font-body text-[12px] text-white/45">
                        Compila in 2 minuti — ti rispondiamo appena valutata la candidatura.
                    </p>
                </div>
            </div>
        </section>
    );
}
