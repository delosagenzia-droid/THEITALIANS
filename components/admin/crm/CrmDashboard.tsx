'use client'

import { useState, useTransition, useMemo } from 'react'
import Link from 'next/link'
import type { OutreachContact, OutreachTask, ContactStatus, TaskType } from '@/app/admin/crm/actions'
import {
    updateContactStatus,
    updateContact,
    createContact,
    createTask,
    toggleTask,
    deleteTask,
} from '@/app/admin/crm/actions'

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const GOLD = '#F69E00'

const STATUS_CFG: Record<ContactStatus, { color: string; bg: string; dot: string }> = {
    'Da Contattare': { color: '#666', bg: '#1A1A1A', dot: '#555' },
    'Contattato': { color: '#F69E00', bg: '#2A2000', dot: '#F69E00' },
    'Follow Up': { color: '#A855F7', bg: '#2B1A3A', dot: '#A855F7' },
    'In Trattativa': { color: '#3B9EFF', bg: '#001830', dot: '#3B9EFF' },
    'Confermato': { color: '#22C55E', bg: '#001A0D', dot: '#22C55E' },
    'Declinato': { color: '#EF4444', bg: '#1A0000', dot: '#EF4444' },
}

const PRIORITY_ORDER: Record<string, number> = { Alta: 0, Media: 1, Bassa: 2 }

const SECTOR_OPTIONS = [
    'Ristorazione', 'Artigianato', 'Moda', 'Boutique', 'Gioielleria',
    'Food & Beverage', 'Hospitality', 'Design', 'Pelletteria',
    'Manifattura', 'Tech', 'Automazione', 'Agricoltura',
    'Cosmetica', 'Automotive', 'Edilizia', 'Energia',
    'Logistica', 'Servizi', 'Altro',
]

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ContactStatus }) {
    const c = STATUS_CFG[status]
    return (
        <span className="inline-flex items-center gap-1.5 rounded px-2.5 py-0.5 text-xs font-semibold tracking-wide"
            style={{ background: c.bg, color: c.color, border: `1px solid ${c.color}30` }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.dot }} />
            {status}
        </span>
    )
}

function PriorityDots({ p }: { p: string }) {
    const colors = { Alta: '#EF4444', Media: GOLD, Bassa: '#22C55E' }
    const filled = { Alta: 3, Media: 2, Bassa: 1 }[p] || 1
    const color = colors[p as keyof typeof colors] || '#888'
    return (
        <span className="flex gap-0.5">
            {[1, 2, 3].map(i => (
                <span key={i} className="w-2 h-2 rounded-sm"
                    style={{ background: i <= filled ? color : '#333' }} />
            ))}
        </span>
    )
}

function Stat({ val, label, color = '#fff' }: { val: number | string; label: string; color?: string }) {
    return (
        <div className="rounded-xl p-5" style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}>
            <div className="text-4xl font-bold tracking-tight" style={{ color }}>{val}</div>
            <div className="text-xs text-neutral-500 mt-1 font-medium">{label}</div>
        </div>
    )
}

// ─── MODAL ───────────────────────────────────────────────────────────────────

function Modal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.87)' }} onClick={onClose}>
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-8"
                style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', boxShadow: '0 40px 80px rgba(0,0,0,0.8)' }}
                onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="mb-3">
            <label className="block text-xs font-semibold tracking-widest text-neutral-500 mb-1.5">{label.toUpperCase()}</label>
            {children}
        </div>
    )
}

const inputCls = "w-full rounded-lg px-3.5 py-2.5 text-sm text-white outline-none focus:ring-1"
const inputStyle = { background: '#111', border: '1px solid #2A2A2A' }

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

type Stats = Awaited<ReturnType<typeof import('@/app/admin/crm/actions').getCrmStats>>
type TaskWithContact = OutreachTask & { outreach_contacts: { company_name: string; status: string } | null }

interface Props {
    initialStats: Stats
    initialContacts: OutreachContact[]
    initialTasks: TaskWithContact[]
}

