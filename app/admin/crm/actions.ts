'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase-server'

// ─── TYPES ───────────────────────────────────────────────────────────────────

export type ContactStatus = 'Da Contattare' | 'Contattato' | 'Follow Up' | 'In Trattativa' | 'Confermato' | 'Declinato'
export type ContactPriority = 'Alta' | 'Media' | 'Bassa'
export type TaskType = 'Email' | 'LinkedIn' | 'Telefono' | 'WhatsApp'

export interface OutreachContact {
    id: string
    company_name: string
    sector: string | null
    category: string | null
    city: string | null
    region: string | null
    website: string | null
    contact_email: string | null
    linkedin: string | null
    contact_name: string | null
    phone: string | null
    employees: number | null
    revenue: number | null
    lista: string
    status: ContactStatus
    priority: ContactPriority
    tag: string | null
    notes: string | null
    next_step: string | null
    last_contact: string | null
    created_at: string
    updated_at: string
}

export interface OutreachTask {
    id: string
    contact_id: string
    type: TaskType
    due_date: string
    completed: boolean
    note: string | null
    created_at: string
}

// ─── CONTACTS ────────────────────────────────────────────────────────────────

export async function getContacts(filters?: {
    status?: string
    lista?: string
    search?: string
}): Promise<OutreachContact[]> {
    const supabase = await createClient()
    let query = supabase.from('outreach_contacts').select('*').order('company_name')

    if (filters?.status && filters.status !== 'Tutti') query = query.eq('status', filters.status)
    if (filters?.lista && filters.lista !== 'Tutti') query = query.eq('lista', filters.lista)
    if (filters?.search) query = query.or(`company_name.ilike.%${filters.search}%,city.ilike.%${filters.search}%`)

    const { data, error } = await query
    if (error) throw new Error(error.message)
    return data || []
}

export async function updateContactStatus(id: string, status: ContactStatus) {
    const supabase = await createClient()
    const { error } = await supabase.from('outreach_contacts').update({ status }).eq('id', id)
    if (error) throw new Error(error.message)
    revalidatePath('/admin/crm')
}

export async function updateContact(id: string, data: Partial<OutreachContact>) {
    const supabase = await createClient()
    const { error } = await supabase.from('outreach_contacts').update(data).eq('id', id)
    if (error) throw new Error(error.message)
    revalidatePath('/admin/crm')
}

export async function createContact(data: Omit<OutreachContact, 'id' | 'created_at' | 'updated_at'>) {
    const supabase = await createClient()
    const { error } = await supabase.from('outreach_contacts').insert(data)
    if (error) throw new Error(error.message)
    revalidatePath('/admin/crm')
}

// ─── TASKS ───────────────────────────────────────────────────────────────────

export async function getTasks() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('outreach_tasks')
        .select('*, outreach_contacts(company_name, status)')
        .order('due_date')
    if (error) throw new Error(error.message)
    return data || []
}

export async function createTask(data: { contact_id: string; type: TaskType; due_date: string; note?: string }) {
    const supabase = await createClient()
    const { error } = await supabase.from('outreach_tasks').insert({ ...data, completed: false })
    if (error) throw new Error(error.message)
    revalidatePath('/admin/crm')
}

export async function toggleTask(id: string, completed: boolean) {
    const supabase = await createClient()
    const { error } = await supabase.from('outreach_tasks').update({ completed }).eq('id', id)
    if (error) throw new Error(error.message)
    revalidatePath('/admin/crm')
}

export async function deleteTask(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('outreach_tasks').delete().eq('id', id)
    if (error) throw new Error(error.message)
    revalidatePath('/admin/crm')
}

export async function getCrmStats() {
    const supabase = await createClient()
    const today = new Date().toISOString().split('T')[0]

    // Calculate date boundaries
    const now = new Date()
    const weekAgo = new Date(now); weekAgo.setDate(weekAgo.getDate() - 7)
    const monthAgo = new Date(now); monthAgo.setDate(monthAgo.getDate() - 30)
    const weekAgoStr = weekAgo.toISOString()
    const monthAgoStr = monthAgo.toISOString()

    const [{ data: contacts }, { data: tasks }, { data: recentlyUpdated }] = await Promise.all([
        supabase.from('outreach_contacts').select('status, priority, lista, last_contact'),
        supabase.from('outreach_tasks').select('due_date, completed, created_at'),
        supabase.from('outreach_contacts')
            .select('id, company_name, status, updated_at, last_contact')
            .gte('updated_at', weekAgoStr)
            .order('updated_at', { ascending: false })
            .limit(20),
    ])

    const cs = contacts || []
    const ts = ts_data(tasks || [], today)
    const lavorati = cs.filter(c => c.status !== 'Da Contattare').length
    const confermati = cs.filter(c => c.status === 'Confermato').length
    const declinati = cs.filter(c => c.status === 'Declinato').length
    const inPipeline = lavorati - declinati // Contattati + In Trattativa + Confermati

    return {
        total: cs.length,
        daContattare: cs.filter(c => c.status === 'Da Contattare').length,
        contattati: cs.filter(c => c.status === 'Contattato').length,
        followUp: cs.filter(c => c.status === 'Follow Up').length,
        inTrattativa: cs.filter(c => c.status === 'In Trattativa').length,
        confermati,
        declinati,
        listB2B: cs.filter(c => c.lista === 'B2B').length,
        listItaliane: cs.filter(c => c.lista === 'Italiane').length,
        listRoma: cs.filter(c => c.lista === 'Roma').length,
        altaPriorita: cs.filter(c => c.priority === 'Alta').length,
        taskOggi: ts.oggi,
        taskScaduti: ts.scaduti,
        taskCompletati: ts.completati,
        taskTotali: ts.totali,
        // ── Conversion metrics ──
        lavorati,                                               // tutti quelli non "Da Contattare"
        tassoRisposta: lavorati > 0 ? Math.round((inPipeline / lavorati) * 100) : 0,   // % risposte positive (no declinati)
        tassoConversione: lavorati > 0 ? Math.round((confermati / lavorati) * 100) : 0,    // % confermati su lavorati
        tassoChiusura: cs.length > 0 ? Math.round((confermati / cs.length) * 100) : 0,  // % confermati su totale
        // ── Activity ──
        aggiornamentiSettimana: (recentlyUpdated || []).length,
        ultimiLavorati: (recentlyUpdated || []).slice(0, 8),
    }
}

function ts_data(tasks: { due_date: string; completed: boolean; created_at: string }[], today: string) {
    return {
        oggi: tasks.filter(t => t.due_date === today).length,
        scaduti: tasks.filter(t => t.due_date < today && !t.completed).length,
        completati: tasks.filter(t => t.completed).length,
        totali: tasks.length,
    }
}

