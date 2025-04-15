"use client"
import React, { useState } from "react";
import { Plus } from "lucide-react";
import NewEntryModal from "../forms/NewEntryModal";
import { postAPI_PhysicalData } from "@/libs/api/physicalDataAPI";

const DashboardSuivi = () => {
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);

  const handleCreatePhysicalData = async (newEntry) => {
    try {
      const response = await postAPI_PhysicalData(newEntry.taille, newEntry.poids);
      setPhysicalData([...physicalData, response]);
      setShowNewEntryModal(false);
    } catch (error) {
        setError(error.message);
        console.error("Erreur lors de l'enregistrement des données physiques", error);
    }
  };

  return (
    <>
      {/* Add New Session Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowNewEntryModal(true)}
          className="flex items-center justify-center gap-2 w-full md:w-auto bg-primary text-white px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Plus size={20} />
          Nouvelle entrée
        </button>

        {showNewEntryModal && (
          <NewEntryModal
            isOpen={showNewEntryModal} 
            onClose={() => setShowNewEntryModal(false)} 
            onSubmit={handleCreatePhysicalData} />
        )}
      </div>
    </>
  );
};

export default DashboardSuivi;
