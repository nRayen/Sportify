"use client";

import { useState } from "react";
import FormError from "@/components/FormError";
import { ForgotPasswordSchema, LoginSchema } from "@/libs/zod";
import SideBarThemeSwitch from "@/components/sidebar/SideBarThemeSwitch";
import clsx from "clsx";
import PseudoSVG from "../SVG/PseudoSVG";
import { useRouter } from "next/navigation";

const ForgotPasswordForm = () => {

	const [errorList, setErrorList] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userEmail, setUserEmail] = useState("");

	const router = useRouter();


	const handleSubmit = async (e) => {
		e.preventDefault();

		// Erreurs à zéro
		setErrorList({
			...errorList,
			failedLogin: undefined,
			serverError: undefined,
		});

		// Récupération de l'email
		const emailInfo = {
			email: userEmail.trim(),
		};

		// Validation formulaire
		const validation = ForgotPasswordSchema.safeParse(emailInfo);

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

			// Requête API pour créer le lien de reset password
			const response = await fetch("/api/auth/password", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(emailInfo),
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
				router.push("/login?resetpassword=success");
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
			<div className="flex flex-col gap-4 w-full">
				{/* Email */}
				<section className="flex flex-col gap-2">
					<label htmlFor="user-login">Email</label>
					<div className="w-full flex dark:bg-white/10 border-[1px] dark:border-white/5 bg-bgcolor border-black/15 h-11 px-4 py-3 gap-3 rounded-md focus-within:border-b-primary transition-colors ease-in-out duration-500">
						<PseudoSVG className="h-full stroke-black dark:stroke-white" />
						<input
							value={userEmail}
							onFocus={() =>
								setErrorList({ ...errorList, userLogin: undefined })
							}
							onChange={(e) => setUserEmail(e.target.value)}
							type="text"
							name="userEmail"
							id="user-login"
							placeholder="Email"
							required
							className="text-sm dark:placeholder:text-white/30 bg-transparent disabled:pointer-events-none w-full focus:outline-none caret-primary"
						/>
					</div>
					{errorList.email && <FormError error={errorList.email} />}
				</section>

                    {errorList.failedLogin && (
                        <FormError>Nom d'utilisateur ou mot de passe incorrect</FormError>
                    )}

				{/* Connexion */}
				<button
					type="submit"
					disabled={isLoading}
					className={clsx(
						"text-xl font-medium text-[#0E0F11] py-2 rounded-lg bg-primary filter hover:opacity-80",
						{ "filter opacity-80": isLoading }
					)}
				>
					{isLoading ? "Chargement..." : "Envoyer email"}
				</button>
			</div>
			<div className="flex items-center justify-between mt-4">
				<p className="text-sm text-center ">Vous recevrez un lien pour changer de mot de passe</p>
				<SideBarThemeSwitch className="hover:bg-background dark:hover:bg-background-dark p-2 rounded-full transition-colors ease-in-out duration-300" />
			</div>
		</form>
	);
};

export default ForgotPasswordForm;
