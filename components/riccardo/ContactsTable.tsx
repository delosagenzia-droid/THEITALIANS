"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { Loader2, Mail, Phone, Calendar, Trash2 } from "lucide-react";

type ContactType = "video" | "proposal" | "delos";

interface Contact {
  id: string;
  contact_type: ContactType;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  status: "new" | "contacted" | "resolved" | "rejected";
  created_at: string;
}

interface ContactsTableProps {
  type: ContactType;
  refreshTrigger?: number;
}

export function ContactsTable({ type, refreshTrigger = 0 }: ContactsTableProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchContacts();
  }, [type, refreshTrigger]);

  async function fetchContacts() {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: sbError } = await supabase
        .from("riccardo_contacts")
        .select("*")
        .eq("contact_type", type)
        .order("created_at", { ascending: false });

      if (sbError) throw sbError;
      setContacts(data as Contact[]);
    } catch (err: any) {
      console.error(`Error fetching ${type} contacts:`, err);
      // Fallback a dati finti se la tabella non esiste per demo UI
      setContacts([]);
      setError("Errore nel caricamento o tabella non ancora creata in DB.");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, newStatus: string) {
    try {
      const { error: sbError } = await supabase
        .from("riccardo_contacts")
        .update({ status: newStatus })
        .eq("id", id);
        
      if (sbError) throw sbError;
      
      // Aggiorna stato locale ottimisticamente
      setContacts(contacts.map(c => 
        c.id === id ? { ...c, status: newStatus as any } : c
      ));
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Errore nell'aggiornamento dello stato");
    }
  }

  async function deleteContact(id: string) {
    if (!confirm("Sei sicuro di voler eliminare questo contatto? L'azione è irreversibile.")) return;
    
    try {
      const { error: sbError } = await supabase
        .from("riccardo_contacts")
        .delete()
        .eq("id", id);
        
      if (sbError) throw sbError;
      
      setContacts(contacts.filter(c => c.id !== id));
    } catch (err) {
      console.error("Error deleting contact:", err);
      alert("Errore nell'eliminazione del contatto");
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-400 border-blue-500/20';
      case 'contacted': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20';
      case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/20';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/20';
      default: return 'bg-neutral-800 text-neutral-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'Nuovo';
      case 'contacted': return 'In Contatto';
      case 'resolved': return 'Risolto/Chiuso';
      case 'rejected': return 'Scartato';
      default: return status;
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-500" />
      </div>
    );
  }

  if (error && contacts.length === 0) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center">
        {error}
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-12 text-center text-neutral-500">
        Nessun contatto trovato in questa sezione.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="lowercase tracking-wider text-neutral-500 border-b border-neutral-800">
          <tr>
            <th className="font-normal px-4 py-3 pb-4">Data</th>
            <th className="font-normal px-4 py-3 pb-4">Nome & Azienda</th>
            <th className="font-normal px-4 py-3 pb-4">Recapiti</th>
            <th className="font-normal px-4 py-3 pb-4 max-w-xs">Messaggio</th>
            <th className="font-normal px-4 py-3 pb-4">Stato</th>
            <th className="font-normal px-4 py-3 pb-4 text-right">Azioni</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800/50">
          {contacts.map((contact) => (
            <tr key={contact.id} className="hover:bg-neutral-900/50 transition-colors">
              <td className="px-4 py-4 align-top">
                <div className="flex flex-col">
                  <span className="text-neutral-300">
                    {new Date(contact.created_at).toLocaleDateString('it-IT')}
                  </span>
                  <span className="text-neutral-500 text-xs">
                    {new Date(contact.created_at).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </td>
              
              <td className="px-4 py-4 align-top">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-white">{contact.name}</span>
                  {contact.company && (
                    <span className="text-neutral-400 text-xs">{contact.company}</span>
                  )}
                </div>
              </td>
              
              <td className="px-4 py-4 align-top">
                <div className="flex flex-col gap-2">
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors">
                    <Mail className="w-3 h-3 text-neutral-500" />
                    <span>{contact.email}</span>
                  </a>
                  {contact.phone && (
                    <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors">
                      <Phone className="w-3 h-3 text-neutral-500" />
                      <span>{contact.phone}</span>
                    </a>
                  )}
                </div>
              </td>
              
              <td className="px-4 py-4 align-top max-w-xs break-words whitespace-normal text-neutral-400 leading-relaxed text-sm">
                <div className="line-clamp-3 hover:line-clamp-none transition-all">
                  {contact.message || <span className="italic text-neutral-600">Nessun messaggio</span>}
                </div>
              </td>
              
              <td className="px-4 py-4 align-top">
                <select
                  value={contact.status}
                  onChange={(e) => updateStatus(contact.id, e.target.value)}
                  className={`border rounded-full px-3 py-1 text-xs outline-none focus:ring-1 cursor-pointer transition-colors ${getStatusColor(contact.status)}`}
                >
                  <option value="new" className="bg-neutral-900 text-white">Nuovo</option>
                  <option value="contacted" className="bg-neutral-900 text-white">In Contatto</option>
                  <option value="resolved" className="bg-neutral-900 text-white">Risolto</option>
                  <option value="rejected" className="bg-neutral-900 text-white">Scartato</option>
                </select>
              </td>

              <td className="px-4 py-4 align-top text-right">
                <button
                  onClick={() => deleteContact(contact.id)}
                  className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Elimina contatto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