export function CrmDashboard({ initialStats, initialContacts, initialTasks }: Props) {
    const [tab, setTab] = useState<'overview' | 'database' | 'daily' | 'pipeline' | 'followup'>('overview')
    const [contacts, setContacts] = useState(initialContacts)
    const [tasks, setTasks] = useState(initialTasks)
    const [stats, setStats] = useState(initialStats)
    const [selectedContact, setSelectedContact] = useState<OutreachContact | null>(null)
    const [showAddContact, setShowAddContact] = useState(false)
    const [showAddTask, setShowAddTask] = useState(false)
    const [, startTransition] = useTransition()

    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState('Tutti')
    const [filterLista, setFilterLista] = useState('Tutti')
    const [filterPriority, setFilterPriority] = useState('Tutte')
    const [filterSector, setFilterSector] = useState('Tutti')
    const [sortBy, setSortBy] = useState<'priority' | 'name' | 'status'>('priority')

    const uniqueSectors = useMemo(() => {
        const sectors = contacts.map(c => c.sector || c.category).filter(Boolean) as string[]
        return [...new Set(sectors)].sort()
    }, [contacts])

    const [newContact, setNewContact] = useState<Partial<OutreachContact>>({
        status: 'Da Contattare', priority: 'Media', lista: 'B2B',
    })

    const [newTask, setNewTask] = useState({
        contact_id: '', type: 'Email' as TaskType,
        due_date: new Date().toISOString().split('T')[0], note: '',
    })

    const today = new Date().toISOString().split('T')[0]

    // ─── Filtered + sorted contacts ──────────────────────────────────────────

    const filtered = useMemo(() => {
        return contacts
            .filter(c => {
                const q = search.toLowerCase()
                const ms = !q || c.company_name.toLowerCase().includes(q) ||
                    (c.city || '').toLowerCase().includes(q) ||
                    (c.sector || '').toLowerCase().includes(q) ||
                    (c.contact_name || '').toLowerCase().includes(q)
                const mSt = filterStatus === 'Tutti' || c.status === filterStatus
                const mL = filterLista === 'Tutti' || c.lista === filterLista
                const mP = filterPriority === 'Tutte' || c.priority === filterPriority
                const mSec = filterSector === 'Tutti' || c.sector === filterSector || c.category === filterSector
                return ms && mSt && mL && mP && mSec
            })
            .sort((a, b) => {
                if (sortBy === 'priority') return (PRIORITY_ORDER[a.priority] || 1) - (PRIORITY_ORDER[b.priority] || 1)
                if (sortBy === 'name') return a.company_name.localeCompare(b.company_name)
                if (sortBy === 'status') return a.status.localeCompare(b.status)
                return 0
            })
    }, [contacts, search, filterStatus, filterLista, filterPriority, filterSector, sortBy])

    const todayTasks = tasks.filter(t => t.due_date === today)
    const overdueTasks = tasks.filter(t => t.due_date < today && !t.completed)
    const futureTasks = tasks.filter(t => t.due_date > today && !t.completed)

    // ─── Handlers ────────────────────────────────────────────────────────────

    const handleStatusChange = (id: string, status: ContactStatus) => {
        setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c))
        setStats(prev => ({
            ...prev,
            [statusKey(status)]: (prev[statusKey(status) as keyof typeof prev] as number) + 1,
        }))
        startTransition(() => updateContactStatus(id, status))
    }

    const handleSaveContact = (updated: OutreachContact) => {
        setContacts(prev => prev.map(c => c.id === updated.id ? updated : c))
        setSelectedContact(updated)
        startTransition(() => updateContact(updated.id, updated))
    }

    const handleCreateContact = async () => {
        if (!newContact.company_name) return
        startTransition(async () => {
            await createContact(newContact as Omit<OutreachContact, 'id' | 'created_at' | 'updated_at'>)
        })
        setShowAddContact(false)
        setNewContact({ status: 'Da Contattare', priority: 'Media', lista: 'B2B' })
    }

    const handleCreateTask = async () => {
        if (!newTask.contact_id) return
        startTransition(async () => {
            await createTask(newTask)
        })
        setShowAddTask(false)
    }

    const handleToggleTask = (id: string, completed: boolean) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, completed } : t))
        startTransition(() => toggleTask(id, completed))
    }

    const handleDeleteTask = (id: string) => {
        setTasks(prev => prev.filter(t => t.id !== id))
        startTransition(() => deleteTask(id))
    }

    // ─── TABS ─────────────────────────────────────────────────────────────────

    const TABS = [
        { id: 'overview', label: 'Overview' },
        { id: 'database', label: `Database (${filtered.length})` },
        { id: 'daily', label: `Gestione Giornaliera${todayTasks.length ? ` (${todayTasks.length})` : ''}` },
        { id: 'pipeline', label: 'Pipeline' },
        { id: 'followup', label: `Follow Up (${contacts.filter(c => c.status === 'Follow Up').length})` },
    ] as const

    return (
        <div className="min-h-screen" style={{ background: '#111', color: '#fff', fontFamily: 'var(--font-sans, system-ui)' }}>

            {/* HEADER */}
            <header className="flex items-center justify-between px-8 py-4" style={{ borderBottom: '1px solid #222' }}>
                <div className="flex items-center gap-4">
                    <Link href="/admin/dashboard"
                        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/5"
                        style={{ color: '#666', textDecoration: 'none' }}>
                        ← Dashboard
                    </Link>
                    <div className="w-px h-5" style={{ background: '#2A2A2A' }} />
                    <div className="flex items-baseline gap-3">
                        <span className="text-xl font-bold tracking-widest">THE ITALIANS</span>
                        <span className="text-xs font-bold tracking-[0.2em]" style={{ color: GOLD }}>CRM</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    {overdueTasks.length > 0 && (
                        <span className="rounded-lg px-3 py-1.5 text-xs font-bold" style={{ background: '#1A0000', color: '#EF4444', border: '1px solid #EF444433' }}>
                            ⚠ {overdueTasks.length} scaduti
                        </span>
                    )}
                    <span className="rounded-lg px-3 py-1.5 text-xs font-bold" style={{ background: '#001A0D', color: '#22C55E', border: '1px solid #22C55E33' }}>
                        ✓ {stats.confermati} Confermati
                    </span>
                    <span className="rounded-lg px-3 py-1.5 text-xs font-bold" style={{ background: '#1A1A1A', color: '#888', border: '1px solid #2A2A2A' }}>
                        {stats.total} Aziende
                    </span>
                </div>
            </header>

            {/* NAV TABS */}
            <nav className="flex px-8" style={{ borderBottom: '1px solid #222' }}>
                {TABS.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
                        className="px-5 py-3.5 text-sm transition-all"
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                            color: tab === t.id ? '#fff' : '#555',
                            fontWeight: tab === t.id ? 600 : 400,
                            borderBottom: tab === t.id ? `2px solid ${GOLD}` : '2px solid transparent',
                        }}>
                        {t.label}
                    </button>
                ))}
            </nav>

            <main className="px-8 py-6 max-w-screen-xl mx-auto">

                {/* ── OVERVIEW ──────────────────────────────────────────────────── */}
                {tab === 'overview' && (
                    <div className="space-y-6">
                        {/* KPI Status Row */}
                        <div className="grid grid-cols-7 gap-3">
                            <Stat val={stats.total} label="Totale" />
                            <Stat val={stats.daContattare} label="Da Cont." color="#666" />
                            <Stat val={stats.contattati} label="Contattati" color={GOLD} />
                            <Stat val={(stats as any).followUp} label="Follow Up" color="#A855F7" />
                            <Stat val={stats.inTrattativa} label="In Trattativa" color="#3B9EFF" />
                            <Stat val={stats.confermati} label="Confermati" color="#22C55E" />
                            <Stat val={stats.declinati} label="Declinati" color="#EF4444" />
                        </div>

                        {/* Conversion Rate KPIs */}
                        <div className="grid grid-cols-4 gap-3">
                            <div className="rounded-xl p-5" style={{ background: '#0A1A0A', border: '1px solid #22C55E22' }}>
                                <div className="text-3xl font-bold" style={{ color: '#22C55E' }}>{stats.tassoConversione}%</div>
                                <div className="text-xs text-neutral-500 mt-1 font-medium">Tasso Conversione</div>
                                <div className="text-[10px] text-neutral-600 mt-0.5">{stats.confermati} confermati / {stats.lavorati} lavorati</div>
                            </div>
                            <div className="rounded-xl p-5" style={{ background: '#001020', border: '1px solid #3B9EFF22' }}>
                                <div className="text-3xl font-bold" style={{ color: '#3B9EFF' }}>{stats.tassoRisposta}%</div>
                                <div className="text-xs text-neutral-500 mt-1 font-medium">Tasso Risposta</div>
                                <div className="text-[10px] text-neutral-600 mt-0.5">Risposte positive (no declinati)</div>
                            </div>
                            <div className="rounded-xl p-5" style={{ background: '#1A1000', border: '1px solid #F69E0022' }}>
                                <div className="text-3xl font-bold" style={{ color: GOLD }}>{stats.tassoChiusura}%</div>
                                <div className="text-xs text-neutral-500 mt-1 font-medium">Tasso Chiusura</div>
                                <div className="text-[10px] text-neutral-600 mt-0.5">{stats.confermati} / {stats.total} totale</div>
                            </div>
                            <div className="rounded-xl p-5" style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}>
                                <div className="text-3xl font-bold" style={{ color: stats.taskCompletati > 0 ? '#22C55E' : '#555' }}>
                                    {stats.taskTotali > 0 ? Math.round((stats.taskCompletati / stats.taskTotali) * 100) : 0}%
                                </div>
                                <div className="text-xs text-neutral-500 mt-1 font-medium">Task Completati</div>
                                <div className="text-[10px] text-neutral-600 mt-0.5">{stats.taskCompletati} / {stats.taskTotali} task</div>
                            </div>
                        </div>

                        {/* Pipeline Progress Bar */}
                        <div className="rounded-xl p-5" style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}>
                            <p className="text-xs font-bold tracking-widest text-neutral-500 mb-3">PIPELINE AVANZAMENTO</p>
                            <div className="h-2 rounded-full overflow-hidden flex" style={{ background: '#222' }}>
                                {(Object.entries(STATUS_CFG) as [ContactStatus, typeof STATUS_CFG[ContactStatus]][]).map(([s, cfg]) => {
                                    const n = contacts.filter(c => c.status === s).length
                                    const pct = stats.total ? (n / stats.total) * 100 : 0
                                    return pct > 0 ? <div key={s} style={{ width: `${pct}%`, background: cfg.dot }} title={`${s}: ${n}`} /> : null
                                })}
                            </div>
                            <div className="flex gap-5 mt-3 flex-wrap">
                                {(Object.entries(STATUS_CFG) as [ContactStatus, typeof STATUS_CFG[ContactStatus]][]).map(([s, cfg]) => (
                                    <div key={s} className="flex items-center gap-1.5 text-xs text-neutral-500">
                                        <div className="w-2 h-2 rounded-sm" style={{ background: cfg.dot }} />
                                        {s} ({contacts.filter(c => c.status === s).length})
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {/* Distribuzione Liste */}
                            <div className="rounded-xl p-5" style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}>
                                <p className="text-xs font-bold tracking-widest text-neutral-500 mb-4">DISTRIBUZIONE LISTE</p>
                                {[
                                    { label: 'B2B Verified', val: stats.listB2B, color: GOLD },
                                    { label: 'Italiane', val: stats.listItaliane, color: '#3B9EFF' },
                                    { label: 'Roma', val: stats.listRoma, color: '#22C55E' },
                                ].map(r => (
                                    <div key={r.label} className="flex items-center justify-between mb-3">
                                        <span className="text-sm text-neutral-400">{r.label}</span>
                                        <span className="text-sm font-bold" style={{ color: r.color }}>{r.val}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Task di Oggi */}
                            <div className="rounded-xl p-5" style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}>
                                <p className="text-xs font-bold tracking-widest text-neutral-500 mb-4">TASK DI OGGI ({todayTasks.length})</p>
                                {todayTasks.length === 0 && <p className="text-sm text-neutral-600">Nessun task per oggi 🎉</p>}
                                {todayTasks.slice(0, 5).map(t => (
                                    <div key={t.id} className="flex items-center gap-2 mb-2" style={{ opacity: t.completed ? 0.4 : 1 }}>
                                        <input type="checkbox" checked={t.completed} onChange={e => handleToggleTask(t.id, e.target.checked)}
                                            className="cursor-pointer" style={{ accentColor: GOLD }} />
                                        <span className="text-sm" style={{ textDecoration: t.completed ? 'line-through' : 'none', color: t.completed ? '#555' : '#ccc' }}>
                                            {t.outreach_contacts?.company_name || '—'} · {t.type}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Attività Settimana */}
                            <div className="rounded-xl p-5" style={{ background: '#001020', border: '1px solid #3B9EFF22' }}>
                                <p className="text-xs font-bold tracking-widest mb-4" style={{ color: '#3B9EFF' }}>📊 ATTIVITÀ SETTIMANA</p>
                                <div className="text-2xl font-bold mb-1" style={{ color: '#3B9EFF' }}>{stats.aggiornamentiSettimana}</div>
                                <div className="text-xs text-neutral-500 mb-3">contatti aggiornati ultimi 7 giorni</div>
                                {stats.ultimiLavorati && stats.ultimiLavorati.slice(0, 4).map((c: any) => (
                                    <div key={c.id} className="flex items-center justify-between mb-1.5">
                                        <span className="text-xs text-neutral-400 truncate mr-2">{c.company_name}</span>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded" style={{
                                            background: STATUS_CFG[c.status as ContactStatus]?.bg || '#222',
                                            color: STATUS_CFG[c.status as ContactStatus]?.color || '#666',
                                        }}>{c.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Alta priorità */}
                        <div className="rounded-xl p-5" style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}>
                            <p className="text-xs font-bold tracking-widest text-neutral-500 mb-4">🔴 ALTA PRIORITÀ — DA CONTATTARE ({contacts.filter(c => c.priority === 'Alta' && c.status === 'Da Contattare').length})</p>
                            <div className="grid grid-cols-3 gap-2">
                                {contacts.filter(c => c.priority === 'Alta' && c.status === 'Da Contattare').slice(0, 9).map(c => (
                                    <button key={c.id} onClick={() => { setSelectedContact(c); setTab('database') }}
                                        className="flex items-center justify-between rounded-lg p-3 text-left transition-colors hover:border-neutral-600"
                                        style={{ background: '#111', border: '1px solid #222' }}>
                                        <div>
                                            <div className="text-sm font-semibold">{c.company_name}</div>
                                            <div className="text-xs text-neutral-600">{c.city} · {c.lista}</div>
                                        </div>
                                        <span style={{ color: GOLD, fontSize: 12 }}>→</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── DATABASE ──────────────────────────────────────────────────── */}
                {tab === 'database' && (
                    <div>
                        <div className="flex gap-2 mb-4 flex-wrap">
                            <input
                                placeholder="🔍  Cerca azienda, città, settore..."
                                value={search} onChange={e => setSearch(e.target.value)}
                                className="flex-1 min-w-56 rounded-lg px-3.5 py-2.5 text-sm text-white outline-none"
                                style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}
                            />
                            {[
                                { val: filterStatus, set: setFilterStatus, opts: ['Tutti', ...Object.keys(STATUS_CFG)] },
                                { val: filterLista, set: setFilterLista, opts: ['Tutti', 'B2B', 'Italiane', 'Roma'] },
                                { val: filterSector, set: setFilterSector, opts: ['Tutti', ...uniqueSectors] },
                                { val: filterPriority, set: setFilterPriority, opts: ['Tutte', 'Alta', 'Media', 'Bassa'] },
                            ].map((f, i) => (
                                <select key={i} value={f.val} onChange={e => f.set(e.target.value)}
                                    className="rounded-lg px-3 py-2.5 text-sm text-white outline-none cursor-pointer"
                                    style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}>
                                    {f.opts.map(o => <option key={o}>{o}</option>)}
                                </select>
                            ))}
                            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
                                className="rounded-lg px-3 py-2.5 text-sm text-white outline-none cursor-pointer"
                                style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}>
                                <option value="priority">Priorità</option>
                                <option value="name">Nome</option>
                                <option value="status">Status</option>
                            </select>
                            <button onClick={() => setShowAddContact(true)}
                                className="rounded-lg px-4 py-2.5 text-sm font-bold cursor-pointer"
                                style={{ background: GOLD, border: 'none', color: '#000' }}>
                                + Aggiungi
                            </button>
                        </div>

                        <p className="text-xs text-neutral-600 mb-3">{filtered.length} di {contacts.length} risultati</p>

                        <div className="rounded-xl overflow-hidden" style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #2A2A2A' }}>
                                        {['Azienda', 'Settore/Cat.', 'Città', 'Lista', 'Referente', 'Status', 'Priorità', 'Email'].map(h => (
                                            <th key={h} className="px-3 py-2.5 text-left text-xs font-bold tracking-widest"
                                                style={{ color: '#444' }}>{h.toUpperCase()}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map(c => (
                                        <tr key={c.id} onClick={() => setSelectedContact(c)}
                                            className="cursor-pointer transition-colors hover:bg-neutral-900"
                                            style={{ borderBottom: '1px solid #1E1E1E' }}>
                                            <td className="px-3 py-2.5">
                                                <div className="text-sm font-semibold">{c.company_name}</div>
                                                {c.employees && <div className="text-xs text-neutral-600">{c.employees.toLocaleString()} dip.</div>}
                                            </td>
                                            <td className="px-3 py-2.5 text-xs text-neutral-500">{c.category || c.sector || '—'}</td>
                                            <td className="px-3 py-2.5 text-xs text-neutral-500">{c.city || '—'}</td>
                                            <td className="px-3 py-2.5">
                                                <span className="text-xs px-2 py-0.5 rounded font-semibold"
                                                    style={{ background: '#222', color: '#888' }}>{c.lista}</span>
                                            </td>
                                            <td className="px-3 py-2.5 text-xs text-neutral-500">{c.contact_name || '—'}</td>
                                            <td className="px-3 py-2.5"><StatusBadge status={c.status} /></td>
                                            <td className="px-3 py-2.5"><PriorityDots p={c.priority} /></td>
                                            <td className="px-3 py-2.5 text-xs text-neutral-600">
                                                {c.contact_email ? '✓' : '—'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ── DAILY ─────────────────────────────────────────────────────── */}
                {tab === 'daily' && (
                    <div className="max-w-3xl space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">Gestione Giornaliera</h2>
                                <p className="text-sm text-neutral-500 mt-0.5">
                                    {new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                            <button onClick={() => setShowAddTask(true)}
                                className="rounded-lg px-4 py-2.5 text-sm font-bold cursor-pointer"
                                style={{ background: GOLD, border: 'none', color: '#000' }}>
                                + Nuovo Task
                            </button>
                        </div>

                        {/* Performance Summary */}
                        <div className="grid grid-cols-4 gap-3">
                            <div className="rounded-xl p-4" style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}>
                                <div className="text-2xl font-bold" style={{ color: GOLD }}>{stats.lavorati}</div>
                                <div className="text-[10px] text-neutral-500 font-medium">Contatti Lavorati</div>
                                <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: '#222' }}>
                                    <div className="h-full rounded-full" style={{ width: `${stats.total ? (stats.lavorati / stats.total) * 100 : 0}%`, background: GOLD }} />
                                </div>
                            </div>
                            <div className="rounded-xl p-4" style={{ background: '#0A1A0A', border: '1px solid #22C55E22' }}>
                                <div className="text-2xl font-bold" style={{ color: '#22C55E' }}>{stats.tassoConversione}%</div>
                                <div className="text-[10px] text-neutral-500 font-medium">Conversione</div>
                                <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: '#222' }}>
                                    <div className="h-full rounded-full" style={{ width: `${stats.tassoConversione}%`, background: '#22C55E' }} />
                                </div>
                            </div>
                            <div className="rounded-xl p-4" style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}>
                                <div className="text-2xl font-bold" style={{ color: stats.taskScaduti > 0 ? '#EF4444' : '#22C55E' }}>
                                    {stats.taskOggi + stats.taskScaduti}
                                </div>
                                <div className="text-[10px] text-neutral-500 font-medium">
                                    Da fare {stats.taskScaduti > 0 && <span style={{ color: '#EF4444' }}>({stats.taskScaduti} scaduti)</span>}
                                </div>
                            </div>
                            <div className="rounded-xl p-4" style={{ background: '#001020', border: '1px solid #3B9EFF22' }}>
                                <div className="text-2xl font-bold" style={{ color: '#3B9EFF' }}>{stats.aggiornamentiSettimana}</div>
                                <div className="text-[10px] text-neutral-500 font-medium">Aggiornati questa settimana</div>
                            </div>
                        </div>

                        {overdueTasks.length > 0 && (
                            <div className="rounded-xl p-5" style={{ background: '#1A0000', border: '1px solid #EF444433' }}>
                                <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#EF4444' }}>⚠ SCADUTI ({overdueTasks.length})</p>
                                {overdueTasks.map(t => <TaskRow key={t.id} task={t} onToggle={handleToggleTask} onDelete={handleDeleteTask} overdue />)}
                            </div>
                        )}

                        <div>
                            <p className="text-xs font-bold tracking-widest text-neutral-500 mb-3">OGGI ({todayTasks.length})</p>
                            {todayTasks.length === 0 && <p className="text-sm text-neutral-600 py-6">Nessun task per oggi. Aggiungine uno!</p>}
                            {todayTasks.map(t => <TaskRow key={t.id} task={t} onToggle={handleToggleTask} onDelete={handleDeleteTask} />)}
                        </div>

                        {futureTasks.length > 0 && (
                            <div>
                                <p className="text-xs font-bold tracking-widest text-neutral-500 mb-3">PROSSIMI ({futureTasks.length})</p>
                                {futureTasks.slice(0, 10).map(t => <TaskRow key={t.id} task={t} onToggle={handleToggleTask} onDelete={handleDeleteTask} future />)}
                            </div>
                        )}

                        <div className="rounded-xl p-5" style={{ background: '#001020', border: '1px solid #3B9EFF22' }}>
                            <p className="text-xs font-bold tracking-widest mb-4" style={{ color: '#3B9EFF' }}>📋 SEQUENZA OUTREACH 14 GIORNI</p>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    ['Giorno 1', 'Email presentazione format'],
                                    ['Giorno 3', 'Follow-up LinkedIn'],
                                    ['Giorno 6', 'Email con video esempio'],
                                    ['Giorno 9', 'Chiamata telefonica'],
                                    ['Giorno 12', 'Messaggio LinkedIn diretto'],
                                    ['Giorno 14', 'Email finale / chiusura'],
                                ].map(([g, a]) => (
                                    <div key={g} className="rounded-lg p-3" style={{ background: '#0A0A1A' }}>
                                        <div className="text-xs font-bold mb-0.5" style={{ color: '#3B9EFF' }}>{g}</div>
                                        <div className="text-xs text-neutral-500">{a}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── PIPELINE ──────────────────────────────────────────────────── */}
                {tab === 'pipeline' && (
                    <div>
                        <h2 className="text-xl font-bold mb-5">Pipeline Outreach</h2>
                        <div className="grid grid-cols-6 gap-3 items-start">
                            {(Object.entries(STATUS_CFG) as [ContactStatus, typeof STATUS_CFG[ContactStatus]][]).map(([status, cfg]) => {
                                const items = contacts.filter(c => c.status === status)
                                return (
                                    <div key={status} className="rounded-xl p-4" style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}>
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-2 h-2 rounded-sm" style={{ background: cfg.dot }} />
                                            <span className="text-xs font-bold tracking-widest" style={{ color: cfg.color }}>{status.toUpperCase()}</span>
                                            <span className="ml-auto text-xs rounded-full px-2 py-0.5" style={{ background: '#222', color: '#666' }}>{items.length}</span>
                                        </div>
                                        {items.map(c => (
                                            <button key={c.id} onClick={() => { setSelectedContact(c); setTab('database') }}
                                                className="w-full text-left rounded-lg p-2.5 mb-2 transition-colors hover:bg-neutral-800"
                                                style={{ background: '#111', border: '1px solid #222', borderLeft: `3px solid ${cfg.dot}` }}>
                                                <div className="text-xs font-semibold">{c.company_name}</div>
                                                <div className="text-xs text-neutral-600 mt-0.5">{c.city} · {c.lista}</div>
                                            </button>
                                        ))}
                                        {items.length === 0 && <p className="text-xs text-neutral-700 text-center py-4">Vuoto</p>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* ── FOLLOW UP ─────────────────────────────────────────────────── */}
                {tab === 'followup' && (
                    <div>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl font-bold">Follow Up Aziende</h2>
                            <span className="text-sm text-neutral-500">{contacts.filter(c => c.status === 'Follow Up').length} aziende in follow up</span>
                        </div>
                        <div className="rounded-xl overflow-hidden" style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #2A2A2A' }}>
                                        {['Azienda', 'Ultimo Contatto', 'Prossimo Passo', 'Referente', 'Priorità', 'Azioni'].map(h => (
                                            <th key={h} className="px-3 py-3 text-left text-xs font-bold tracking-widest"
                                                style={{ color: '#444' }}>{h.toUpperCase()}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.filter(c => c.status === 'Follow Up').map(c => (
                                        <tr key={c.id} onClick={() => setSelectedContact(c)}
                                            className="cursor-pointer transition-colors hover:bg-neutral-900"
                                            style={{ borderBottom: '1px solid #1E1E1E' }}>
                                            <td className="px-3 py-3">
                                                <div className="text-sm font-semibold">{c.company_name}</div>
                                                <div className="text-xs text-neutral-500 mt-0.5">{c.city || '—'}</div>
                                            </td>
                                            <td className="px-3 py-3 text-sm text-neutral-400">{c.last_contact || '—'}</td>
                                            <td className="px-3 py-3 text-sm text-neutral-300 max-w-[200px] truncate">{c.next_step || '—'}</td>
                                            <td className="px-3 py-3 text-sm text-neutral-400">{c.contact_name || '—'}</td>
                                            <td className="px-3 py-3"><PriorityDots p={c.priority} /></td>
                                            <td className="px-3 py-3 text-right">
                                                <button className="text-xs font-bold px-3 py-1.5 rounded transition-colors hover:bg-white/10" style={{ background: '#222', color: '#fff' }}>
                                                    Aggiorna
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {contacts.filter(c => c.status === 'Follow Up').length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-3 py-10 text-center text-sm text-neutral-600">Nessuna azienda in follow up.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            {/* ── CONTACT DETAIL MODAL ─────────────────────────────────────────── */}
            {selectedContact && (
                <ContactModal
                    contact={selectedContact}
                    tasks={tasks.filter(t => t.contact_id === selectedContact.id)}
                    onClose={() => setSelectedContact(null)}
                    onSave={handleSaveContact}
                    onStatusChange={handleStatusChange}
                    onToggleTask={handleToggleTask}
                    onDeleteTask={handleDeleteTask}
                    onAddTask={(cid) => { setNewTask(p => ({ ...p, contact_id: cid })); setShowAddTask(true); setSelectedContact(null) }}
                />
            )}

            {/* ── ADD CONTACT MODAL ────────────────────────────────────────────── */}
            {showAddContact && (
                <Modal onClose={() => setShowAddContact(false)}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold">Nuova Azienda</h3>
                        <button onClick={() => setShowAddContact(false)} style={{ background: 'none', border: 'none', color: '#555', fontSize: 22, cursor: 'pointer' }}>×</button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            ['Nome Azienda *', 'company_name', 'text'],
                            ['Email', 'contact_email', 'email'],
                            ['Referente', 'contact_name', 'text'],
                            ['Città', 'city', 'text'],
                            ['Telefono', 'phone', 'text'],
                            ['LinkedIn', 'linkedin', 'url'],
                        ].map(([lbl, key, type]) => (
                            <Field key={key} label={lbl as string}>
                                <input type={type as string} className={inputCls} style={inputStyle}
                                    value={(newContact as any)[key] || ''}
                                    onChange={e => setNewContact(p => ({ ...p, [key]: e.target.value }))} />
                            </Field>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-1">
                        {[
                            { lbl: 'Settore', key: 'sector', opts: SECTOR_OPTIONS },
                            { lbl: 'Lista', key: 'lista', opts: ['B2B', 'Italiane', 'Roma'] },
                            { lbl: 'Status', key: 'status', opts: Object.keys(STATUS_CFG) },
                            { lbl: 'Priorità', key: 'priority', opts: ['Alta', 'Media', 'Bassa'] },
                        ].map(({ lbl, key, opts }) => (
                            <Field key={key} label={lbl}>
                                <select className={inputCls + ' cursor-pointer'} style={inputStyle}
                                    value={(newContact as any)[key] || ''}
                                    onChange={e => setNewContact(p => ({ ...p, [key]: e.target.value }))}>
                                    <option value="">— Seleziona —</option>
                                    {opts.map(o => <option key={o}>{o}</option>)}
                                </select>
                            </Field>
                        ))}
                    </div>
                    <Field label="Note">
                        <textarea className={inputCls} style={{ ...inputStyle, resize: 'vertical', minHeight: 70 }} rows={3}
                            value={newContact.notes || ''}
                            onChange={e => setNewContact(p => ({ ...p, notes: e.target.value }))} />
                    </Field>
                    <div className="flex justify-end gap-2 mt-4">
                        <button onClick={() => setShowAddContact(false)}
                            style={{ background: 'none', border: '1px solid #2A2A2A', borderRadius: 8, padding: '9px 20px', color: '#666', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14 }}>Annulla</button>
                        <button onClick={handleCreateContact}
                            style={{ background: GOLD, border: 'none', borderRadius: 8, padding: '9px 24px', color: '#000', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14 }}>Aggiungi</button>
                    </div>
                </Modal>
            )}

            {/* ── ADD TASK MODAL ───────────────────────────────────────────────── */}
            {showAddTask && (
                <Modal onClose={() => setShowAddTask(false)}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold">Nuovo Task</h3>
                        <button onClick={() => setShowAddTask(false)} style={{ background: 'none', border: 'none', color: '#555', fontSize: 22, cursor: 'pointer' }}>×</button>
                    </div>
                    <Field label="Azienda">
                        <select className={inputCls + ' cursor-pointer'} style={inputStyle}
                            value={newTask.contact_id}
                            onChange={e => setNewTask(p => ({ ...p, contact_id: e.target.value }))}>
                            <option value="">— Seleziona —</option>
                            {contacts.map(c => <option key={c.id} value={c.id}>{c.company_name}</option>)}
                        </select>
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Tipo">
                            <select className={inputCls + ' cursor-pointer'} style={inputStyle}
                                value={newTask.type}
                                onChange={e => setNewTask(p => ({ ...p, type: e.target.value as TaskType }))}>
                                {['Email', 'LinkedIn', 'Telefono', 'WhatsApp'].map(o => <option key={o}>{o}</option>)}
                            </select>
                        </Field>
                        <Field label="Scadenza">
                            <input type="date" className={inputCls} style={inputStyle}
                                value={newTask.due_date}
                                onChange={e => setNewTask(p => ({ ...p, due_date: e.target.value }))} />
                        </Field>
                    </div>
                    <Field label="Note">
                        <input type="text" className={inputCls} style={inputStyle}
                            value={newTask.note}
                            onChange={e => setNewTask(p => ({ ...p, note: e.target.value }))} />
                    </Field>
                    <div className="flex justify-end gap-2 mt-4">
                        <button onClick={() => setShowAddTask(false)}
                            style={{ background: 'none', border: '1px solid #2A2A2A', borderRadius: 8, padding: '9px 20px', color: '#666', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14 }}>Annulla</button>
                        <button onClick={handleCreateTask}
                            style={{ background: GOLD, border: 'none', borderRadius: 8, padding: '9px 24px', color: '#000', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14 }}>Salva</button>
                    </div>
                </Modal>
            )}
        </div>
    )
}

// ─── TASK ROW ────────────────────────────────────────────────────────────────

function TaskRow({ task, onToggle, onDelete, overdue, future }: {
    task: any; onToggle: (id: string, c: boolean) => void; onDelete: (id: string) => void
    overdue?: boolean; future?: boolean
}) {
    const GOLD = '#F69E00'
    const typeEmoji: Record<string, string> = { Email: '✉️', LinkedIn: '💼', Telefono: '📞', WhatsApp: '💬' }
    return (
        <div className="flex items-center gap-3 rounded-xl p-3 mb-2 transition-colors"
            style={{ background: overdue ? '#0F0000' : future ? '#0D0D0D' : '#1A1A1A', border: `1px solid ${overdue ? '#EF444422' : '#2A2A2A'}`, opacity: task.completed ? 0.45 : 1 }}>
            <input type="checkbox" checked={task.completed} onChange={e => onToggle(task.id, e.target.checked)}
                className="cursor-pointer" style={{ accentColor: GOLD, width: 16, height: 16, flexShrink: 0 }} />
            <span className="text-base">{typeEmoji[task.type] || '📝'}</span>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#555' : '#fff' }}>
                    {task.outreach_contacts?.company_name || '—'} <span className="font-normal text-neutral-600">via {task.type}</span>
                </p>
                {task.note && <p className="text-xs text-neutral-600 truncate">{task.note}</p>}
            </div>
            {future && <span className="text-xs text-neutral-600 flex-shrink-0">{task.due_date}</span>}
            {overdue && <span className="text-xs flex-shrink-0" style={{ color: '#EF4444' }}>Scad. {task.due_date}</span>}
            <button onClick={() => onDelete(task.id)}
                style={{ background: 'none', border: 'none', color: '#333', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: '0 4px', flexShrink: 0 }}>×</button>
        </div>
    )
}

// ─── CONTACT DETAIL MODAL ────────────────────────────────────────────────────

function ContactModal({ contact, tasks, onClose, onSave, onStatusChange, onToggleTask, onDeleteTask, onAddTask }: {
    contact: OutreachContact
    tasks: any[]
    onClose: () => void
    onSave: (c: OutreachContact) => void
    onStatusChange: (id: string, s: ContactStatus) => void
    onToggleTask: (id: string, c: boolean) => void
    onDeleteTask: (id: string) => void
    onAddTask: (id: string) => void
}) {
    const GOLD = '#F69E00'
    const [form, setForm] = useState(contact)
    const set = (k: keyof OutreachContact) => (v: string) => setForm(p => ({ ...p, [k]: v }))

    const inputCls = "w-full rounded-lg px-3.5 py-2.5 text-sm text-white outline-none"
    const inputStyle = { background: '#111', border: '1px solid #2A2A2A' }

    return (
        <Modal onClose={onClose}>
            <div className="flex items-start justify-between mb-5">
                <div>
                    <h2 className="text-2xl font-bold">{contact.company_name}</h2>
                    <p className="text-sm text-neutral-500 mt-0.5">{contact.sector} · {contact.city} · {contact.lista}</p>
                </div>
                <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#555', fontSize: 22, cursor: 'pointer' }}>×</button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                    <label className="block text-xs font-bold tracking-widest text-neutral-500 mb-1.5">STATUS</label>
                    <select className={inputCls + ' cursor-pointer'} style={inputStyle}
                        value={form.status}
                        onChange={e => { set('status')(e.target.value); onStatusChange(contact.id, e.target.value as ContactStatus) }}>
                        {['Da Contattare', 'Contattato', 'Follow Up', 'In Trattativa', 'Confermato', 'Declinato'].map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold tracking-widest text-neutral-500 mb-1.5">PRIORITÀ</label>
                    <select className={inputCls + ' cursor-pointer'} style={inputStyle}
                        value={form.priority} onChange={e => set('priority')(e.target.value)}>
                        {['Alta', 'Media', 'Bassa'].map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {[
                    ['Email', 'contact_email'], ['Referente', 'contact_name'],
                    ['Telefono', 'phone'], ['LinkedIn', 'linkedin'],
                    ['Ultimo Contatto', 'last_contact'], ['Prossimo Passo', 'next_step'],
                ].map(([lbl, key]) => (
                    <div key={key}>
                        <label className="block text-xs font-bold tracking-widest text-neutral-500 mb-1.5">{lbl.toUpperCase()}</label>
                        <input type={key === 'last_contact' ? 'date' : 'text'} className={inputCls} style={inputStyle}
                            value={(form as any)[key] || ''}
                            onChange={e => set(key as keyof OutreachContact)(e.target.value)} />
                    </div>
                ))}
            </div>

            <div className="mt-3">
                <label className="block text-xs font-bold tracking-widest text-neutral-500 mb-1.5">NOTE</label>
                <textarea className={inputCls} style={{ ...inputStyle, resize: 'vertical', minHeight: 70 }} rows={3}
                    value={form.notes || ''} onChange={e => set('notes')(e.target.value)} />
            </div>

            {(contact.employees || contact.revenue) && (
                <div className="flex gap-4 mt-3">
                    {contact.employees && <div className="text-xs text-neutral-500">👥 {contact.employees.toLocaleString()} dipendenti</div>}
                    {contact.revenue && <div className="text-xs text-neutral-500">💰 €{(contact.revenue / 1_000_000).toFixed(0)}M fatturato</div>}
                </div>
            )}

            <div className="mt-5">
                <p className="text-xs font-bold tracking-widest text-neutral-500 mb-3">TASK ({tasks.length})</p>
                {tasks.map(t => (
                    <div key={t.id} className="flex items-center gap-2 rounded-lg p-2.5 mb-1.5" style={{ background: '#111', opacity: t.completed ? 0.4 : 1 }}>
                        <input type="checkbox" checked={t.completed} onChange={e => onToggleTask(t.id, e.target.checked)}
                            className="cursor-pointer" style={{ accentColor: GOLD }} />
                        <span className="text-sm flex-1" style={{ textDecoration: t.completed ? 'line-through' : 'none', color: t.completed ? '#444' : '#ccc' }}>
                            {t.type} — {t.note || '—'} · {t.due_date}
                        </span>
                        <button onClick={() => onDeleteTask(t.id)} style={{ background: 'none', border: 'none', color: '#333', cursor: 'pointer', fontSize: 16 }}>×</button>
                    </div>
                ))}
                <button onClick={() => onAddTask(contact.id)}
                    className="w-full rounded-lg py-2 text-sm text-neutral-600 cursor-pointer mt-1"
                    style={{ background: 'none', border: '1px dashed #2A2A2A' }}>
                    + Task per {contact.company_name}
                </button>
            </div>

            <div className="flex gap-2 mt-5 flex-wrap">
                <button onClick={() => onSave(form)}
                    style={{ background: GOLD, border: 'none', borderRadius: 8, padding: '9px 20px', color: '#000', fontWeight: 700, cursor: 'pointer', fontSize: 14, fontFamily: 'inherit' }}>
                    Salva Modifiche
                </button>
                {form.contact_email && (
                    <a href={`mailto:${form.contact_email}`}
                        style={{ background: '#001830', border: '1px solid #3B9EFF33', borderRadius: 8, padding: '9px 16px', color: '#3B9EFF', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                        ✉ Email
                    </a>
                )}
                {form.linkedin && form.linkedin.startsWith('http') && (
                    <a href={form.linkedin} target="_blank" rel="noreferrer"
                        style={{ background: '#001A33', border: '1px solid #3B9EFF22', borderRadius: 8, padding: '9px 16px', color: '#888', fontSize: 13, textDecoration: 'none' }}>
                        💼 LinkedIn
                    </a>
                )}
                {form.website && form.website.startsWith('http') && (
                    <a href={form.website} target="_blank" rel="noreferrer"
                        style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 8, padding: '9px 16px', color: '#666', fontSize: 13, textDecoration: 'none' }}>
                        🌐 Sito
                    </a>
                )}
            </div>
        </Modal>
    )
}

function statusKey(s: ContactStatus) {
    const map: Record<ContactStatus, string> = {
        'Da Contattare': 'daContattare', 'Contattato': 'contattati', 'Follow Up': 'followUp',
        'In Trattativa': 'inTrattativa', 'Confermato': 'confermati', 'Declinato': 'declinati',
    }
    return map[s]
}
