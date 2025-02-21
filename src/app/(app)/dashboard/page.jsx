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

const data = [
	{ date: "01/05", weight: 65.2 },
	{ date: "02/05", weight: 65.0 },
	{ date: "03/05", weight: 64.8 },
	{ date: "04/05", weight: 64.5 },
	{ date: "05/05", weight: 64.3 },
	{ date: "06/05", weight: 64.0 },
	{ date: "07/05", weight: 64.0 },
];

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
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<div className="bg-bgtone p-6 rounded-xl border-[1px] border-black/10 dark:border-white/5 shadow-md shadow-black/5 dark:shadow-white/5">
						<div className="flex items-center gap-4 mb-3">
							<div className="p-2 bg-primary/10 rounded-lg">
								<Activity className="text-primary" size={24} />
							</div>
							<p className="text-text-secondary">Séances</p>
						</div>
						<p className="text-2xl font-medium">12</p>
						<p className="text-sm text-text-secondary">ce mois</p>
					</div>

					<div className="bg-bgtone p-6 rounded-xl border-[1px] border-black/10 dark:border-white/5 shadow-md shadow-black/5 dark:shadow-white/5">
						<div className="flex items-center gap-4 mb-3">
							<div className="p-2 bg-primary/10 rounded-lg">
								<Target className="text-primary" size={24} />
							</div>
							<p className="text-text-secondary">Objectifs</p>
						</div>
						<p className="text-2xl font-medium">3/4</p>
						<p className="text-sm text-text-secondary">complétés</p>
					</div>

					<div className="bg-bgtone p-6 rounded-xl border-[1px] border-black/10 dark:border-white/5 shadow-md shadow-black/5 dark:shadow-white/5">
						<div className="flex items-center gap-4 mb-3">
							<div className="p-2 bg-primary/10 rounded-lg">
								<TrendingUp className="text-primary" size={24} />
							</div>
							<p className="text-text-secondary">Progression</p>
						</div>
						<div className="flex items-end gap-1">
							<p className="text-2xl font-medium">+12%</p>
							<p className="text-sm text-text-secondary mb-1">/ mois</p>
						</div>
					</div>
				</div>

				{/* Body Stats */}
				<div className="bg-bgtone p-6 rounded-xl border-[1px] border-black/10 dark:border-white/5 shadow-md shadow-black/5 dark:shadow-white/5">
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-xl font-medium">Statistiques corporelles</h3>
						<Link
							href="/profile"
							className="text-primary hover:underline text-sm flex items-center gap-1"
						>
							Voir plus <ChevronRight size={16} />
						</Link>
					</div>
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
			</section>

			{/* Planning */}
			<section className="bg-bgtone p-4 rounded-lg border-[1px] border-black/10 dark:border-white/5 h-full shadow-md shadow-black/5 dark:shadow-white/5">
				<Link
					href={"/planning"}
					className="text-xl font-medium mb-4 flex items-center group"
				>
					Planning
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
					<div className=" p-4 border-b-[1px] border-black/10 dark:border-white/5">
						<p>Lundi 06 Mai</p>
					</div>
					<div className=" p-4 border-b-[1px] border-black/10 dark:border-white/5">
						<p>Lundi 06 Mai</p>
					</div>
					<div className=" p-4 border-b-[1px] border-black/10 dark:border-white/5">
						<p>Lundi 06 Mai</p>
					</div>
					<div className=" p-4">
						<p>Lundi 06 Mai</p>
					</div>
				</div>
			</section>

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
