"use client";
import React, { useState, useEffect } from "react";
import NewEntryModal from "../forms/NewEntryModal";
import {
    getAPI_PhysicalData,
    postAPI_PhysicalData,
} from "@/libs/api/physicalDataAPI";
import { useTheme } from "@/hooks/useTheme";
import ActualDataCards from "./ActualDataCards";
import PhysicalDataChart from "./PhysicalDataChart";
const DashboardSuivi = () => {
    const [showNewEntryModal, setShowNewEntryModal] = useState(false);
    const [physicalData, setPhysicalData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Récupération des données physiques
    useEffect(() => {
        const fetchPhysicalData = async () => {
            try {
                setIsLoading(true);
                const response = await getAPI_PhysicalData();
                let data = response.map((item) => ({
                    ...item,
                    imc:
                        parseFloat(item.weight) /
                        ((item.height * item.height) / 10000),
                    created_at: new Date(item.created_at).toLocaleDateString(
                        "fr-FR",
                        {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        }
                    ),
                }));
                console.log(data);
                setPhysicalData(data);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                console.error(
                    "Erreur lors de la récupération des données physiques",
                    error
                );
            }
        };
        fetchPhysicalData();
    }, []);

    const handleCreatePhysicalData = async (newEntry) => {
        console.log(newEntry);
        try {
            const response = await postAPI_PhysicalData(
                newEntry.taille,
                newEntry.poids
            );

            let newData = {
                ...response,
                imc:
                    parseFloat(response.weight) /
                    ((response.height * response.height) / 10000),
            };
            newData.created_at = new Date(newData.created_at).toLocaleDateString(
                "fr-FR",
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                }
            );
            setPhysicalData([...physicalData, newData]);
            console.log(physicalData);
            setShowNewEntryModal(false);

        } catch (error) {
            setError(error.message);
            console.error(
                "Erreur lors de l'enregistrement des données physiques",
                error
            );
        }
    };


    if (physicalData.length === 0) {
        return (
            <>
                <div className="flex flex-col justify-center items-center h-full gap-4 my-auto">
                    <p className="text-lg lg:text-2xl text-text-secondary">Pas encore de données</p>
                    <button 
                    onClick={() => setShowNewEntryModal(true)}
                    className="bg-primary w-full md:w-auto lg:text-lg text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all"
                >
                    Ajouter une entrée
                </button>
            </div>
            {/* Modal */}
            {showNewEntryModal && (
                <NewEntryModal
                    isOpen={showNewEntryModal}
                    onClose={() => setShowNewEntryModal(false)}
                    onSubmit={handleCreatePhysicalData}
                />
            )}
            </>
        );

    }

    return (
        <>
            {/* Cards */}
            <ActualDataCards physicalData={physicalData} />

            {/* Graphique */}


            <PhysicalDataChart physicalData={physicalData} setShowNewEntryModal={setShowNewEntryModal} />

            {/* Modal */}
            {showNewEntryModal && (
                <NewEntryModal
                    isOpen={showNewEntryModal}
                    onClose={() => setShowNewEntryModal(false)}
                    onSubmit={handleCreatePhysicalData}
                />
            )}
        </>
    );
};

export default DashboardSuivi;
