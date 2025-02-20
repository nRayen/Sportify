import { getUser } from "@/libs/dal";
import capitalize from "@/utils/Capitalize";
import { Flame } from "lucide-react";
import React from "react";

const PageDashboard = async () => {
	const user = await getUser();
	const date = new Date()
		.toLocaleDateString("fr-FR", {
			weekday: "long", // Jour en toutes lettres (ex : lundi)
			day: "2-digit", // Jour sur 2 chiffres (ex : 02)
			month: "long",
		})
		.split(" ");

	const streak = 7;

	return (
		<div className="h-full w-full gap-8 grid sm:grid-cols-2 grid-rows-2 p-8 grid-cols-1">
			<section className="flex flex-col justify-between min-h-1/2">
				<div>
					<div>
						<h2 className="text-4xl">
							Bienvenue{" "}
							<span className="text-primary tracking-wide text-5xl">
								{user.firstname}
							</span>{" "}
						</h2>
						<p className="text-lg">
							{capitalize(date[0])}{" "}
							<span className="text-primary">{date[1]}</span>{" "}
							{capitalize(date[2])}
						</p>
					</div>
					<div className="flex items-center">
						<p>Streak en cours :</p>
						<div className="relative w-20 h-32 ml-auto">
							<Flame
								strokeWidth={1}
								className="absolute w-auto h-32 -translate-x-10 -translate-y-6 stroke-primary/75 z-0"
							/>
							<p className="absolute text-8xl ml-auto z-10 w-full block">
								{streak}
							</p>
						</div>
					</div>
				</div>

				<div className="flex justify-between w-full h-full gap-8 text-inverted text-center">
					<div className="w-full bg-bgtone-inverted p-4 rounded-lg">
						<h3 className="text-xl">Poids</h3>
						<p className="text-2xl font-bold text-primary">64kg</p>
					</div>
					<div className="w-full bg-bgtone-inverted p-4 rounded-lg">
						<h3 className="text-xl">Taille</h3>
						<p className="text-2xl font-bold text-primary">1,88m</p>
					</div>
				</div>
			</section>

			{/* Planning */}
			<section className="bg-bgtone p-4 rounded-lg border-[1px] border-black/10 dark:border-white/5 ">
				<h2>Prochaines séances</h2>

				<div>
					<p>Lundi 06 Mai</p>
				</div>
			</section>

			{/* Exercices */}
			<section className="bg-bgtone p-4 rounded-lg border-[1px] border-black/10 dark:border-white/5">
				<h2>Prochaines séances</h2>

				<div>
					<p>Lundi 06 Mai</p>
				</div>
			</section>

			{/* Suivi */}
			<section className="bg-bgtone p-4 rounded-lg border-[1px] border-black/10 dark:border-white/5">
				<h2>Prochaines séances</h2>

				<div>
					<p>Lundi 06 Mai</p>
				</div>
			</section>
		</div>
	);
};

export default PageDashboard;
