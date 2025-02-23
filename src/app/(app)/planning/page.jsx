"use client";

import { useState } from "react";
import {
	Plus,
	ChevronLeft,
	ChevronRight,
	Clock,
	X,
	Dumbbell,
	Target,
} from "lucide-react";
import PlanningDayCard from "@/components/planning/PlanningDayCard";

const PagePlanning = () => {

	const [showNewSessionModal, setShowNewSessionModal] = useState(false);
	const [currentWeek, setCurrentWeek] = useState(new Date());
	const [exercises, setExercises] = useState([
		{ id: 1, name: "", sets: "", reps: "", weight: "" },
	]);

	// Get current week's Monday
	const monday = new Date();
	monday.setDate(monday.getDate() - monday.getDay() + 1);

	const sessions = [
		{
			id: 1,
			title: "Upper Body Workout",
			date: monday.toISOString().split("T")[0],
			time: "08:00",
			type: "Musculation",
			duration: 60,
		},
		{
			id: 2,
			title: "Cardio HIIT",
			date: monday.toISOString().split("T")[0],
			time: "17:30",
			type: "Cardio",
			duration: 30,
		},
		{
			id: 3,
			title: "Yoga Flow",
			date: new Date(monday.setDate(monday.getDate() + 1))
				.toISOString()
				.split("T")[0],
			time: "09:00",
			type: "Stretching",
			duration: 45,
		},
		{
			id: 4,
			title: "Lower Body Power",
			date: new Date(monday.setDate(monday.getDate() + 1))
				.toISOString()
				.split("T")[0],
			time: "16:00",
			type: "Musculation",
			duration: 75,
		},
		{
			id: 5,
			title: "Core Training",
			date: new Date(monday.setDate(monday.getDate() + 1))
				.toISOString()
				.split("T")[0],
			time: "12:30",
			type: "Musculation",
			duration: 45,
		},
		{
			id: 7,
			title: "Full Body Workout",
			date: new Date(monday.setDate(monday.getDate() + 3))
				.toISOString()
				.split("T")[0],
			time: "18:00",
			type: "Musculation",
			duration: 90,
		},
		{
			id: 8,
			title: "Mobility Work",
			date: new Date(monday.setDate(monday.getDate() + 1))
				.toISOString()
				.split("T")[0],
			time: "10:00",
			type: "Stretching",
			duration: 30,
		},
	];

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

	// Get sessions for a specific date
	const getSessionsForDate = (date) => {
		return sessions.filter(
			(session) => session.date === date.toISOString().split("T")[0]
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

	const addExercise = () => {
		setExercises([
			...exercises,
			{
				id: exercises.length + 1,
				name: "",
				sets: "",
				reps: "",
				weight: "",
			},
		]);
	};

	const removeExercise = (id) => {
		if (exercises.length > 1) {
			setExercises(exercises.filter((exercise) => exercise.id !== id));
		}
	};

	const updateExercise = (id, field, value) => {
		setExercises(
			exercises.map((exercise) =>
				exercise.id === id ? { ...exercise, [field]: value } : exercise
			)
		);
	};

	return (
		<div className="h-full w-full p-4 sm:p-6 lg:p-8">
			{/* Header Section */}
			<div className="bg-bgtone p-4 sm:p-6 rounded-2xl border-[1px] border-black/10 dark:border-white/5 shadow-md shadow-black/5 dark:shadow-white/5 mb-6 sm:mb-8">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-6">
					<div>
						<h1 className="text-3xl sm:text-4xl font-medium mb-2">Planning</h1>
						<p className="text-text-secondary">
							Gérez vos séances d'entraînement
						</p>
					</div>
					<button
						onClick={() => setShowNewSessionModal(true)}
						className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors w-full sm:w-auto"
					>
						<Plus size={20} />
						Nouvelle séance
					</button>
				</div>

				{/* Week Navigation */}
				<div className="flex items-center justify-between mt-4">
					<button
						onClick={previousWeek}
						className="p-2 hover:bg-background dark:hover:bg-background-dark rounded-lg transition-colors"
					>
						<ChevronLeft size={20} />
					</button>
					<h2 className="text-base sm:text-lg font-medium text-center">
						{getWeekDates()[0].toLocaleDateString("fr-FR", {
							day: "numeric",
							month: "long",
						})}{" "}
						-{" "}
						{getWeekDates()[6].toLocaleDateString("fr-FR", {
							day: "numeric",
							month: "long",
							year: "numeric",
						})}
					</h2>
					<button
						onClick={nextWeek}
						className="p-2 hover:bg-background dark:hover:bg-background-dark rounded-lg transition-colors"
					>
						<ChevronRight size={20} />
					</button>
				</div>
			</div>

			{/* Calendar Grid */}
			<div className="flex flex-col sm:flex-row flex-wrap gap-4 overflow-x-auto h-full">
				{getWeekDates().map((date) => (
					<PlanningDayCard
						key={date.toISOString()}
						date={date}
						getSessionsForDate={getSessionsForDate}
					/>
				))}
			</div>

			{/* New Session Modal */}
			{showNewSessionModal && (
				<>
					<div
						className="fixed inset-0 bg-black/50 z-50"
						onClick={() => setShowNewSessionModal(false)}
					/>
					<div className="fixed inset-x-0 bottom-0 z-50 p-4 animate-slide-up sm:p-6 lg:inset-y-[50px]">
						<div className="bg-bgtone rounded-2xl w-full max-w-4xl mx-auto h-[85vh] lg:h-full overflow-hidden flex flex-col">
							<div className="sticky top-0 bg-bgtone p-4 sm:p-6 border-b border-black/10 dark:border-white/5 z-10 flex-shrink-0">
								<div className="flex items-center justify-between">
									<h2 className="text-xl sm:text-2xl font-medium">
										Nouvelle séance
									</h2>
									<button
										onClick={() => setShowNewSessionModal(false)}
										className="p-2 hover:bg-background dark:hover:bg-background-dark rounded-lg transition-colors"
									>
										<X size={20} />
									</button>
								</div>
							</div>

							<div className="p-4 sm:p-6 overflow-y-auto flex-1">
								<form className="space-y-6">
									<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
										{/* Left Column - Basic Info & Objective */}
										<div className="space-y-6">
											{/* Basic Info Section */}
											<div className="space-y-4">
												<div>
													<label className="block text-sm text-text-secondary mb-1">
														Titre
													</label>
													<input
														type="text"
														className="w-full p-2 rounded-lg bg-background dark:bg-background-dark border-[1px] border-black/10 dark:border-white/5"
														placeholder="Nom de la séance"
													/>
												</div>
												<div>
													<label className="block text-sm text-text-secondary mb-1">
														Type
													</label>
													<select className="w-full p-2 rounded-lg bg-background dark:bg-background-dark border-[1px] border-black/10 dark:border-white/5">
														<option value="musculation">Musculation</option>
														<option value="cardio">Cardio</option>
														<option value="stretching">Stretching</option>
													</select>
												</div>
												<div className="grid grid-cols-2 gap-4">
													<div>
														<label className="block text-sm text-text-secondary mb-1">
															Date
														</label>
														<input
															type="date"
															className="w-full p-2 rounded-lg bg-background dark:bg-background-dark border-[1px] border-black/10 dark:border-white/5"
														/>
													</div>
													<div>
														<label className="block text-sm text-text-secondary mb-1">
															Heure
														</label>
														<input
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
												{exercises.map((exercise) => (
													<div
														key={exercise.id}
														className="bg-background dark:bg-background-dark rounded-lg p-4 border-[1px] border-black/10 dark:border-white/5"
													>
														<div className="flex items-start justify-between gap-4">
															<div className="flex-1 space-y-4">
																<input
																	type="text"
																	placeholder="Nom de l'exercice"
																	className="w-full p-2 rounded-lg bg-bgtone dark:bg-backgroundTone-dark border-[1px] border-black/10 dark:border-white/5"
																	value={exercise.name}
																	onChange={(e) =>
																		updateExercise(
																			exercise.id,
																			"name",
																			e.target.value
																		)
																	}
																/>
																<div className="grid grid-cols-3 gap-2">
																	<div>
																		<label className="block text-xs text-text-secondary mb-1">
																			Séries
																		</label>
																		<input
																			type="number"
																			className="w-full p-2 rounded-lg bg-bgtone dark:bg-backgroundTone-dark border-[1px] border-black/10 dark:border-white/5"
																			placeholder="3"
																			value={exercise.sets}
																			onChange={(e) =>
																				updateExercise(
																					exercise.id,
																					"sets",
																					e.target.value
																				)
																			}
																		/>
																	</div>
																	<div>
																		<label className="block text-xs text-text-secondary mb-1">
																			Répétitions
																		</label>
																		<input
																			type="number"
																			className="w-full p-2 rounded-lg bg-bgtone dark:bg-backgroundTone-dark border-[1px] border-black/10 dark:border-white/5"
																			placeholder="12"
																			value={exercise.reps}
																			onChange={(e) =>
																				updateExercise(
																					exercise.id,
																					"reps",
																					e.target.value
																				)
																			}
																		/>
																	</div>
																	<div>
																		<label className="block text-xs text-text-secondary mb-1">
																			Poids (kg)
																		</label>
																		<input
																			type="number"
																			className="w-full p-2 rounded-lg bg-bgtone dark:bg-backgroundTone-dark border-[1px] border-black/10 dark:border-white/5"
																			placeholder="20"
																			value={exercise.weight}
																			onChange={(e) =>
																				updateExercise(
																					exercise.id,
																					"weight",
																					e.target.value
																				)
																			}
																		/>
																	</div>
																</div>
															</div>
															<button
																type="button"
																onClick={() => removeExercise(exercise.id)}
																className="p-1 hover:bg-background dark:hover:bg-background-dark rounded-lg transition-colors text-text-secondary"
															>
																<X size={20} />
															</button>
														</div>
													</div>
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

									<div className="flex gap-4 pt-6 border-t border-black/10 dark:border-white/5">
										<button
											type="button"
											onClick={() => setShowNewSessionModal(false)}
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
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default PagePlanning;
