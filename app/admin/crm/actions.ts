'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase-server'

// ─── TYPES ───────────────────────────────────────────────────────────────────

export type ContactStatus = 'Da Contattare' | 'Contattato' | 'In Trattativa' | 'Confermato' | 'Declinato'
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

// ─── STATS ───────────────────────────────────────────────────────────────────

export async function getCrmStats() {
    const supabase = await createClient()
    const today = new Date().toISOString().split('T')[0]

    const [{ data: contacts }, { data: tasks }] = await Promise.all([
        supabase.from('outreach_contacts').select('status, priority, lista'),
        supabase.from('outreach_tasks').select('due_date, completed'),
    ])

    const cs = contacts || []
    return {
        total: cs.length,
        daContattare: cs.filter(c => c.status === 'Da Contattare').length,
        contattati: cs.filter(c => c.status === 'Contattato').length,
        inTrattativa: cs.filter(c => c.status === 'In Trattativa').length,
        confermati: cs.filter(c => c.status === 'Confermato').length,
        declinati: cs.filter(c => c.status === 'Declinato').length,
        listB2B: cs.filter(c => c.lista === 'B2B').length,
        listItaliane: cs.filter(c => c.lista === 'Italiane').length,
        listRoma: cs.filter(c => c.lista === 'Roma').length,
        altaPriorita: cs.filter(c => c.priority === 'Alta').length,
        taskOggi: (tasks || []).filter(t => t.due_date === today).length,
        taskScaduti: (tasks || []).filter(t => t.due_date < today && !t.completed).length,
    }
}
