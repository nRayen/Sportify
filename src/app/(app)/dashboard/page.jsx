import NextTrainingCard from "@/components/dashboard/NextTrainingCard";
import { getUser } from "@/libs/dal";
import capitalize from "@/utils/Capitalize";
import {
	ChevronRight,
	Flame,
	Activity,
	Target,
	TrendingUp,
} from "lucide-react";
import Link from "next/link";
import React from "react";
// import { LineChart, Line, ResponsiveContainer } from "recharts";

const PageDashboard = async () => {
	const user = await getUser();
	const date = new Date()
		.toLocaleDateString("fr-FR", {
			weekday: "long",
			day: "2-digit",
			month: "long",
		})
		.split(" ");

	const streak = 7;



	return (
		<div className="h-full w-full gap-8 grid p-8 grid-cols-1 grid-rows-none lg:grid-cols-2">
			<section className="flex flex-col gap-8">
				{/* Welcome & Date */}
				<div className="bg-bgtone p-6 rounded-2xl border-[1px] border-black/10 dark:border-white/5 shadow-md shadow-black/5 dark:shadow-white/5">
					<div className="flex items-start justify-between">
						<div>
							<h2 className="text-4xl font-medium mb-2">
								Bienvenue,{" "}
								<span className="text-primary">{user.firstname}</span>
							</h2>
							<p className="text-text-secondary">
								{capitalize(date[0])}{" "}
								<span className="text-primary">{date[1]}</span>{" "}
								{capitalize(date[2])}
							</p>
						</div>
						<div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-xl">
							<Flame className="text-primary" size={24} />
							<div>
								<p className="text-sm text-text-secondary">Streak</p>
								<p className="text-xl font-medium">{streak} jours</p>
							</div>
						</div>
					</div>
				</div>

				{/* Quick Stats */}
				<div className="grid grid-cols-1 sm:grid-cols-6 gap-8">
					{/* Séances */}
					<div className="bg-bgtone p-6 rounded-xl border-[1px] border-black/10 dark:border-white/5 shadow-md shadow-black/5 dark:shadow-white/5 min-w-0 sm:col-span-3">
						<div className="flex items-center gap-4 mb-3">
							<div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
								<Activity className="text-primary" size={24} />
							</div>
							<p className="text-text-secondary truncate">Séances</p>
						</div>
						<p className="text-2xl font-medium truncate">12</p>
						<p className="text-sm text-text-secondary truncate">ce mois</p>
					</div>

					{/* Progression */}
					<div className="bg-bgtone p-6 rounded-xl border-[1px] border-black/10 dark:border-white/5 shadow-md shadow-black/5 dark:shadow-white/5 min-w-0 sm:col-span-3">
						<div className="flex items-center gap-4 mb-3">
							<div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
								<TrendingUp className="text-primary" size={24} />
							</div>
							<p className="text-text-secondary truncate">Progression</p>
						</div>
						<div className="flex items-end gap-1">
							<p className="text-2xl font-medium truncate">+12%</p>
							<p className="text-sm text-text-secondary truncate mb-1">
								/ mois
							</p>
						</div>
					</div>

					{/* Objectifs */}
					<div className="bg-bgtone p-6 rounded-xl border-[1px] border-black/10 dark:border-white/5 shadow-md shadow-black/5 dark:shadow-white/5 min-w-0 sm:col-span-2">
						<div className="flex items-center mb-3 flex-wrap">
							<div className="p-2 mr-4 bg-primary/10 rounded-lg flex-shrink-0">
								<Target className="text-primary" size={24} />
							</div>
							<p className="text-text-secondary truncate">Objectifs</p>
						</div>
						<p className="text-2xl font-medium truncate">3/4</p>
						<p className="text-sm text-text-secondary truncate">complétés</p>
					</div>

					{/* Body Stats */}
					<div className="bg-bgtone p-6 rounded-xl border-[1px] border-black/10 dark:border-white/5 shadow-md shadow-black/5 dark:shadow-white/5 sm:col-span-4">
						<Link
							href={"/planning"}
							className="text-xl font-medium mb-4 flex items-center group"
						>
							Profil corporel
							<ChevronRight
								strokeWidth={2}
								size={25}
								className="group-hover:translate-x-1 group-hover:stroke-primary group-hover:scale-110 transition-all duration-300"
							/>
						</Link>

						<div className="grid grid-cols-2 gap-6">
							<div>
								<p className="text-text-secondary mb-2">Poids actuel</p>
								<p className="text-3xl font-medium">
									64<span className="text-lg text-text-secondary">kg</span>
								</p>
								<p className="text-sm text-primary">-2kg ce mois</p>
							</div>
							<div>
								<p className="text-text-secondary mb-2">Taille</p>
								<p className="text-3xl font-medium">
									1.88<span className="text-lg text-text-secondary">m</span>
								</p>
								<p className="text-sm text-text-secondary">IMC: 21.5</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Planning */}
			<NextTrainingCard />

			{/* Exercices */}
			<section className="bg-bgtone p-4 rounded-lg border-[1px] border-black/10 dark:border-white/5 h-full shadow-md shadow-black/5 dark:shadow-white/5">
				<Link
					href={"/exercices"}
					className="text-xl font-medium mb-4 flex items-center group"
				>
					Exercices
					<ChevronRight
						strokeWidth={2}
						size={25}
						className="group-hover:translate-x-1 group-hover:stroke-primary group-hover:scale-110 transition-all duration-300"
					/>
				</Link>

				<div className="flex flex-col rounded-lg overflow-hidden">
					<div className="bg-primary/10 p-4 border-b-[1px] border-black/10 dark:border-white/5">
						<p>Lundi 06 Mai</p>
					</div>
				</div>
			</section>

			{/* Suivi */}
			<section className="bg-bgtone p-4 rounded-lg border-[1px] border-black/10 dark:border-white/5 h-full shadow-md shadow-black/5 dark:shadow-white/5">
				<Link
					href={"/suivi"}
					className="text-xl font-medium mb-4 flex items-center group"
				>
					Suivi
					<ChevronRight
						strokeWidth={2}
						size={25}
						className="group-hover:translate-x-1 group-hover:stroke-primary group-hover:scale-110 transition-all duration-300"
					/>
				</Link>

				<div>
					{/* <ResponsiveContainer width="100%" height="100%">
						<LineChart data={data}>
							<Line
								type="monotone"
								dataKey="weight"
								stroke="#8884d8"
								strokeWidth={2}
								dot={true}
							/>
						</LineChart>
					</ResponsiveContainer> */}
				</div>
			</section>
		</div>
	);
};

export default PageDashboard;
