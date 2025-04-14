import { useState, useEffect } from "react";
import { Dumbbell, Target, Plus, Info } from "lucide-react";
import AddExerciseForm from "./AddExerciseForm";
import Modal from "../ui/Modal";

const NewSeanceModal = ({ isOpen, onClose, onSubmit }) => {
	const [title, setTitle] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [duration, setDuration] = useState("");
	const [objective, setObjective] = useState("");
	const [exerciseList, setExerciseList] = useState([]);

	const [personalExercises, setPersonalExercises] = useState([]);
	const [exercisesLoading, setExercisesLoading] = useState(false);

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

	const addExercise = () => {
		setExerciseList([
			...exerciseList,
			{
				id: exerciseList.length + 1,
				id_exercice: null,
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
	const handleSubmit = (e) => {
		e.preventDefault();
		const newSeance = {
			title,
			date: new Date(`${date}T${time}:00Z`).toISOString(),
			duration: parseInt(duration),
			objective,
			exercises: exerciseList,
		};
		console.log(exerciseList);
		onSubmit(newSeance);
		resetForm();
		onClose();
	};

	// Reset form
	const resetForm = () => {
		setTitle("");
		setDate("");
		setTime("");
		setDuration("");
		setObjective("");
		setExerciseList([]);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Nouvelle séance">
			<form className="space-y-6" onSubmit={handleSubmit}>
				<div className="gap-6 h-full">
					{/* Left Column - Basic Info & Objective */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 space-y-6">
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
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									type="text"
									className="w-full p-2 rounded-lg bg-background dark:bg-background-dark border-[1px] border-black/10 dark:border-white/5"
									placeholder="Nom de la séance"
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
									value={duration}
									onChange={(e) => setDuration(e.target.value)}
									type="number"
									className="w-full p-2 rounded-lg bg-background dark:bg-background-dark border-[1px] border-black/10 dark:border-white/5"
									placeholder="60"
								/>
							</div>
						</div>

						{/* Objective Section */}
						<div>
							<div className="flex items-center gap-2 mb-4">
								<Target size={20} className="text-primary" />
								<h3 className="text-lg font-medium">
									Objectif de la séance
								</h3>
							</div>
							<textarea
								value={objective}
								onChange={(e) => setObjective(e.target.value)}
								className="w-full p-3 rounded-lg bg-background dark:bg-background-dark border-[1px] border-black/10 dark:border-white/5 min-h-[150px] lg:min-h-[200px]"
								placeholder="Décrivez l'objectif de cette séance..."
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

				{/* Boutons */}
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
						Créer
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default NewSeanceModal;
