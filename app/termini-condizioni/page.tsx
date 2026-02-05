import { SectionNumber } from '@/components/ui/SectionNumber';

export default function TermsConditions() {
    return (
        <section className="py-32 bg-bg px-6">
            <div className="max-w-3xl mx-auto">
                <div className="mb-12">
                    <SectionNumber number="Legal" className="mb-4" />
                    <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Termini e Condizioni</h1>
                </div>

                <div className="space-y-12 text-text-muted leading-relaxed font-light">
                    <div>
                        <h2 className="text-white font-display text-2xl mb-4">1. Accettazione dei Termini</h2>
                        <p>
                            Utilizzando il sito THE ITALIANS, l'utente accetta di essere vincolato dai presenti Termini e Condizioni. Se non si accettano tali termini, si prega di non utilizzare il sito.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-display text-2xl mb-4">2. Proprietà Intellettuale</h2>
                        <p>
                            Tutti i contenuti presenti sul sito (testi, grafica, logo, immagini, video, audio) sono di proprietà esclusiva di <strong>Delos Lab</strong> e sono protetti dalle leggi sul diritto d'autore e sulla proprietà intellettuale. È vietata qualsiasi riproduzione non autorizzata.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-display text-2xl mb-4">3. Uso del Sito</h2>
                        <p>
                            È vietato utilizzare il sito per scopi illegali o che possano danneggiare, disabilitare o sovraccaricare il server. L'utente si impegna a fornire informazioni veritiere in fase di candidatura.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-display text-2xl mb-4">4. Limitazione di Responsabilità</h2>
                        <p>
                            Il sito è fornito "così com'è". Non garantiamo che il sito sarà privo di errori o interruzioni. Non saremo responsabili per eventuali danni diretti o indiretti derivanti dall'uso del sito.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-display text-2xl mb-4">5. Modifiche</h2>
                        <p>
                            Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. Le modifiche saranno efficaci dal momento della pubblicazione sul sito.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
