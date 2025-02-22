import Link from "next/link";
import {
	ChevronRight,
	Dumbbell,
	LineChart,
	Calendar,
	Flame,
} from "lucide-react";
import SideBarThemeSwitch from "@/components/sidebar/SideBarThemeSwitch";
import { getSession } from "@/libs/session";

export default async function LandingPage() {
	const session = await getSession()

	return (
		<div className="min-h-screen w-full">
			{/* Hero Section */}
			<header className="w-full bg-bgtone relative overflow-hidden border-b-[1px] border-black/5 dark:border-white/5">
				<nav className="container mx-auto px-4 py-6 flex justify-between items-center">
					<h1 className="text-2xl font-medium">Sportify</h1>
					<div className="flex gap-4 items-center">
						<SideBarThemeSwitch className="hover:bg-background dark:hover:bg-background-dark p-2 rounded-full transition-colors ease-in-out duration-300" />

						{/* Si session, on n'affiche pas le bouton se connecter */}
						{session ? null : (
							<Link href="/login" className="text-primary hover:underline">
								Se connecter
							</Link>
						)}

						{/* Si session, on affiche le bouton accéder à mon compte, sinon on affiche le bouton s'inscrire */}
						<Link
							href={session ? "/dashboard" : "/register"}
							className="bg-primary text-backgroundTone px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
						>
							{session ? "Accéder à mon compte" : "S'inscrire"}
						</Link>
					</div>
				</nav>

				<div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
					<div className="flex-1 space-y-6">
						<h2 className="text-5xl lg:text-6xl font-medium leading-tight">
							Suivez votre progression,
							<br />
							<span className="text-primary">atteignez vos objectifs</span>
						</h2>
						<p className="text-lg text-text-secondary max-w-xl">
							Sportify est votre compagnon d'entraînement personnel. Planifiez
							vos séances, suivez vos exercices et visualisez votre progression
							en temps réel.
						</p>
						<Link
							href={session ? "/dashboard" : "/register"}
							className="inline-flex items-center gap-2 bg-primary text-backgroundTone px-6 py-3 rounded-lg hover:opacity-90 transition-opacity text-lg"
						>
							{session ? "Accéder à mon compte" : "Commencer maintenant"}
							<ChevronRight strokeWidth={2} />
						</Link>
					</div>
					<div className="flex-1 relative">
						<div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
						<div className="relative bg-bgtone p-8 rounded-2xl border-[1px] border-black/10 dark:border-white/5 shadow-xl">
							<div className="flex items-center gap-4 mb-6">
								<Flame className="text-primary" size={32} />
								<div>
									<p className="text-sm text-text-secondary">Streak en cours</p>
									<p className="text-3xl font-medium">7 jours</p>
								</div>
							</div>
							<div className="space-y-4">
								<div className="bg-background dark:bg-background-dark p-4 rounded-lg">
									<p className="text-sm text-text-secondary">
										Prochaine séance
									</p>
									<p className="font-medium">Musculation - Upper Body</p>
								</div>
								<div className="bg-background dark:bg-background-dark p-4 rounded-lg">
									<p className="text-sm text-text-secondary">
										Objectif hebdomadaire
									</p>
									<div className="w-full bg-backgroundTone dark:bg-backgroundTone-dark rounded-full h-2 mt-2">
										<div className="bg-primary w-3/4 h-2 rounded-full"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* Features Section */}
			<section className="container mx-auto px-4 py-20">
				<h2 className="text-3xl font-medium text-center mb-12">
					Fonctionnalités principales
				</h2>
				<div className="grid md:grid-cols-3 gap-8">
					<div className="bg-bgtone p-6 rounded-xl border-[1px] border-black/10 dark:border-white/5">
						<Calendar className="text-primary mb-4" size={32} />
						<h3 className="text-xl font-medium mb-2">Planning personnalisé</h3>
						<p className="text-text-secondary">
							Organisez vos séances d'entraînement selon votre emploi du temps
						</p>
					</div>
					<div className="bg-bgtone p-6 rounded-xl border-[1px] border-black/10 dark:border-white/5">
						<Dumbbell className="text-primary mb-4" size={32} />
						<h3 className="text-xl font-medium mb-2">
							Bibliothèque d'exercices
						</h3>
						<p className="text-text-secondary">
							Accédez à une large collection d'exercices avec des instructions
							détaillées
						</p>
					</div>
					<div className="bg-bgtone p-6 rounded-xl border-[1px] border-black/10 dark:border-white/5">
						<LineChart className="text-primary mb-4" size={32} />
						<h3 className="text-xl font-medium mb-2">Suivi des progrès</h3>
						<p className="text-text-secondary">
							Visualisez votre progression et atteignez vos objectifs plus
							rapidement
						</p>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-bgtone border-t-[1px] border-black/5 dark:border-white/5">
				<div className="container mx-auto px-4 py-20 text-center">
					<h2 className="text-3xl font-medium mb-4">
						Prêt à commencer votre voyage fitness ?
					</h2>
					<p className="text-text-secondary mb-8 max-w-2xl mx-auto">
						Rejoignez des milliers d'utilisateurs qui transforment leur vie avec
						Sportify. Commencez gratuitement dès aujourd'hui.
					</p>
					<Link
						href="/register"
						className="inline-flex items-center gap-2 bg-primary text-backgroundTone px-6 py-3 rounded-lg hover:opacity-90 transition-opacity text-lg"
					>
						Créer un compte gratuit
						<ChevronRight strokeWidth={2} />
					</Link>
				</div>
			</section>

			{/* Footer */}
			<footer className="container mx-auto px-4 py-8 text-center text-text-secondary text-sm">
				<p>© 2024 Sportify. Tous droits réservés.</p>
			</footer>
		</div>
	);
}
