import ExerciseLibrary from "@/components/exercices/ExerciseLibrary";
import { Suspense } from "react";

const PageExercices = async () => {

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
