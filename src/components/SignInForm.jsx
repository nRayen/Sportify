"use client"

import Link from "next/link";
import { useState } from "react";
import FormError from "./FormError";
import PasswordSVG from "./SVG/PasswordSVG";
import PseudoSVG from "./SVG/PseudoSVG";
import EyeOpenSVG from "./SVG/EyeOpenSVG";
import EyeClosedSVG from "./SVG/EyeClosedSVG";

const SignInForm = () => {
    const [errorList, setErrorList] = useState([])
    const [showPassword, setShowPassword] = useState(false)

    const [userLogin, setUserLogin] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(errorList);

        setErrorList(new Array(0))

        // Récupération infos de login
        const loginInfo = {
            userLogin: userLogin.trim(),
            password: password.trim(),
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
                setErrorList([...errorList, res.error])
            } else {
                alert("Réussite : Implémentation email confirmation")
            }

        } catch (error) {
            console.log(error.message)
        }
    };


    return (

        // <form onSubmit={handleSubmit} className="w-[550px] min-w-80 mx-auto bg-neutral-900 p-8 rounded-3xl shadow-blue-500/10 shadow-xl">
        // <h2 className="text-center text-5xl mb-3">Titre</h2>

        // {/* Affichage des erreurs */}
        // {
        //     errorList.map((err, ind) => <FormError error={err} key={ind}/>)
        // }

        // {/* Pseudo */}
        // <div className="mb-4">
        //     <label className="block text-base font-medium mb-2" htmlFor="user-login">user-login<span className="text-red-600">*</span></label>
        //     <input value={userLogin} onChange={(e) => setUserLogin(e.target.value)} type="text" name="user-login" id="user-login" required className="text-black py-2 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
        // </div>

        // {/* Mot de passe */}
        // <div className="mb-4">
        //     <label className="block text-base font-medium mb-2" htmlFor="password">Mot de passe<span className="text-red-600">*</span></label>
        //     <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" required className="text-black py-2 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
        // </div>

        // <div>
        //     <button type="submit" className="w-32 mr-4 p-2 text-white font-bold text-lg bg-sky-500 hover:bg-sky-600  rounded-2xl">Connexion</button>
        //     ou <Link href={"/signup"} className="text-blue-500 hover:underline">ou créez un compte</Link>
        // </div>
        // </form>

        <form onSubmit={handleSubmit} className="max-w-[512px]  w-full rounded-xl my-auto sm:px-10 sm:py-8 sm:bg-white/10 sm:stroke-white/5">
            <div className="flex flex-col gap-4 min-w-[432px]">

                {/* User */}
                <section className="flex flex-col gap-2">
                    <label htmlFor="user-login">Pseudo</label>
                    <div className="group w-full flex bg-white/10 border-[1px] border-white/5 h-11 px-4 py-3 gap-3 rounded-md focus-within:border-b-primary transition-colors ease-in-out duration-500">
                        <PseudoSVG className="h-full"/>
                        <input value={userLogin} onChange={(e) => setUserLogin(e.target.value)} type="text" name="userLogin" id="user-login" placeholder="Pseudo" required className="text-sm placeholder:text-white/30 bg-transparent disabled:pointer-events-none w-full focus:outline-none caret-primary" />
                    </div>
                </section>

                {/* Mot de passe */}
                <section className="flex flex-col gap-2">
                    <label htmlFor="password">Mot de passe</label>
                    <div className="group w-full flex bg-white/10 border-[1px] border-white/5 h-11 px-4 py-3 gap-3 rounded-md focus-within:border-b-primary transition-colors ease-in-out duration-500">
                        <PasswordSVG className="h-full"/>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "password" : "text"} name="password" id="password" placeholder="Mot de passe" required className="text-sm placeholder:text-white/30 bg-transparent disabled:pointer-events-none w-full focus:outline-none caret-primary" />
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
                </section>

                {/* Connexion */}
                <button type="submit" className="text-xl font-medium text-[#0E0F11] py-2 rounded-lg bg-gradient-to-b from-primary to-primary">Connexion</button>

            </div>
            <p className="text-sm text-center mt-8">Vous n'avez pas de compte ? <Link className="text-primary hover:underline" href={"/signup"}>S'inscrire</Link></p>
        </form>
    )
}

export default SignInForm