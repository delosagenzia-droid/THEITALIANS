"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { X, Loader2 } from "lucide-react";

type ContactType = "video" | "proposal" | "delos";

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ContactType;
  onSuccess: () => void;
}

export function AddContactModal({ isOpen, onClose, type, onSuccess }: AddContactModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const supabase = createClient();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("riccardo_contacts").insert([
        {
          contact_type: type,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          status: "new",
        },
      ]);

      if (error) throw error;
      
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Errore nell'inserimento:", err);
      alert("Si è verificato un errore durante l'inserimento del contatto.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getTitle = () => {
    switch (type) {
      case "video": return "Nuovo Contatto Video";
      case "proposal": return "Nuova Proposta B2B";
      case "delos": return "Nuovo Contatto Delos";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex justify-between items-center p-6 border-b border-neutral-800">
          <h2 className="text-xl font-medium text-white">{getTitle()}</h2>
          <button 
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-neutral-400">Nome <span className="text-red-500">*</span></label>
            <input 
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neutral-500 transition-colors"
              placeholder="Es. Mario Rossi"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-neutral-400">Email <span className="text-red-500">*</span></label>
              <input 
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neutral-500 transition-colors"
                placeholder="mario@email.com"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-neutral-400">Telefono</label>
              <input 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neutral-500 transition-colors"
                placeholder="+39 333 000 0000"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-neutral-400">Azienda (Opzionale)</label>
            <input 
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neutral-500 transition-colors"
              placeholder="Es. Rossi Srl"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-neutral-400">Messaggio / Note</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neutral-500 transition-colors resize-none"
              placeholder="Scrivi qui i dettagli della richiesta..."
            />
          </div>

          <div className="pt-4 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Salva Contatto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
