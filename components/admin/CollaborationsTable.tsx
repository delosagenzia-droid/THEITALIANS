"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { Loader2, Trash2, FileText, CheckCircle, Clock } from "lucide-react";

interface Collaboration {
  id: string;
  brand_name: string;
  contact_person: string | null;
  project_description: string | null;
  deliverables: string | null;
  total_budget: number;
  agency_fee_percentage: number;
  agency_fee_amount: number;
  net_riccardo: number;
  status: string;
  contract_status: string;
  production_status: string;
  invoice_status: string;
  created_at: string;
}

interface CollaborationsTableProps {
  refreshTrigger?: number;
}

export function CollaborationsTable({ refreshTrigger = 0 }: CollaborationsTableProps) {
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchCollaborations();
  }, [refreshTrigger]);

  async function fetchCollaborations() {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: sbError } = await supabase
        .from("riccardo_collaborations")
        .select("*")
        .order("created_at", { ascending: false });

      if (sbError) throw sbError;
      setCollaborations(data as Collaboration[]);
    } catch (err: any) {
      console.error("Error fetching collaborations:", err);
      // Fallback a dati finti se la tabella non esiste
      setCollaborations([]);
      setError("Errore nel caricamento dei dati o tabella non ancora creata.");
    } finally {
      setLoading(false);
    }
  }

  async function updateField(id: string, field: string, value: string) {
    try {
      const { error: sbError } = await supabase
        .from("riccardo_collaborations")
        .update({ [field]: value })
        .eq("id", id);
        
      if (sbError) throw sbError;
      
      setCollaborations(collaborations.map(c => 
        c.id === id ? { ...c, [field]: value } : c
      ));
    } catch (err) {
      console.error("Error updating field:", err);
      alert("Errore nell'aggiornamento. Riprova.");
    }
  }

  async function deleteCollaboration(id: string) {
    if (!confirm("Sei sicuro di voler eliminare questo contratto? L'azione è irreversibile.")) return;
    
    try {
      const { error: sbError } = await supabase
        .from("riccardo_collaborations")
        .delete()
        .eq("id", id);
        
      if (sbError) throw sbError;
      
      setCollaborations(collaborations.filter(c => c.id !== id));
    } catch (err) {
      console.error("Error deleting collaboration:", err);
      alert("Errore nell'eliminazione.");
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'lead': return <span className="bg-neutral-800 text-neutral-400 px-2.5 py-1 rounded text-xs font-medium">Lead</span>;
      case 'negotiation': return <span className="bg-blue-500/20 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded text-xs font-medium">Trattativa</span>;
      case 'contract_sent': return <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 px-2.5 py-1 rounded text-xs font-medium">Doc Inviati</span>;
      case 'signed': return <span className="bg-green-500/20 text-green-400 border border-green-500/20 px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Firmato</span>;
      case 'lost': return <span className="bg-red-500/20 text-red-400 border border-red-500/20 px-2.5 py-1 rounded text-xs font-medium">Perso</span>;
      default: return <span className="bg-neutral-800 text-neutral-400 px-2.5 py-1 rounded text-xs font-medium">{status}</span>;
    }
  };

  const getContractIcon = (status: string) => {
    switch (status) {
      case 'signed': return <div title="Firmato"><CheckCircle className="w-4 h-4 text-green-400" /></div>;
      case 'sent': return <div title="Inviato"><Clock className="w-4 h-4 text-yellow-400" /></div>;
      default: return <div title="In Attesa"><FileText className="w-4 h-4 text-neutral-600" /></div>;
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-500" />
      </div>
    );
  }

  if (error && collaborations.length === 0) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center">
        {error}
      </div>
    );
  }

  if (collaborations.length === 0) {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-12 text-center text-neutral-500 flex flex-col items-center">
        <FileText className="w-8 h-8 mb-3 opacity-20" />
        <p>Nessuna collaborazione attiva.</p>
        <p className="text-sm mt-1">Clicca su "Nuova Collaborazione" per iniziare.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="uppercase tracking-wider text-neutral-500 border-b border-neutral-800 text-xs">
          <tr>
            <th className="font-semibold px-4 py-3 pb-4">Brand / Progetto</th>
            <th className="font-semibold px-4 py-3 pb-4">Status & Contratti</th>
            <th className="font-semibold px-4 py-3 pb-4 text-right">Budget Tot.</th>
            <th className="font-semibold px-4 py-3 pb-4 text-right">Fee Agenzia</th>
            <th className="font-semibold px-4 py-3 pb-4 text-right text-green-400/70">Netto Riccardo</th>
            <th className="font-semibold px-4 py-3 pb-4 text-right">Azioni</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800/50">
          {collaborations.map((collab) => (
            <tr key={collab.id} className="hover:bg-neutral-900/50 transition-colors">
              
              <td className="px-4 py-4 align-top">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-white text-base">{collab.brand_name}</span>
                  {collab.deliverables && (
                    <span className="text-neutral-400 text-xs truncate max-w-[200px]" title={collab.deliverables}>
                      {collab.deliverables}
                    </span>
                  )}
                  {collab.contact_person && (
                    <span className="text-neutral-500 text-xs truncate max-w-[200px]">
                      👤 {collab.contact_person}
                    </span>
                  )}
                </div>
              </td>
              
              <td className="px-4 py-4 align-top">
                <div className="flex flex-col gap-3">
                  <select
                    value={collab.status}
                    onChange={(e) => updateField(collab.id, "status", e.target.value)}
                    className="bg-transparent text-sm cursor-pointer outline-none hover:bg-neutral-800 p-1 rounded -ml-1 w-max font-medium"
                  >
                    <option value="lead">👉 Lead</option>
                    <option value="negotiation">🤝 Trattativa</option>
                    <option value="contract_sent">📄 Doc Inviati</option>
                    <option value="signed">✅ Firmato</option>
                    <option value="lost">❌ Perso</option>
                  </select>

                  <div className="flex items-center gap-2 mt-1">
                    {getContractIcon(collab.contract_status)}
                    <select
                      value={collab.contract_status}
                      onChange={(e) => updateField(collab.id, "contract_status", e.target.value)}
                      className="bg-transparent text-xs text-neutral-400 cursor-pointer outline-none hover:text-white"
                    >
                      <option value="pending">Contratto Attesa</option>
                      <option value="sent">Contratto Inviato</option>
                      <option value="signed">Contratto Firmato</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span title="Stato Produzione">🎬</span>
                    <select
                      value={collab.production_status || 'briefing'}
                      onChange={(e) => updateField(collab.id, "production_status", e.target.value)}
                      className="bg-transparent text-xs text-neutral-400 cursor-pointer outline-none hover:text-white"
                    >
                      <option value="briefing">Briefing / Idea</option>
                      <option value="script">Stesura Script</option>
                      <option value="recording">Registrazione</option>
                      <option value="editing">Montaggio</option>
                      <option value="client_review">Rev. Cliente</option>
                      <option value="approved">Approvato</option>
                      <option value="published">Pubblicato</option>
                    </select>
                  </div>
                </div>
              </td>

              <td className="px-4 py-4 align-top text-right">
                <span className="text-white font-medium">
                  € {collab.total_budget?.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                </span>
              </td>
              
              <td className="px-4 py-4 align-top text-right">
                <div className="flex flex-col items-end">
                  <span className="text-neutral-300">
                    € {collab.agency_fee_amount?.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-neutral-500 text-xs">
                    ({collab.agency_fee_percentage}%)
                  </span>
                </div>
              </td>
              
              <td className="px-4 py-4 align-top text-right">
                <span className="text-green-400 font-semibold text-base bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20 inline-block">
                  € {collab.net_riccardo?.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                </span>
              </td>

              <td className="px-4 py-4 align-top text-right">
                <button
                  onClick={() => deleteCollaboration(collab.id)}
                  className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors mt-1"
                  title="Elimina"
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
