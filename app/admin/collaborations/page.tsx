"use client";

import { useState } from "react";
import { CollaborationsTable } from "@/components/admin/CollaborationsTable";
import { AddCollaborationModal } from "@/components/admin/AddCollaborationModal";
import { Plus, ArrowLeft, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function CollaborationsAdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCollaborationAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans selection:bg-white/20">
      
      {/* HEADER PAGE */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight mb-4 flex items-center gap-4">
            Gestione <span className="font-semibold text-[#8B6E4E]">Collaborazioni</span>
            <TrendingUp className="w-8 h-8 text-[#8B6E4E] hidden md:block" />
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl font-light">
            Traccia i deal personali di Riccardo, monitora l'Agncy Fee prestabilita, lo stato dei contratti e i netti spettanti.
          </p>
        </div>
        
        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3">
          <Link 
            href="/admin/riccardo"
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Area Contatti</span>
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#8B6E4E] text-white rounded-lg text-sm font-medium hover:bg-[#A38B70] transition-colors shadow-lg shadow-[#8B6E4E]/20"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nuovo Deal</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* CONTENT AREA */}
        <div className="bg-neutral-900/40 rounded-3xl pb-0 overflow-hidden ring-1 ring-white/5 border border-white/10 backdrop-blur-sm shadow-2xl">
          
          <div className="px-6 py-6 lg:px-10 lg:py-8 border-b border-white/5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-medium text-white mb-1">
                Pipeline Deal Attivi
              </h2>
              <p className="text-sm text-neutral-500">
                Visualizzazione finanziaria e stato avanzamento progetti.
              </p>
            </div>
          </div>

          <div className="p-4 lg:p-8">
            <CollaborationsTable refreshTrigger={refreshTrigger} />
          </div>
          
        </div>
      </div>

      <AddCollaborationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleCollaborationAdded}
      />
    </div>
  );
}
