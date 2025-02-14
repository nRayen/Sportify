"use client";

import Link from "next/link";
import FormError from "./FormError";
import { useState } from "react";
import FirstnameSVG from "./SVG/FirstnameSVG";
import LastnameSVG from "./SVG/LastnameSVG";
import PseudoSVG from "./SVG/PseudoSVG";
import PasswordSVG from "./SVG/PasswordSVG";
import EmailSVG from "./SVG/EmailSVG";
import EyeOpenSVG from "./SVG/EyeOpenSVG";
import EyeClosedSVG from "./SVG/EyeClosedSVG";
import { RegisterSchema } from "@/libs/zod";

const RegisterForm = () => {
	const [errorList, setErrorList] = useState({});

	const [pseudo, setPseudo] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [birthday, setBirthday] = useState("");
	const [sex, setSex] = useState("");

	const [showPassword, setShowPassword] = useState(true);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Récupération données formulaire
		const newUser = {
			pseudo: pseudo.trim(),
			firstname: firstname.trim(),
			lastname: lastname.trim(),
			email: email.trim(),
			password: password.trim(),
			birthday: birthday ? new Date(birthday).toISOString() : null,
			sex: sex || null,
		};

		// Validation formulaire
		const validation = RegisterSchema.safeParse(newUser);

		if (!validation.success) {
			const errors = {};
			validation.error.errors.forEach((err) => {
				errors[err.path[0]] = err.message;
			});
			setErrorList(errors);
			console.log(errorList);
			return;
		}

		// Requête API pour créer l'utilisateur
		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newUser),
			});
			const res = await response.json();

			// Ajout de l'erreur à l'affichage
			if (!response.ok) {
				if (response.status == 409) {
					if (res.error == "PSEUDO_TAKEN") {
						setErrorList({ ...errorList, pseudo: "Pseudo déjà utilisé" });
					} else if (res.error == "EMAIL_TAKEN") {
						setErrorList({ ...errorList, email: "Email déjà utilisé" });
					}
				} else if (response.status == 500) {
					setErrorList({ ...errorList, serverError: true });
				}
				console.log(errorList);
			} else {
				alert("Réussite : Implémentation email confirmation");
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<form
			className="max-w-[512px] w-full rounded-xl my-auto sm:px-10 sm:py-8 sm:dark:bg-white/10 sm:dark:stroke-white/5 bg-backgroundTone border-[1px] border-black/5"
			onSubmit={handleSubmit}
			noValidate
		>
			<div className="flex flex-col gap-4">
				{/* Nom + Prénom */}
				<section className="grid grid-cols-2 gap-x-3 gap-y-2">
					<label htmlFor="firstname">Prénom</label>
					<label htmlFor="lastname">Nom</label>

					<div className="w-full flex dark:bg-white/10 border-[1px] dark:border-white/5 bg-bgcolor border-black/15 h-11 px-4 py-3 gap-3 rounded-md focus-within:border-b-primary transition-colors ease-in-out duration-500">
						<FirstnameSVG className="h-full stroke-black dark:stroke-white" />
						<input
							value={firstname}
							onFocus={() =>
								setErrorList({ ...errorList, firstname: undefined })
							}
							onChange={(e) => setFirstname(e.target.value)}
							type="text"
							name="firstname"
							id="firstname"
							placeholder="Prénom"
							required
							className="text-sm dark:placeholder:text-white/30 bg-transparent disabled:pointer-events-none w-full focus:outline-none caret-primary"
						/>
					</div>

					<div className="group w-full flex dark:bg-white/10 border-[1px] dark:border-white/5 bg-bgcolor border-black/15 h-11 px-4 py-3 gap-3 rounded-md focus-within:border-b-primary transition-colors ease-in-out duration-500">
						<LastnameSVG className="h-full stroke-black dark:stroke-white" />
						<input
							value={lastname}
							onFocus={() =>
								setErrorList({ ...errorList, lastname: undefined })
							}
							onChange={(e) => setLastname(e.target.value)}
							type="text"
							name="lastname"
							id="lastname"
							placeholder="Nom"
							required
							className="text-sm dark:placeholder:text-white/30 bg-transparent disabled:pointer-events-none w-full focus:outline-none caret-primary"
						/>
					</div>
					{(errorList.firstname || errorList.lastname) && (
						<FormError
							className={"col-span-2"}
							error={errorList.firstname || errorList.lastname}
						/>
					)}
				</section>

				{/* Pseudo */}
				<section className="flex flex-col gap-2">
					<label htmlFor="pseudo">Pseudo</label>
					<div className="group w-full flex dark:bg-white/10 border-[1px] dark:border-white/5 bg-bgcolor border-black/15 h-11 px-4 py-3 gap-3 rounded-md focus-within:border-b-primary transition-colors ease-in-out duration-500">
						<PseudoSVG className="h-full stroke-black dark:stroke-white" />
						<input
							value={pseudo}
							onFocus={() => setErrorList({ ...errorList, pseudo: undefined })}
							onChange={(e) => setPseudo(e.target.value)}
							type="text"
							name="pseudo"
							id="pseudo"
							placeholder="Pseudo"
							required
							className="text-sm dark:placeholder:text-white/30 bg-transparent disabled:pointer-events-none w-full focus:outline-none caret-primary"
						/>
					</div>
					{errorList.pseudo && <FormError error={errorList.pseudo} />}
				</section>

				{/* Email */}
				<section className="flex flex-col gap-2">
					<label htmlFor="email">Email</label>
					<div className="group w-full flex dark:bg-white/10 border-[1px] dark:border-white/5 bg-bgcolor border-black/15 h-11 px-4 py-3 gap-3 rounded-md focus-within:border-b-primary transition-colors ease-in-out duration-500">
						<EmailSVG className="h-full stroke-black dark:stroke-white" />
						<input
							value={email}
							onFocus={() => setErrorList({ ...errorList, email: undefined })}
							onChange={(e) => setEmail(e.target.value)}
							type="text"
							name="email"
							id="email"
							placeholder="Email"
							required
							className="text-sm dark:placeholder:text-white/30 bg-transparent disabled:pointer-events-none w-full focus:outline-none caret-primary"
						/>
					</div>
					{errorList.email && <FormError error={errorList.email} />}
				</section>

				{/* Mot de passe */}
				<section className="flex flex-col gap-2">
					<label htmlFor="password">Mot de passe</label>
					<div className="group w-full flex dark:bg-white/10 border-[1px] dark:border-white/5 bg-bgcolor border-black/15 h-11 px-4 py-3 gap-3 rounded-md focus-within:border-b-primary transition-colors ease-in-out duration-500">
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
								<EyeClosedSVG className="cursor-pointer hover:stroke-primary stroke-black dark:stroke-white" />
							) : (
								<EyeOpenSVG className="cursor-pointer hover:stroke-primary stroke-black dark:stroke-white" />
							)}
						</button>
					</div>
					{errorList.password && <FormError error={errorList.password} />}
					{errorList.serverError && (
						<FormError>
							Erreur lors de l'authentification. Veuillez réessayer
						</FormError>
					)}
				</section>

				{/* Bouton submit */}
				<button
					type="submit"
					className="text-xl font-medium text-[#0E0F11] py-2 rounded-lg bg-gradient-to-b from-primary to-primary"
				>
					S'inscrire
				</button>

				{/* ToS */}
				<p className="text-sm text-text-secondary">
					En créant un compte, vous acceptez les{" "}
					<Link href={"/tos"} className="text-default underline">
						Conditions d'utilisation
					</Link>
					. Nous vous enverrons occasionnellement des e-mails liés à votre
					compte{" "}
				</p>
			</div>

			{/* Login button */}
			<p className="text-sm text-center mt-8">
				Vous avez déjâ un compte ?{" "}
				<Link className="text-primary hover:underline" href={"/login"}>
					Connexion
				</Link>
			</p>
		</form>
	);
};

export default RegisterForm;
