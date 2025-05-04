"use client";

import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import ExerciseCard from "./ExerciseCard";
import NewExerciseModal from "./NewExerciseModal";
import Loader from "../Loader";

const ExerciseLibrary = () => {
	const [activeTab, setActiveTab] = useState("personal");
	const [showNewExerciseModal, setShowNewExerciseModal] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [personalExercises, setPersonalExercises] = useState([]);
	const [publicExercises, setPublicExercises] = useState([]);
	const [error, setError] = useState(null);

	// Récupération des exercices
	useEffect(() => {
		// Récupération des exercices personnels
		const fetchPersonalExercises = async () => {
			try {
				setIsLoading(true);
				const response = await fetch("/api/exercices/personal", {
					credentials: "include",
				});
				if (!response.ok) {
					throw new Error(
						"Erreur lors de la récupération des exercices personnels"
					);
				}
				const data = await response.json();
				setPersonalExercises(data);
			} catch (err) {
				setError(err.message);
				console.error("Erreur:", err);
			} finally {
				setIsLoading(false);
			}
		};

		// Récupération des exercices publics
		const fetchPublicExercises = async () => {
			try {
				setIsLoading(true);
				const response = await fetch("/api/exercices/public", {
					credentials: "include",
				});
				if (!response.ok) {
					throw new Error(
						"Erreur lors de la récupération des exercices publics"
					);
				}
				const data = await response.json();
				setPublicExercises(data);
			} catch (err) {
				setError(err.message);
				console.error("Erreur:", err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPersonalExercises();
		fetchPublicExercises();
	}, []);

	// Création d'un exercice
	const handleCreateExercise = async (newExercise) => {
		try {
			const response = await fetch("/api/exercices", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(newExercise),
			});

			if (!response.ok) {
				throw new Error("Erreur lors de la création de l'exercice");
			}

			const createdExercise = await response.json();
			setPersonalExercises([...personalExercises, createdExercise]);
			setShowNewExerciseModal(false);
		} catch (err) {
			setError(err.message);
			console.error("Erreur:", err);
		}
	};

	// Mise à jour d'un exercice
	const handleUpdateExercise = async (updatedExercise) => {
		console.log("updatedExercise", updatedExercise);
		try {
			const response = await fetch(`/api/exercices/${updatedExercise.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({...updatedExercise, isPublic: updatedExercise.public}),
			});

			if (!response.ok) {
				throw new Error("Erreur lors de la mise à jour de l'exercice");
			}

			const updatedData = await response.json();
			setPersonalExercises(
				personalExercises.map((exercise) =>
					exercise.id === updatedExercise.id ? updatedData : exercise
				)
			);
		} catch (err) {
			setError(err.message);
			console.error("Erreur:", err);
		}
	};

	// Suppression d'un exercice
	const handleDeleteExercise = async (id) => {
		try {
			const response = await fetch(`/api/exercices/${id}`, {
				method: "DELETE",
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error("Erreur lors de la suppression de l'exercice");
			}

			setPersonalExercises(
				personalExercises.filter((exercise) => exercise.id !== id)
			);
		} catch (err) {
			setError(err.message);
			console.error("Erreur:", err);
		}
	};

	// Mise à jour du statut public d'un exercice
	const handleMakePublic = async (id) => {
		try {
			const response = await fetch(`/api/exercices/${id}/public`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ public: true }),
			});

			if (!response.ok) {
				throw new Error("Erreur lors de la mise à jour du statut public");
			}

			const updatedExercise = await response.json();
			setPersonalExercises(
				personalExercises.map((exercise) =>
					exercise.id === id ? updatedExercise : exercise
				)
			);
		} catch (err) {
			setError(err.message);
			console.error("Erreur:", err);
		}
	};

	const filteredPersonalExercises = personalExercises.filter((exercise) =>
		exercise.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const filteredPublicExercises = publicExercises.filter((exercise) =>
		exercise.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<>
			{/* Search and Add */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
				<div className="relative w-full sm:w-auto mb-4 sm:mb-0">
					<input
						type="text"
						placeholder="Rechercher un exercice..."
						className="pl-10 pr-4 py-2 rounded-xl bg-bgtone border-[1px] border-black/10 dark:border-white/5 w-full sm:w-80"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<Search
						className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
						size={18}
					/>
				</div>
				<button
					onClick={() => setShowNewExerciseModal(true)}
					className="flex items-center justify-center gap-2 w-full md:w-auto bg-primary text-white px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
				>
					<Plus size={18} />
					<span>Nouvel exercice</span>
				</button>
			</div>

			{/* Tabs */}
			<div className="flex border-b border-black/10 dark:border-white/5 mb-6">
				<button
					className={`px-4 py-2 font-medium ${
						activeTab === "personal"
							? "text-primary border-b-2 border-primary"
							: "text-text-secondary"
					}`}
					onClick={() => setActiveTab("personal")}
				>
					Mes exercices
				</button>
				<button
					className={`px-4 py-2 font-medium ${
						activeTab === "public"
							? "text-primary border-b-2 border-primary"
							: "text-text-secondary"
					}`}
					onClick={() => setActiveTab("public")}
				>
					Exercices publics
				</button>
			</div>

			{/* Exercise Cards or Loading State */}
			{isLoading ? (
				<div className="flex items-center justify-center min-h-[200px]">
					<Loader />
				</div>
			) : error ? (
				<div className="text-center py-8">
					<p className="text-red-500 mb-2">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="text-primary font-medium"
					>
						Réessayer
					</button>
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{activeTab === "personal"
							? filteredPersonalExercises.map((exercise) => (
									<ExerciseCard
										key={exercise.id}
										exercise={exercise}
										onUpdate={handleUpdateExercise}
										onDelete={handleDeleteExercise}
										onMakePublic={handleMakePublic}
										isPersonal={true}
									/>
								))
							: filteredPublicExercises.map((exercise) => (
									<ExerciseCard
										key={exercise.id}
										exercise={exercise}
										isPersonal={false}
									/>
								))}
					</div>

					{/* No results message */}
					{activeTab === "personal" &&
						filteredPersonalExercises.length === 0 && (
							<div className="text-center py-8">
								<p className="text-text-secondary mb-2">
									Aucun exercice trouvé
								</p>
								<button
									onClick={() => setShowNewExerciseModal(true)}
									className="text-primary font-medium"
								>
									Créer un nouvel exercice
								</button>
							</div>
						)}

					{activeTab === "public" && filteredPublicExercises.length === 0 && (
						<div className="text-center py-8">
							<p className="text-text-secondary">
								Aucun exercice public trouvé
							</p>
						</div>
					)}
				</>
			)}

			{/* New Exercise Modal */}
			<NewExerciseModal
				isOpen={showNewExerciseModal}
				onClose={() => setShowNewExerciseModal(false)}
				onCreate={handleCreateExercise}
			/>
		</>
	);
};

export default ExerciseLibrary;
