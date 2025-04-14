"use client";

import { useEffect, useState } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import PlanningDayCard from "./PlanningDayCard";
import NewSeanceModal from "@/components/forms/NewSeanceModal";
import EditSeanceModal from "@/components/forms/EditSeanceModal";
import {
	deleteAPI_Seances,
	getAPI_Seances,
	postAPI_Seances,
	putAPI_Seances,
} from "@/libs/api/seanceAPI";
import Loader from "../Loader";

const PlanningSeance = () => {
	const [showNewSeanceModal, setShowNewSeanceModal] = useState(false);
	const [showEditSeanceModal, setShowEditSeanceModal] = useState(false);
	const [editedSeance, setEditedSeance] = useState(null);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [seances, setSeances] = useState([]);
	const [currentWeek, setCurrentWeek] = useState(new Date());

	// Ouvrir modal edit seance avec infos de la seance
	const openEditSeanceModal = (seance) => {
		setEditedSeance(seance);
		setShowEditSeanceModal(true);
	};

	// Récupérer les seances
		useEffect(() => {
			// Récupération des exercices personnels
			const fetchSeances = async () => {
				try {
					setIsLoading(true);
					const response = await fetch("/api/seances");
					if (!response.ok) {
						throw new Error(
							"Erreur lors de la récupération des seances"
						);
					}
					const data = await response.json();
					setSeances(data);
				} catch (err) {
					setError(err.message);
					console.error("Erreur:", err);
				} finally {
					setIsLoading(false);
				}
			};

			fetchSeances();
		}, []);

	// Créer une seance
	const handleCreateSeance = async (newSeance) => {
		try {
			const response = await postAPI_Seances(newSeance);
			setSeances([...seances, response]);
			setShowNewSeanceModal(false);
		} catch (error) {
			setError(error.message);
			console.error("Erreur lors de la création de la seance", error);
		}
	};

	// Mettre à jour une seance
	const handleUpdateSeance = async (id, updatedSeance) => {
		try {
			const response = await putAPI_Seances(
				id,
				updatedSeance
			);
			console.log(response);
			setSeances(
				seances.map((seance) =>
					seance.id === id ? response : seance
				)
			);
		} catch (error) {
			setError(error.message);
			console.error("Erreur lors de la mise à jour de la seance", error);
		}
	};

	// Supprimer une seance
	const handleDeleteSeance = async (id) => {
		try {
			const response = await deleteAPI_Seances(id);
			setSeances(seances.filter((seance) => seance.id !== id));
		} catch (error) {
			setError(error.message);
			console.error("Erreur lors de la suppression de la seance", error);
		}
	};

	// Get current week's Monday
	const monday = new Date();
	monday.setDate(monday.getDate() - monday.getDay() + 1);

	// Get week dates
	const getWeekDates = () => {
		const dates = [];
		const startDate = new Date(currentWeek);
		startDate.setDate(startDate.getDate() - startDate.getDay() + 1);

		for (let i = 0; i < 7; i++) {
			const date = new Date(startDate);
			date.setDate(startDate.getDate() + i);
			dates.push(date);
		}
		return dates;
	};

	// Get seances for a specific date
	const getSeancesForDate = (date) => {
		return seances.filter(
			(seance) => seance.date.split("T")[0] === date.toISOString().split("T")[0]
		);
	};

	// Navigate weeks
	const previousWeek = () => {
		const newDate = new Date(currentWeek);
		newDate.setDate(newDate.getDate() - 7);
		setCurrentWeek(newDate);
	};

	const nextWeek = () => {
		const newDate = new Date(currentWeek);
		newDate.setDate(newDate.getDate() + 7);
		setCurrentWeek(newDate);
	};

	return (
		<>
			{/* Add New Session Button */}
			<div className="flex justify-end mb-6">
				<button
					onClick={() => setShowNewSeanceModal(true)}
					className="flex items-center justify-center gap-2 w-full md:w-auto bg-primary text-white px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
				>
					<Plus size={20} />
					Nouvelle séance
				</button>
			</div>

			{/* Week Navigation */}
			<div className="bg-bgtone p-6 rounded-xl border-[1px] border-black/10 dark:border-white/5 shadow-sm mb-6">
				<div className="flex items-center justify-between">
					<button
						onClick={previousWeek}
						className="p-2.5 hover:bg-background dark:hover:bg-background-dark rounded-lg transition-all duration-200 hover:shadow-sm"
						aria-label="Semaine précédente"
					>
						<ChevronLeft
							size={20}
							className="text-text-secondary"
						/>
					</button>
					<div className="flex flex-col items-center">
						<h2 className="text-xl font-medium mb-1 text-center">
							{getWeekDates()[0].toLocaleDateString("fr-FR", {
								day: "numeric",
							})}{" "}
							-{" "}
							{getWeekDates()[6].toLocaleDateString("fr-FR", {
								day: "numeric",
								month: "long",
								year: "numeric",
							})}
						</h2>
						<p className="text-sm text-text-secondary">
							{getWeekDates()[0].toLocaleDateString("fr-FR", {
								weekday: "long",
							})}{" "}
							-{" "}
							{getWeekDates()[6].toLocaleDateString("fr-FR", {
								weekday: "long",
							})}
						</p>
					</div>
					<button
						onClick={nextWeek}
						className="p-2.5 hover:bg-background dark:hover:bg-background-dark rounded-lg transition-all duration-200 hover:shadow-sm"
						aria-label="Semaine suivante"
					>
						<ChevronRight
							size={20}
							className="text-text-secondary"
						/>
					</button>
				</div>
			</div>

			{/* Calendar Grid */}
			{isLoading ? (
				<div className="flex justify-center items-center h-full">
					<Loader />
				</div>
			) : (
				<div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
				{getWeekDates().map((date) => (
					<PlanningDayCard
						key={date.toISOString()}
						date={date}
						seances={seances}
						getSeancesForDate={getSeancesForDate}
						openEditSeanceModal={openEditSeanceModal}
						handleDeleteSeance={handleDeleteSeance}
						compact={false}
						editButton={true}
					/>
					))}
				</div>
			)}

			{/* Modals */}
			<NewSeanceModal
				isOpen={showNewSeanceModal}
				onClose={() => setShowNewSeanceModal(false)}
				onSubmit={handleCreateSeance}
			/>

			{/* Modal edit seance */}
			{editedSeance && (
				<EditSeanceModal
					seance={editedSeance}
					isOpen={showEditSeanceModal}
					onClose={() => setShowEditSeanceModal(false)}
					onSubmit={handleUpdateSeance}
				/>
			)}
		</>
	);
};

export default PlanningSeance;
