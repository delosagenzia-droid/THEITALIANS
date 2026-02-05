import { createClient } from '@/lib/supabase-server';
import { Button } from '@/components/ui/Button';
import { StatusSelector } from '@/components/admin/StatusSelector';
import Link from 'next/link';

export default async function AdminDashboard({
    searchParams,
}: {
    searchParams: Promise<{ status?: string }>;
}) {
    const supabase = await createClient();
    const { status } = await searchParams;
    const currentStatus = status || 'all';

    let query = supabase
        .from('applications')
        .select('*')
        .order('submitted_at', { ascending: false });

    if (currentStatus !== 'all') {
        // Map tabs to statuses
        if (currentStatus === 'inbox') {
            query = query.in('status', ['new', 'reviewing']);
        } else if (currentStatus === 'archive') {
            query = query.in('status', ['rejected', 'completed']);
        } else if (currentStatus === 'contacted') {
            // "In Corso" now includes Contacted AND Scheduled
            query = query.in('status', ['contacted', 'scheduled']);
        }
    }

    const { data: applications, error } = await query;

    if (error) {
        return <div className="text-white p-8 pt-32">Errore caricamento dati: {error.message}</div>;
    }

    const tabs = [
        { id: 'all', label: 'Tutti' },
        { id: 'inbox', label: 'Da Leggere' },
        { id: 'contacted', label: 'In Corso' },
        { id: 'archive', label: 'Archivio' },
    ];

    return (
        <div className="min-h-screen bg-bg p-8 pt-32">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <p className="text-text-subtle text-xs uppercase tracking-widest mb-1">Admin Panel</p>
                        <h1 className="text-3xl font-display text-white">Candidature</h1>
                    </div>
                    <form action="/auth/signout" method="post">
                        <Button size="sm" variant="outline">Logout</Button>
                    </form>
                </div>

                {/* TABS OF FILTERS */}
                <div className="flex gap-2 mb-8 border-b border-white/10 pb-4">
                    {tabs.map(tab => (
                        <Link key={tab.id} href={`/admin/dashboard?status=${tab.id}`}>
                            <div className={`
                        px-4 py-2 text-sm font-medium rounded-sm transition-colors cursor-pointer
                        ${currentStatus === tab.id
                                    ? 'bg-white text-bg'
                                    : 'text-text-muted hover:text-white hover:bg-white/5'}
                    `}>
                                {tab.label}
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="bg-bg-card border border-white/5 rounded-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="p-4 text-xs uppercase tracking-widest text-text-subtle font-medium w-32">Data</th>
                                <th className="p-4 text-xs uppercase tracking-widest text-text-subtle font-medium">Azienda</th>
                                <th className="p-4 text-xs uppercase tracking-widest text-text-subtle font-medium">Contatto</th>
                                <th className="p-4 text-xs uppercase tracking-widest text-text-subtle font-medium w-48">Stato</th>
                                <th className="p-4 text-xs uppercase tracking-widest text-text-subtle font-medium w-24">Azioni</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {applications?.map((app: any) => (
                                <tr key={app.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="p-4 text-text-muted text-sm font-mono">
                                        {new Date(app.submitted_at).toLocaleDateString('it-IT')}
                                    </td>
                                    <td className="p-4">
                                        <div className="text-white font-medium text-lg">{app.company_name}</div>
                                        <div className="text-xs text-text-subtle mt-1">{app.sector} — {app.location}</div>
                                    </td>
                                    <td className="p-4 text-text-muted text-sm">
                                        <div className="text-white">{app.contact_email}</div>
                                        <div className="text-xs text-text-subtle opacity-0 group-hover:opacity-100 transition-opacity">Clicca per copiare</div>
                                    </td>
                                    <td className="p-4">
                                        <StatusSelector id={app.id} currentStatus={app.status || 'new'} />
                                    </td>
                                    <td className="p-4">
                                        <Button size="sm" variant="ghost" className="text-xs px-3 py-2 h-auto opacity-50 group-hover:opacity-100">
                                            APRI
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {(!applications || applications.length === 0) && (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-text-muted flex flex-col items-center justify-center">
                                        <span className="text-2xl mb-2 opacity-20">📭</span>
                                        Nessuna candidatura in questa sezione.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
