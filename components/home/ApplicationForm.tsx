'use client';

import { SectionNumber } from '../ui/SectionNumber';

export function ApplicationForm() {
    return (
        <section id="candidati" className="py-24 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24">

                <div>
                    <SectionNumber number="05" />
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-6">Raccontiamo la vostra storia?</h2>
                    <p className="text-text-muted text-lg mb-12 font-light">
                        Se credete che la vostra impresa meriti di essere raccontata, parliamone.
                    </p>

                    <div className="bg-bg-elevated border border-accent/20 p-8 rounded-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
                        <h4 className="text-white font-display text-xl italic mb-2">Nessun Costo.</h4>
                        <p className="text-sm text-text-subtle leading-relaxed">
                            Non è previsto alcun pagamento per la realizzazione del video.
                            Chiediamo solo la vostra collaborazione, disponibilità e autenticità.
                            Il nostro obiettivo è creare cultura d'impresa.
                        </p>
                    </div>
                </div>

                <div className="bg-bg-card p-4 md:p-6 border border-white/5 rounded-sm overflow-hidden">
                    <div className="w-full h-[600px] md:h-[700px]">
                        <iframe
                            src="https://form.asana.com/?k=B70srIf2zslDQP0oN0b2Hw&d=1206426076358288&embed=true"
                            className="w-full h-full border-0"
                            title="Modulo di Candidatura Asana"
                        />
                    </div>
                    {/* Asana Branding Footer - Optional */}
                    <div className="mt-2 text-center">
                        <a
                            href="https://asana.com/it?utm_source=embedded_form"
                            target="_blank"
                            rel="nofollow noopener"
                            className="text-[10px] text-text-subtle hover:text-white transition-colors uppercase tracking-widest"
                        >
                            Powered by Asana
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
