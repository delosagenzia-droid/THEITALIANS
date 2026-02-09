import { SectionNumber } from '@/components/ui/SectionNumber';

export default function PrivacyPolicy() {
    return (
        <section className="py-32 bg-bg px-6">
            <div className="max-w-3xl mx-auto">
                <div className="mb-12">
                    <SectionNumber number="Info" className="mb-4" />
                    <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">Privacy Policy</h1>
                    <p className="text-text-muted">Ultimo aggiornamento: 05/02/2026</p>
                </div>

                <div className="space-y-12 text-text-muted leading-relaxed font-light">
                    <div>
                        <h2 className="text-white font-heading font-semibold text-2xl mb-4">1. Titolare del Trattamento</h2>
                        <p>
                            Il Titolare del Trattamento dei dati è <strong>Delos Lab</strong> (o la società che gestisce il marchio THE ITALIANS).
                            <br />Per qualsiasi informazione è possibile contattarci all'email riservata: privacy@theitalians.com
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-heading font-semibold text-2xl mb-4">2. Tipologia di Dati Raccolti</h2>
                        <p className="mb-4">Raccogliamo i seguenti dati personali:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Dati forniti volontariamente:</strong> Nome, Cognome, Email, Nome Azienda e altri dati inseriti nel form di candidatura.</li>
                            <li><strong>Dati di navigazione:</strong> Indirizzi IP, tipo di browser, orari di accesso (tramite cookie).</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-white font-heading font-semibold text-2xl mb-4">3. Finalità del Trattamento</h2>
                        <p>I dati vengono trattati per:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Valutare la candidatura per la partecipazione al format.</li>
                            <li>Rispondere alle richieste di contatto.</li>
                            <li>Analizzare statistiche aggregate di utilizzo del sito (se acconsentito).</li>
                            <li>Adempiere ad obblighi legali e fiscali.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-white font-heading font-semibold text-2xl mb-4">4. Base Giuridica</h2>
                        <p>
                            Il trattamento si basa sul <strong>consenso</strong> dell'utente (per marketing e cookie non necessari) e sull'esecuzione di misure precontrattuali (valutazione candidatura).
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-heading font-semibold text-2xl mb-4">5. Conservazione dei Dati</h2>
                        <p>
                            I dati delle candidature vengono conservati per il tempo strettamente necessario alla valutazione e comunque non oltre 24 mesi dalla ricezione, salvo diversa richiesta dell'interessato o instaurazione di rapporto professionale.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-heading font-semibold text-2xl mb-4">6. Diritti dell'Utente</h2>
                        <p>
                            In conformità al GDPR (Reg. UE 2016/679), hai il diritto di chiedere l'accesso, la rettifica, la cancellazione dei dati, la limitazione del trattamento o di oppirti allo stesso. Puoi esercitare questi diritti scrivendo a privacy@theitalians.com.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
