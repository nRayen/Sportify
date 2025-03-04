"use client";

import { useState } from "react";
import {
	Plus,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import PlanningDayCard from "@/components/planning/PlanningDayCard";
import NewSessionModal from "@/components/forms/NewSessionModal";
import EditSessionModal from "@/components/forms/EditSessionModal";

const PagePlanning = () => {
	const [showNewSessionModal, setShowNewSessionModal] = useState(false);
	const [showEditSessionModal, setShowEditSessionModal] = useState(false);
	const [editedSession, setEditedSession] = useState(undefined)

	const [currentWeek, setCurrentWeek] = useState(new Date());
	const [exercises, setExercises] = useState([
		{ id: 1, name: "", sets: "", reps: "", weight: "" },
	]);

	// Ouvrir modal edit session avec infos de la session
	const openEditSessionModal = (session) => {
		setEditedSession(session)
		setShowEditSessionModal(true)
	}



	// Get current week's Monday
	const monday = new Date();
	monday.setDate(monday.getDate() - monday.getDay() + 1);

	// Données de test
	const sessions = [
		{
			id: 1,
			title: "Upper Body Workout",
			date: monday.toISOString().split("T")[0],
			time: "08:00",
			type: "Musculation",
			duration: 60,
			objective: "DQSJKDNSQDQSDNK",
			exercises: [
				
			]
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
		<div className=" w-full p-4 sm:p-6 lg:p-8">
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
			<div className="flex flex-col sm:flex-row flex-wrap gap-4 overflow-x-auto">
				{getWeekDates().map((date) => (
					<PlanningDayCard
						key={date.toISOString()}
						date={date}
						getSessionsForDate={getSessionsForDate}
						openEditSessionModal={openEditSessionModal}
						compact={false}
						editButton
					/>
				))}
			</div>

			{/* New Session Modal */}
			<NewSessionModal
				isOpen={showNewSessionModal}
				onClose={() => setShowNewSessionModal(false)}
			/>

			<EditSessionModal
				session={editedSession}
				isOpen={showEditSessionModal}
				onClose={() => setShowEditSessionModal(false)}
			/>
		</div>
	);
};

export default PagePlanning;
