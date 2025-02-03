"use client"

import Link from "next/link";
import { useState } from "react";
import FormError from "./FormError";
import PasswordSVG from "./SVG/PasswordSVG";
import PseudoSVG from "./SVG/PseudoSVG";
import EyeOpenSVG from "./SVG/EyeOpenSVG";
import EyeClosedSVG from "./SVG/EyeClosedSVG";
import { LoginSchema } from "@/app/libs/zod";

const SignInForm = () => {
    const [errorList, setErrorList] = useState({})
    const [showPassword, setShowPassword] = useState(true)

    const [userLogin, setUserLogin] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Récupération infos de login
        const loginInfo = {
            userLogin: userLogin.trim(),
            password: password.trim(),
        }

        // Validation formulaire
        const validation = LoginSchema.safeParse(loginInfo)

        if (!validation.success) {
            const errors = {}
            validation.error.errors.forEach((err) => {
                errors[err.path[0]] = err.message
            })
            setErrorList(errors)
            return
        }


        // Requête API pour se connecter
        try {
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginInfo)
            })
            const res = await response.json()

            // Ajout de l'erreur à l'affichage
            if (!response.ok) {
                if (response.status == 401) {
                    setErrorList({...errorList, failedLogin : true})
                } else if (response.status == 500) {
                    setErrorList({...errorList, serverError : true})
                }
            } else {
                alert("Réussite : Implémentation email confirmation")
            }

        } catch (error) {
            console.log(error.message)
        }
    };


    return (

        <form onSubmit={handleSubmit} noValidate className="min-w-full rounded-xl my-auto sm:px-10 sm:py-8 sm:bg-white/10 sm:stroke-white/5">
            <div className="flex flex-col gap-4 w-full">

                {/* User */}
                <section className="flex flex-col gap-2">
                    <label htmlFor="user-login">Pseudo</label>
                    <div className="w-full flex bg-white/10 border-[1px] border-white/5 h-11 px-4 py-3 gap-3 rounded-md focus-within:border-b-primary transition-colors ease-in-out duration-500">
                        <PseudoSVG className="h-full"/>
                        <input value={userLogin} onFocus={() => setErrorList({...errorList, userLogin: undefined})} onChange={(e) => setUserLogin(e.target.value)} type="text" name="userLogin" id="user-login" placeholder="Pseudo" required className="text-sm placeholder:text-white/30 bg-transparent disabled:pointer-events-none w-full focus:outline-none caret-primary" />
                    </div>
                    {errorList.userLogin && <FormError error={errorList.userLogin}/>}
                </section>

                {/* Mot de passe */}
                <section className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <label htmlFor="password">Mot de passe</label>
                        <Link href={"/forgot-pwd"} className="text-sm text-primary hover:underline">Mot de passe oublié</Link>
                    </div>
                    <div className="w-full flex bg-white/10 border-[1px] border-white/5 h-11 px-4 py-3 gap-3 rounded-md focus-within:border-b-primary transition-colors ease-in-out duration-500">
                        <PasswordSVG className="h-full"/>
                        <input value={password} onFocus={() => setErrorList({...errorList, password: undefined})} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "password" : "text"} name="password" id="password" placeholder="Mot de passe" required className="text-sm placeholder:text-white/30 bg-transparent disabled:pointer-events-none w-full focus:outline-none caret-primary" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? (
                                    <EyeClosedSVG  className="cursor-pointer hover:stroke-primary stroke-white"/>
                                ) : (
                                    <EyeOpenSVG  className="cursor-pointer hover:stroke-primary stroke-white"/>
                                )
                            }
                        </button>
                    </div>
                    {errorList.failedLogin && <FormError>Nom d'utilisateur ou mot de passe incorrect</FormError>}
                    {errorList.serverError && <FormError>Erreur lors de l'authentification. Veuillez réessayer</FormError>}
                    {errorList.password && <FormError error={errorList.password}/>}
                </section>

                {/* Connexion */}
                <button type="submit" className="text-xl font-medium text-[#0E0F11] py-2 rounded-lg bg-gradient-to-b from-primary to-primary">Connexion</button>

            </div>
            <p className="text-sm text-center mt-8">Vous n'avez pas de compte ? <Link className="text-primary hover:underline" href={"/signup"}>S'inscrire</Link></p>
        </form>
    )
}

export default SignInForm