import React from "react";

const PageDashboard = () => {


	return (
		<div className="h-full w-full gap-8 grid sm:grid-cols-2 p-8 grid-cols-1">

			<section className="p-4">
				<h2>Prochaines séances</h2>

				<div>
					<p>Lundi 06 Mai</p>
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
