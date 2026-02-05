import { SectionNumber } from '@/components/ui/SectionNumber';

export default function CookiePolicy() {
    return (
        <section className="py-32 bg-bg px-6">
            <div className="max-w-3xl mx-auto">
                <div className="mb-12">
                    <SectionNumber number="Cookie" className="mb-4" />
                    <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Cookie Policy</h1>
                </div>

                <div className="space-y-12 text-text-muted leading-relaxed font-light">
                    <div>
                        <h2 className="text-white font-display text-2xl mb-4">Cosa sono i Cookie</h2>
                        <p>
                            I cookie sono piccoli file di testo che i siti visitati inviano al terminale dell'utente, dove vengono memorizzati per essere ritrasmessi agli stessi siti alla visita successiva.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-display text-2xl mb-4">Tipologie di Cookie Utilizzati</h2>

                        <div className="space-y-6 mt-6">
                            <div className="bg-bg-card p-6 border border-white/5 rounded-sm">
                                <h3 className="text-white font-medium mb-2">Cookie Tecnici (Necessari)</h3>
                                <p className="text-sm">
                                    Indispensabili per il corretto funzionamento del sito e per salvare le tue preferenze di navigazione (incluso il consenso ai cookie). Non richiedono consenso preventivo.
                                </p>
                            </div>

                            <div className="bg-bg-card p-6 border border-white/5 rounded-sm">
                                <h3 className="text-white font-medium mb-2">Cookie Analitici</h3>
                                <p className="text-sm">
                                    Utilizzati per raccogliere informazioni, in forma aggregata, sul numero degli utenti e su come questi visitano il sito stesso (es. Google Analytics 4).
                                </p>
                            </div>

                            <div className="bg-bg-card p-6 border border-white/5 rounded-sm">
                                <h3 className="text-white font-medium mb-2">Cookie di Profilazione/Marketing</h3>
                                <p className="text-sm">
                                    Volti a creare profili relativi all'utente e utilizzati al fine di inviare messaggi pubblicitari in linea con le preferenze manifestate dallo stesso nell'ambito della navigazione in rete.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-white font-display text-2xl mb-4">Gestione dei Cookie</h2>
                        <p>
                            Puoi modificare le tue preferenze in qualsiasi momento cliccando sul banner in basso o attraverso le impostazioni del tuo browser.
                        </p>
                        <p className="mt-4 text-sm text-text-subtle">
                            Per disabilitare i cookie direttamente dal browser:<br />
                            Chrome: Impostazioni → Privacy e sicurezza → Cookie<br />
                            Safari: Preferenze → Privacy<br />
                            Firefox: Opzioni → Privacy & Sicurezza
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
