import { getUser } from "@/libs/dal";
import capitalize from "@/utils/Capitalize";
import React from "react";

const PageDashboard = async () => {

	const user = await getUser()
	const date = new Date().toLocaleDateString("fr-FR", {
		weekday: "long",   // Jour en toutes lettres (ex : lundi)
		day: "2-digit",    // Jour sur 2 chiffres (ex : 02)
		month: "long",
	  }).split(' ');

	const streak = 7


	return (
		<div className="h-full w-full gap-8 grid sm:grid-cols-2 p-8 grid-cols-1">

			<section className="flex flex-col max-w-1/2 grow-0">
				<div>
					<h2 className="text-4xl">Bienvenue <span className="text-primary tracking-wide text-5xl">{user.firstname}</span> </h2>
					<p className="text-lg">{capitalize(date[0])} <span className="text-primary">{date[1]}</span> {capitalize(date[2])}</p>
				</div>

				<div className="flex items-center">
					<p>Streak en cours :</p>
					<p className="text-9xl ml-auto">{streak}</p>
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
