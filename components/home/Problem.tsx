'use client';

import { SectionNumber } from '../ui/SectionNumber';

export function Problem() {
    return (
        <section className="py-24 md:py-40 relative overflow-hidden bg-[#050505]">

            {/* --- ELEMENTI 3D ANIMATI DI BACKGROUND --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Sfera 3D Soft 1 */}
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] animate-pulse" />

                {/* Sfera 3D Moving 2 */}
                <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] animate-[float-complex_15s_ease-in-out_infinite]" />

                {/* Grid Pattern Professionale */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

                {/* Colonna Testo */}
                <div className="relative">
                    <div className="inline-block mb-8 translate-y-[-10px]">
                        <SectionNumber number="01" />
                    </div>

                    <h2 className="font-display text-5xl md:text-7xl text-white mb-10 leading-[1] tracking-tight">
                        Perché esiste <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-accent/50">
                            questo progetto?
                        </span>
                    </h2>

                    <div className="space-y-8 max-w-xl">
                        <p className="text-text-muted text-xl font-light leading-relaxed">
                            L'Italia è la culla di <span className="text-white font-normal">imprese straordinarie.</span>. Realtà imprenditoriali che costruiscono valore ogni giorno, ma restano intrappolate in una comunicazione invisibile.
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-accent/60 to-transparent" />
                            <span className="text-accent text-xs uppercase tracking-[0.3em] font-bold">The Problem</span>
                        </div>

                        <p className="text-text-muted text-lg font-light leading-relaxed">
                            Il valore di un brand oggi non risiede solo in ciò che produce, ma nella <span className="text-white italic">capacità di emozionare</span> attraverso uno schermo. Senza video, la tua storia non esiste.
                        </p>

                        <div className="relative group/card">
                            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-transparent rounded-lg blur opacity-25 group-hover/card:opacity-50 transition duration-1000"></div>
                            <div className="relative bg-white/[0.03] border border-white/10 p-8 rounded-lg backdrop-blur-md">
                                <p className="text-white text-lg font-light leading-snug">
                                    <span className="text-accent font-bold text-2xl leading-none block mb-2">“</span>
                                    Diamo <span className="text-accent">potenza cinematografica</span> alle imprese italiane. Non facciamo video, costruiamo eredità visive.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Colonna Video: Mockup Professionale */}
                <div className="relative group">
                    {/* Glow dietro il video che reagisce al mouse */}
                    <div className="absolute -inset-10 bg-accent/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    {/* Frame del video tipo "Monitor High-End" */}
                    <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/20 ring-1 ring-white/10">

                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-black/40 z-10 pointer-events-none" />

                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                        >
                            <source src="https://assets.mixkit.co/videos/preview/mixkit-artisan-leather-worker-at-work-40040-large.mp4" type="video/mp4" />
                        </video>

                        {/* Controlli estetici tipo interfaccia camera */}
                        <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between pointer-events-none">
                            <div className="flex justify-between items-start opacity-50 group-hover:opacity-100 transition-opacity">
                                <div className="border-t border-l w-4 h-4 border-white/40" />
                                <div className="text-[10px] text-white/60 font-mono tracking-widest uppercase">Rec ● 4K RAW</div>
                                <div className="border-t border-r w-4 h-4 border-white/40" />
                            </div>

                            <div className="flex justify-between items-end">
                                <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded border border-white/10">
                                    <p className="text-white font-display text-lg italic">The Italians</p>
                                    <p className="text-[9px] text-accent tracking-[0.2em] uppercase font-bold">Production 2026</p>
                                </div>
                                <div className="border-b border-r w-4 h-4 border-white/40 opacity-50 group-hover:opacity-100" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}