import { useState, useEffect } from "react";
import { X, Dumbbell, Target, Plus, Info } from "lucide-react";
import Modal from "../ui/Modal";
import { putAPI_Seances } from "../../libs/api/seanceAPI";
import AddExerciseForm from "./AddExerciseForm";

const EditSeanceModal = ({ isOpen, onClose, seance, onSubmit }) => {
	const [title, setTitle] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [duration, setDuration] = useState("");
	const [objective, setObjective] = useState("");
	const [exerciseList, setExerciseList] = useState([]);
	const [personalExercises, setPersonalExercises] = useState([]);
	const [exercisesLoading, setExercisesLoading] = useState(false);

	console.log(seance);
	// Récupérer les exercices personnels
	useEffect(() => {
		const fetchPersonalExercises = async () => {
			try {
				setExercisesLoading(true);
				const response = await fetch("/api/exercices/personal");
				if (!response.ok)
					throw new Error(
						"Erreur lors de la récupération des exercices personnels"
					);
				const data = await response.json();
				setPersonalExercises(data);
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des exercices personnels:",
					error
				);
			} finally {
				setExercisesLoading(false);
			}
		};
		fetchPersonalExercises();
	}, []);

	// Initialiser les valeurs avec les données de la séance
	useEffect(() => {
		if (seance) {
			setTitle(seance.title || "");
			setDate(
				seance.date ? new Date(seance.date).toISOString().split("T")[0] : ""
			);
			setTime(seance.date.split("T")[1].slice(0, 5) || "");
			setDuration(seance.duration || 0);
			setObjective(seance.objective || 0);
			setExerciseList(seance.ExerciceStats || []);
		}
	}, [seance]);

	const addExercise = () => {
		setExerciseList([
			...exerciseList,
			{
				id: exerciseList.length + 1,
				name: "",
				sets: "",
				reps: "",
				weight: "",
			},
		]);
	};

	const removeExercise = (id) => {
		setExerciseList(exerciseList.filter((exercise) => exercise.id !== id));
	};

	const updateExercise = (id, field, value) => {
		setExerciseList(
			exerciseList.map((exercise) =>
				exercise.id === id ? { ...exercise, [field]: value } : exercise
			)
		);
	};

	// Handle submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		const updatedSeance = {
			title,
			date: new Date(`${date}T${time}:00Z`).toISOString(),
			duration: parseInt(duration),
			objective,
			exercises: exerciseList,
		};
		onSubmit(seance.id, updatedSeance);
		onClose();
		// try {
		// 	await putAPI_Seances(seance.id, updatedSeance);
		// 	onClose();
		// } catch (error) {
		// 	console.error("Erreur lors de la mise à jour de la séance:", error);
		// }
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Modifier séance">
			<form className="space-y-6" onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
					{/* Left Column - Basic Info & Objective */}
					<div className="space-y-6">
						{/* Basic Info Section */}
						<div className="space-y-4">
							<div className="flex items-center gap-2 mb-4">
								<Info size={20} className="text-primary" />
								<h3 className="text-lg font-medium">
									Informations de la séance
								</h3>
							</div>
							<div>
								<label className="block text-sm text-text-secondary mb-1">
									Titre
								</label>
								<input
									required
									type="text"
									className="w-full p-2 rounded-lg bg-background dark:bg-background-dark border-[1px] border-black/10 dark:border-white/5"
									placeholder="Nom de la séance"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm text-text-secondary mb-1">
										Date
									</label>
									<input
										required
										value={date}
										onChange={(e) => setDate(e.target.value)}
										type="date"
										className="w-full p-2 rounded-lg bg-background dark:bg-background-dark border-[1px] border-black/10 dark:border-white/5"
									/>
								</div>
								<div>
									<label className="block text-sm text-text-secondary mb-1">
										Heure
									</label>
									<input
										required
										value={time}
										onChange={(e) => setTime(e.target.value)}
										type="time"
										className="w-full p-2 rounded-lg bg-background dark:bg-background-dark border-[1px] border-black/10 dark:border-white/5"
									/>
								</div>
							</div>
							<div>
								<label className="block text-sm text-text-secondary mb-1">
									Durée (minutes)
								</label>
								<input
									required
									type="number"
									value={duration}
									onChange={(e) => setDuration(e.target.value)}
									className="w-full p-2 rounded-lg bg-background dark:bg-background-dark border-[1px] border-black/10 dark:border-white/5"
									placeholder="60"
								/>
							</div>
						</div>

						{/* Objective Section */}
						<div>
							<div className="flex items-center gap-2 mb-4">
								<Target size={20} className="text-primary" />
								<h3 className="text-lg font-medium">Objectif de la séance</h3>
							</div>
							<textarea
								className="w-full p-3 rounded-lg bg-background dark:bg-background-dark border-[1px] border-black/10 dark:border-white/5 min-h-[150px] lg:min-h-[200px]"
								placeholder="Décrivez l'objectif de cette séance..."
								value={objective}
								onChange={(e) => setObjective(e.target.value)}
							/>
						</div>
					</div>

					{/* Right Column - Exercises */}
					<div>
						<div className="flex items-center gap-2 mb-4">
							<Dumbbell size={20} className="text-primary" />
							<h3 className="text-lg font-medium">Exercices</h3>
						</div>
						<div className="space-y-4">
							<div>
								<div className="space-y-4">
									{exerciseList.map((exercise) => (
										<AddExerciseForm
											key={exercise.id}
											exercise={exercise}
											onUpdate={updateExercise}
											onRemove={removeExercise}
											personalExercises={personalExercises}
											loading={exercisesLoading}
										/>
									))}
								</div>
							</div>
							<button
								type="button"
								onClick={addExercise}
								className="w-full py-3 rounded-lg border-2 border-dashed border-black/10 dark:border-white/5 hover:border-primary/50 hover:bg-primary/5 transition-colors text-text-secondary flex items-center justify-center gap-2"
							>
								<Plus size={20} />
								Ajouter un exercice
							</button>
						</div>
					</div>
				</div>

				<div className="flex gap-4 pt-6 border-t border-black/10 dark:border-white/5">
					<button
						type="button"
						onClick={onClose}
						className="flex-1 py-2 rounded-lg border-[1px] border-black/10 dark:border-white/5 hover:bg-background dark:hover:bg-background-dark transition-colors"
					>
						Annuler
					</button>
					<button
						type="submit"
						className="flex-1 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
					>
						Mettre à jour
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default EditSeanceModal;
