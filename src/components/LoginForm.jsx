"use client";

import Link from "next/link";
import { useState } from "react";
import FormError from "./FormError";
import PasswordSVG from "./SVG/PasswordSVG";
import PseudoSVG from "./SVG/PseudoSVG";
import EyeOpenSVG from "./SVG/EyeOpenSVG";
import EyeClosedSVG from "./SVG/EyeClosedSVG";
import { LoginSchema } from "@/libs/zod";
import { useRouter, useSearchParams } from "next/navigation";
import SideBarThemeSwitch from "./sidebar/SideBarThemeSwitch";
import clsx from "clsx";

const LoginForm = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [errorList, setErrorList] = useState({});
	const [showPassword, setShowPassword] = useState(true);

	const [isLoading, setIsLoading] = useState(false);

	const [userLogin, setUserLogin] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Erreurs à zéro
		setErrorList({
			...errorList,
			failedLogin: undefined,
			serverError: undefined,
		});

		// Récupération infos de login
		const loginInfo = {
			userLogin: userLogin.trim(),
			password: password.trim(),
		};

		// Validation formulaire
		const validation = LoginSchema.safeParse(loginInfo);

		if (!validation.success) {
			const errors = {};
			validation.error.errors.forEach((err) => {
				errors[err.path[0]] = err.message;
			});
			setErrorList(errors);
			return;
		}

		try {
			// Etat de chargement
			setIsLoading(true);

			// Requête API pour se connecter
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(loginInfo),
			});
			const res = await response.json();
			setIsLoading(false);

			// Ajout de l'erreur à l'affichage
			if (!response.ok) {
				if (response.status == 401) {
					setErrorList({ ...errorList, failedLogin: true });
				} else if (response.status == 500) {
					setErrorList({ ...errorList, serverError: true });
				}
			} else {
				router.push("/dashboard");
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<form
			spellCheck={false}
			onSubmit={handleSubmit}
			noValidate
			className="min-w-full rounded-xl my-auto sm:px-10 sm:py-8 dark:sm:bg-white/10 sm:dark:stroke-white/5 sm:bg-backgroundTone sm:border-[1px] sm:border-black/5"
		>
			{/* Message de succès */}
			{searchParams.get("register") === "success" && (
				<div className="bg-green-500/20 text-green-500 p-4 rounded-md mb-4">
					Compte créé avec succès ! Veuillez vous connecter.
				</div>
			)}

			<div className="flex flex-col gap-4 w-full">
				{/* User */}
				<section className="flex flex-col gap-2">
					<label htmlFor="user-login">Pseudo</label>
					<div className="w-full flex dark:bg-white/10 border-[1px] dark:border-white/5 bg-bgcolor border-black/15 h-11 px-4 py-3 gap-3 rounded-md focus-within:border-b-primary transition-colors ease-in-out duration-500">
						<PseudoSVG className="h-full stroke-black dark:stroke-white" />
						<input
							value={userLogin}
							onFocus={() =>
								setErrorList({ ...errorList, userLogin: undefined })
							}
							onChange={(e) => setUserLogin(e.target.value)}
							type="text"
							name="userLogin"
							id="user-login"
							placeholder="Pseudo"
							required
							className="text-sm dark:placeholder:text-white/30 bg-transparent disabled:pointer-events-none w-full focus:outline-none caret-primary"
						/>
					</div>
					{errorList.userLogin && <FormError error={errorList.userLogin} />}
				</section>

				{/* Mot de passe */}
				<section className="flex flex-col gap-2">
					<div className="flex justify-between">
						<label htmlFor="password">Mot de passe</label>
						<Link
							href={"/forgot-pwd"}
							className="text-sm text-primary hover:underline"
						>
							Mot de passe oublié
						</Link>
					</div>
					<div className="w-full flex dark:bg-white/10 border-[1px] dark:border-white/5 bg-bgcolor border-black/15 h-11 px-4 py-3 gap-3 rounded-md focus-within:border-b-primary transition-colors ease-in-out duration-500">
						<PasswordSVG className="h-full stroke-black dark:stroke-white" />
						<input
							value={password}
							onFocus={() =>
								setErrorList({ ...errorList, password: undefined })
							}
							onChange={(e) => setPassword(e.target.value)}
							type={showPassword ? "password" : "text"}
							name="password"
							id="password"
							placeholder="Mot de passe"
							required
							className="text-sm dark:placeholder:text-white/30 bg-transparent disabled:pointer-events-none w-full focus:outline-none caret-primary"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<EyeClosedSVG className="ursor-pointer hover:stroke-primary dark:hover:stroke-primary stroke-black dark:stroke-white" />
							) : (
								<EyeOpenSVG className="ursor-pointer hover:stroke-primary dark:hover:stroke-primary stroke-black dark:stroke-white" />
							)}
						</button>
					</div>
					{errorList.failedLogin && (
						<FormError>Nom d'utilisateur ou mot de passe incorrect</FormError>
					)}
					{errorList.serverError && (
						<FormError>
							Erreur lors de l'authentification. Veuillez réessayer
						</FormError>
					)}
					{errorList.password && <FormError error={errorList.password} />}
				</section>

				{/* Connexion */}
				<button
					type="submit"
					disabled={isLoading}
					className={clsx(
						"text-xl font-medium text-[#0E0F11] py-2 rounded-lg bg-primary filter hover:opacity-80",
						{ "filter opacity-80": isLoading }
					)}
				>
					{isLoading ? "Chargement..." : "Connexion"}
				</button>
			</div>
			<div className="flex items-center justify-between mt-4">
				<p className="text-sm text-center ">
					Vous n'avez pas de compte ?{" "}
					<Link className="text-primary hover:underline" href={"/register"}>
						S'inscrire
					</Link>
				</p>
				<SideBarThemeSwitch className="hover:bg-background dark:hover:bg-background-dark p-2 rounded-full transition-colors ease-in-out duration-300" />
			</div>
		</form>
	);
};

export default LoginForm;
