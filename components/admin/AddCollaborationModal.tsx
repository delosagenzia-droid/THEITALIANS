"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";
import { X, Loader2, Euro } from "lucide-react";

interface AddCollaborationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddCollaborationModal({ isOpen, onClose, onSuccess }: AddCollaborationModalProps) {
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    brand_name: "",
    contact_person: "",
    contact_email: "",
    project_description: "",
    deliverables: "",
    total_budget: "0",
    agency_fee_percentage: "15",
    status: "negotiation",
    contract_status: "pending",
    production_status: "briefing",
  });

  const [computedNet, setComputedNet] = useState({ fee: 0, riccardo: 0 });

  const supabase = createClient();

  // Calcolo al volo Fee e Netto
  useEffect(() => {
    const budget = parseFloat(formData.total_budget || "0");
    const feePerc = parseFloat(formData.agency_fee_percentage || "0");
    
    if (budget >= 0 && feePerc >= 0) {
      const fee = budget * (feePerc / 100);
      setComputedNet({
        fee,
        riccardo: budget - fee
      });
    }
  }, [formData.total_budget, formData.agency_fee_percentage]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Il database calcolerà da solo i netti ma li passiamo comunque per chiarezza (generati)
      // I campi GENERATED ALWAYS non vanno inseriti nella query
      const { error } = await supabase.from("riccardo_collaborations").insert([
        {
          brand_name: formData.brand_name,
          contact_person: formData.contact_person,
          contact_email: formData.contact_email,
          project_description: formData.project_description,
          deliverables: formData.deliverables,
          total_budget: parseFloat(formData.total_budget || "0"),
          agency_fee_percentage: parseFloat(formData.agency_fee_percentage || "15"),
          status: formData.status,
          contract_status: formData.contract_status,
          production_status: formData.production_status,
          invoice_status: "to_issue" // default
        },
      ]);

      if (error) throw error;
      
      setFormData({
        brand_name: "", contact_person: "", contact_email: "", 
        project_description: "", deliverables: "", 
        total_budget: "0", agency_fee_percentage: "15",
        status: "negotiation", contract_status: "pending", production_status: "briefing"
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Errore nell'inserimento:", err);
      // alert ignorato in prod se poss, usiamo console per ora
      alert("Si è verificato un errore durante la creazione.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl my-8 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-neutral-800 bg-neutral-950/50 sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-medium text-white">Nuova Collaborazione</h2>
            <p className="text-sm text-neutral-400">Registra un nuovo deal per la sezione personale.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors bg-neutral-900 p-2 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          
          {/* SEZIONE BRAND */}
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-wider text-neutral-500 font-semibold border-b border-neutral-800 pb-2">Dettagli Brand</h3>
            
            <div className="space-y-1">
              <label className="text-sm text-neutral-400">Azienda / Brand <span className="text-red-500">*</span></label>
              <input required name="brand_name" value={formData.brand_name} onChange={handleChange}
                className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors"
                placeholder="Es. Prada Group" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm text-neutral-400">Referente</label>
                <input name="contact_person" value={formData.contact_person} onChange={handleChange}
                  className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-neutral-400">Email Referente</label>
                <input type="email" name="contact_email" value={formData.contact_email} onChange={handleChange}
                  className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* SEZIONE PROGETTO E STATO */}
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-wider text-neutral-500 font-semibold border-b border-neutral-800 pb-2">Progetto e Stato</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm text-neutral-400">Fase Trattativa</label>
                <select name="status" value={formData.status} onChange={handleChange}
                  className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:outline-none cursor-pointer">
                  <option value="lead">Lead (Contatto Iniziale)</option>
                  <option value="negotiation">Trattativa (In Negoziazione)</option>
                  <option value="contract_sent">Contratto Inviato</option>
                  <option value="signed">Firmato (Vinto)</option>
                  <option value="lost">Perso / Annullato</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm text-neutral-400">Stato Contratti</label>
                <select name="contract_status" value={formData.contract_status} onChange={handleChange}
                  className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:outline-none cursor-pointer">
                  <option value="pending">In Attesa</option>
                  <option value="sent">Inviato al Cliente</option>
                  <option value="signed">Firmato da Entrambi</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm text-neutral-400">Fase Produzione</label>
                <select name="production_status" value={formData.production_status} onChange={handleChange}
                  className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:outline-none cursor-pointer">
                  <option value="briefing">📝 Briefing / Idea</option>
                  <option value="script">✍️ Stesura Script</option>
                  <option value="recording">🎥 Registrazione</option>
                  <option value="editing">✂️ Montaggio</option>
                  <option value="client_review">🔍 Revisione Cliente</option>
                  <option value="approved">✅ Approvato</option>
                  <option value="published">🚀 Pubblicato</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-neutral-400">Output Richiesto (Deliverables)</label>
              <input name="deliverables" value={formData.deliverables} onChange={handleChange}
                className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-white/20"
                placeholder="Es. 2 Post IG + 1 TikTok + Cessione Diritti 6 mesi" />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm text-neutral-400">Descrizione Interna</label>
              <textarea name="project_description" value={formData.project_description} onChange={handleChange} rows={2}
                className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:outline-none resize-none" />
            </div>
          </div>

          {/* SEZIONE ECONOMICA */}
          <div className="space-y-4 bg-neutral-950 p-6 rounded-xl border border-[#8B6E4E]/20">
            <h3 className="text-sm uppercase tracking-wider text-[#8B6E4E] font-semibold border-b border-[#8B6E4E]/20 pb-2 flex items-center gap-2">
              <Euro className="w-4 h-4" /> Dati Economici
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm text-neutral-400">Budget Totale (€) <span className="text-red-500">*</span></label>
                <input required type="number" step="0.01" min="0" name="total_budget" value={formData.total_budget} onChange={handleChange}
                  className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white text-lg font-medium focus:outline-none focus:ring-1 focus:ring-[#8B6E4E]" />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-neutral-400">Fee Agenzia (%)</label>
                <input required type="number" step="0.1" min="0" max="100" name="agency_fee_percentage" value={formData.agency_fee_percentage} onChange={handleChange}
                  className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:ring-1 focus:ring-[#8B6E4E]" />
              </div>
            </div>

            {/* LIVE PREVIEW SIMULATA */}
            <div className="mt-4 flex gap-4 p-4 bg-black rounded-lg border border-neutral-800/50 pt-5">
              <div className="flex-1 border-r border-neutral-800">
                <p className="text-xs text-neutral-500 mb-1">Fee Agenzia (Lorda)</p>
                <p className="text-xl font-medium text-white">€ {computedNet.fee.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="flex-1 pl-4">
                <p className="text-xs text-neutral-500 mb-1">Netto Spettante a Riccardo</p>
                <p className="text-xl font-medium text-green-400">€ {computedNet.riccardo.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>

          </div>

          <div className="pt-6 flex gap-3 justify-end border-t border-neutral-800">
            <button type="button" onClick={onClose}
              className="px-6 py-3 rounded-lg text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
              Annulla
            </button>
            <button type="submit" disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-[#8B6E4E] text-white rounded-lg text-sm font-medium hover:bg-[#A38B70] transition-colors shadow-lg shadow-[#8B6E4E]/20 disabled:opacity-50">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Salva Contratto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
