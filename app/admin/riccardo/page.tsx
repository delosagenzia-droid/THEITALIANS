"use client";

import { useState } from "react";
import { ContactsTable } from "@/components/riccardo/ContactsTable";
import { AddContactModal } from "@/components/riccardo/AddContactModal";
import { Video, Briefcase, Rocket, Plus, LogOut, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Tab = "video" | "proposal" | "delos";

export default function RiccardoAdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("video");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleContactAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans selection:bg-white/20">
      
      {/* HEADER PAGE */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight mb-4">
            Area <span className="font-semibold text-[#8B6E4E]">Riccardo</span>
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl font-light">
            Gestisci i contatti in entrata relativi a produzioni video, proposte di collaborazione ed entità Delos Lab.
          </p>
        </div>
        
        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3">
          <Link 
            href="/admin/dashboard"
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <form action="/auth/signout" method="post">
            <button 
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Esci</span>
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* TABS NAVIGATION */}
        <div className="flex bg-neutral-900 p-1.5 rounded-2xl w-full max-w-2xl overflow-x-auto ring-1 ring-white/5">
          <button
            onClick={() => setActiveTab("video")}
            className={`flex-1 flex items-center justify-center gap-3 py-3 px-6 rounded-xl text-sm font-medium transition-all ${
              activeTab === "video" 
              ? "bg-neutral-800 text-white shadow-lg shadow-black/20" 
              : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
            }`}
          >
            <Video className="w-4 h-4" />
            Video Aziendali
          </button>
          
          <button
            onClick={() => setActiveTab("proposal")}
            className={`flex-1 flex items-center justify-center gap-3 py-3 px-6 rounded-xl text-sm font-medium transition-all ${
              activeTab === "proposal" 
              ? "bg-neutral-800 text-white shadow-lg shadow-black/20" 
              : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Proposte (B2B)
          </button>
          
          <button
            onClick={() => setActiveTab("delos")}
            className={`flex-1 flex items-center justify-center gap-3 py-3 px-6 rounded-xl text-sm font-medium transition-all ${
              activeTab === "delos" 
              ? "bg-neutral-800 text-white shadow-lg shadow-black/20" 
              : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
            }`}
          >
            <Rocket className="w-4 h-4" />
            Delos Lab
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="bg-neutral-900/40 rounded-3xl pb-0 overflow-hidden ring-1 ring-white/5 border border-white/10 backdrop-blur-sm shadow-2xl">
          
          {/* Header Section per il feed */}
          <div className="px-6 py-6 lg:px-10 lg:py-8 border-b border-white/5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-medium text-white mb-1">
                {activeTab === "video" && "Richieste Video Aziendali"}
                {activeTab === "proposal" && "Proposte di Collaborazione"}
                {activeTab === "delos" && "Contatti Delos Lab"}
              </h2>
              <p className="text-sm text-neutral-500">
                Gestisci e aggiungi i contatti per questa categoria.
              </p>
            </div>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Nuovo Contatto</span>
            </button>
          </div>

          {/* TABLE COMPONENT ENCAPSULATED */}
          <div className="p-4 lg:p-8">
            <ContactsTable type={activeTab} refreshTrigger={refreshTrigger} />
          </div>
          
        </div>

      </div>

      <AddContactModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={activeTab}
        onSuccess={handleContactAdded}
      />
    </div>
  );
}
