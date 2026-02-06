import { SectionNumber } from '../ui/SectionNumber';

export function Team() {
    return (
        <section id="team" className="py-32 bg-bg-elevated relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                    <div className="max-w-2xl">
                        <SectionNumber number="04" className="mb-6" />
                        <h2 className="font-display text-5xl md:text-7xl text-white leading-none tracking-tight">
                            Chi <span className="text-accent italic font-light">Siamo.</span>
                        </h2>
                    </div>
                    <p className="text-text-muted text-lg max-w-md font-light border-l border-white/10 pl-6 text-justify">
                        THE ITALIANS nasce dall'unione tra storytelling umano e struttura produttiva solida. Un progetto editoriale che entra nelle aziende per dare voce a chi le costruisce ogni giorno.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                    {/* RICCARDO SEGNA */}
                    <div className="group">
                        <div className="relative aspect-[3/4] w-full max-w-sm mx-auto bg-black mb-8 overflow-hidden rounded-sm">
                            <img
                                src="/riccardo-segna.jpg"
                                alt="Riccardo Segna"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="text-accent text-xs font-mono mb-2 track-widest">CONTENT CREATOR</div>
                                <h3 className="text-3xl font-display text-white">Riccardo Segna</h3>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <p className="text-text-subtle leading-relaxed font-light">
                                Il volto del progetto e l'intervistatore. Racconta persone e imprese con uno stile diretto, umano e spontaneo. Le sue interviste sono autentiche, mai costruite, e mettono al centro le storie, i valori e le persone dietro le aziende.
                            </p>

                            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                                <a href="https://instagram.com/riccardosegna" target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
                                    <div className="text-xl text-white font-display">155k</div>
                                    <div className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Instagram</div>
                                </a>
                                <a href="https://tiktok.com/@riccardosegna" target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
                                    <div className="text-xl text-white font-display">330k+</div>
                                    <div className="text-[10px] text-text-muted uppercase tracking-widest mt-1">TikTok</div>
                                </a>
                                <div>
                                    <div className="text-xl text-white font-display">30M+</div>
                                    <div className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Views</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DELOS LAB */}
                    <div className="group md:mt-24">
                        <div className="relative aspect-[3/4] w-full max-w-sm mx-auto bg-[#0a0a0a] mb-8 overflow-hidden rounded-sm border border-white/5 group-hover:border-accent/20 transition-colors duration-500">
                            <img
                                src="/delos-lab.png"
                                alt="Delos Lab"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="text-accent text-xs font-mono mb-2 track-widest">PRODUCTION PARTNER</div>
                                <h3 className="text-3xl font-display text-white">Delos Lab</h3>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <p className="text-text-subtle leading-relaxed font-light">
                                Il team creativo e produttivo che cura la regia, la produzione e la post-produzione. Trasforma le storie in contenuti coerenti, curati e strategici, mantenendo uno stile cinematografico e professionale.
                            </p>

                            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                                <div>
                                    <div className="text-xl text-white font-display">4B+</div>
                                    <div className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Views Gen.</div>
                                </div>
                                <div>
                                    <div className="text-xl text-white font-display">5M+</div>
                                    <div className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Followers</div>
                                </div>
                                <div>
                                    <div className="text-xl text-white font-display">Data</div>
                                    <div className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Driven</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-24 text-center">
                    <p className="text-2xl md:text-3xl font-display text-white italic opacity-80 max-w-3xl mx-auto">
                        "Due visioni diverse, un solo racconto: quello delle imprese italiane."
                    </p>
                </div>
            </div>
        </section>
    );
}
