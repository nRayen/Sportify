// import { useState } from "react";
import { Plus, Search } from "lucide-react";
import ExerciseCard from "@/components/exercices/ExerciseCard";
import NewExerciseModal from "@/components/exercices/NewExerciseModal";
import ExerciseLibrary from "@/components/exercices/ExerciseLibrary";
import { Suspense } from "react";

const PageExercices = async () => {
	// const [activeTab, setActiveTab] = useState("personal");
	// const [showNewExerciseModal, setShowNewExerciseModal] = useState(false);
	// const [searchQuery, setSearchQuery] = useState("");
	// const [isLoading, setIsLoading] = useState(false);
	// const [personalExercises, setPersonalExercises] = useState();

	// Récupération des exercices personnels




	// const [publicExercises, setPublicExercises] = useState([
	// 	{
	// 		id: 3,
	// 		title: "Traction",
	// 		description: "Exercice de musculation pour le dos",
	// 		public: true,
	// 	},
	// 	{
	// 		id: 4,
	// 		title: "Curl biceps",
	// 		description: "Exercice de musculation pour les bras",
	// 		public: true,
	// 	},
	// ]);

	const handleCreateExercise = (newExercise) => {
		setPersonalExercises([
			...personalExercises,
			{
				id: personalExercises.length + 1,
				...newExercise,
				public: false,
			},
		]);
	};

	const handleUpdateExercise = (updatedExercise) => {
		setPersonalExercises(
			personalExercises.map((exercise) =>
				exercise.id === updatedExercise.id ? updatedExercise : exercise
			)
		);
	};

	const handleDeleteExercise = (id) => {
		setPersonalExercises(
			personalExercises.filter((exercise) => exercise.id !== id)
		);
	};

	const handleMakePublic = (id) => {
		const exercise = personalExercises.find((ex) => ex.id === id);
		if (exercise) {
			const updatedExercise = { ...exercise, public: true };
			handleUpdateExercise(updatedExercise);
		}
	};

	// const filteredPersonalExercises = personalExercises.filter((exercise) =>
	// 	exercise.title.toLowerCase().includes(searchQuery.toLowerCase())
	// );

	// const filteredPublicExercises = publicExercises.filter((exercise) =>
	// 	exercise.title.toLowerCase().includes(searchQuery.toLowerCase())
	// );

	return (
		<div className="w-full p-4 pb-20 sm:p-6 sm:pb-24 lg:p-8 lg:pb-32">


			{/* Titre */}
			<div className="bg-bgtone p-4 sm:p-6 rounded-2xl border-[1px] border-black/10 dark:border-white/5 shadow-md shadow-black/5 dark:shadow-white/5 mb-6 sm:mb-8">
				<h1 className="text-3xl sm:text-4xl font-medium mb-2">Exercices</h1>
				<p className="text-text-secondary">
					Gérez votre bibliothèque d'exercices
				</p>
			</div>

			{/* Bibliothèque d'exercices */}
			<Suspense fallback={<div>Chargement...</div>}>
				<ExerciseLibrary/>
			</Suspense>
		</div>
	);
};

export default PageExercices;
