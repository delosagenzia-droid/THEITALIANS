import { supabase } from '@/lib/supabase';
import { SectionNumber } from '../ui/SectionNumber';

export async function Team() {
    const { data: members } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

    if (!members || members.length === 0) return null;

    return (
        <section id="team" className="py-24 bg-bg-elevated">
            <div className="max-w-7xl mx-auto px-6">
                <SectionNumber number="04" />
                <h2 className="font-display text-4xl md:text-5xl text-white mb-16">Chi Siamo</h2>

                <div className="grid md:grid-cols-2 gap-12">
                    {members.map((member) => (
                        <div key={member.id} className="group">
                            <div className="relative h-96 w-full bg-bg-card mb-6 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/5">
                                {member.avatar_url && (
                                    <img
                                        src={member.avatar_url}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                {/* Placeholder texture if no image */}
                                {!member.avatar_url && (
                                    <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-neutral-800 font-display text-9xl opacity-20 select-none">
                                        {member.name.charAt(0)}
                                    </div>
                                )}
                            </div>

                            <h3 className="text-2xl text-white font-display">{member.name}</h3>
                            <p className="text-accent text-xs uppercase tracking-widest mb-4">{member.role}</p>
                            <p className="text-text-muted leading-relaxed max-w-md text-sm">
                                {member.bio}
                            </p>

                            {member.instagram && (
                                <a href={`https://instagram.com/${member.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-text-subtle hover:text-white transition-colors text-xs uppercase tracking-widest">
                                    {member.instagram}
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
