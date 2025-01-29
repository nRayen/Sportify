"use client"

import Link from "next/link";
import FormError from "./FormError";
import { useState } from "react";
import FirstnameSVG from "./SVG/FirstnameSVG";
import LastnameSVG from "./SVG/LastnameSVG";
import PseudoSVG from "./SVG/PseudoSVG";
import PasswordSVG from "./SVG/PasswordSVG";
import EmailSVG from "./SVG/EmailSVG";
import EyeSVG from "./SVG/EyeClosedSVG";
import EyeOpenSVG from "./SVG/EyeOpenSVG";
import EyeClosedSVG from "./SVG/EyeClosedSVG";

const SignUpForm = () => {
    const [errorList, setErrorList] = useState([])

    const [pseudo, setPseudo] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [birthday, setBirthday] = useState("")
    const [sex, setSex] = useState("")

    const [showPassword, setShowPassword] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorList([])

        // Récupération données formulaire
        const newUser = {
            pseudo: pseudo.trim(),
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            email: email.trim(),
            password: password.trim(),
            birthday :  birthday ? new Date(birthday).toISOString() : null,
            sex : sex || null
        }

        // Requête API pour créer l'utilisateur
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser)
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
    // <form onSubmit={handleSubmit}  id="signup-form" className="w-[550px] min-w-80 mx-auto bg-neutral-900 p-8 rounded-3xl shadow-blue-500/10 shadow-xl">

    //     {/* Titre */}
    //     <h2 className="text-center text-5xl mb-3">Titre</h2>

    //     {/* Affichage des erreurs */}
    //     {
    //         errorList.map((err, ind) => <FormError error={err} key={ind}/>)
    //     }

    //     {/* Pseudo */}
    //     <div className="mb-4">
    //         <label className="block text-base font-medium mb-2" htmlFor="pseudo">Pseudo<span className="text-red-600">*</span></label>
    //         <input className="text-black py-2 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" value={pseudo} onChange={(e) => setPseudo(e.target.value)} type="text" name="pseudo" id="pseudo" required />
    //     </div>

    //     {/* Email */}
    //     <div className="mb-4">
    //         <label className="block text-base font-medium mb-2" htmlFor="email">Email<span className="text-red-600">*</span></label>
    //         <input className="text-black py-2 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" required />
    //     </div>

    //     {/* Mot de passe */}
    //     <div className="mb-4">
    //         <label className="block text-base font-medium mb-2" htmlFor="password">Mot de passe<span className="text-red-600">*</span></label>
    //         <input className="text-black py-2 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" />
    //     </div>

    //     <hr className="backdrop-blur-2xl h-2px opacity-35 bg-slate-300 w-full mb-4 mt-6"></hr>

        // {/* Nom + Prénom */}
        // <section className="flex justify-between gap-8">
        //     <div className="mb-4 w-[227px] min-w-16">
        //         <label className="block text-base font-medium mb-2" htmlFor="firstname">Prénom<span className="text-red-600">*</span></label>
        //         <input className="text-black py-2 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" name="firstname" id="firstname" required />
        //     </div>

        //     <div className="mb-4 w-[227px]">
        //         <label className="block text-base font-medium mb-2" htmlFor="lastname">Nom<span className="text-red-600">*</span></label>
        //         <input className="text-black py-2 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" name="lastname" id="lastname" required />
        //     </div>
        // </section>

    //     {/* Birthdate + Genre */}
    //     <section className="flex justify-between gap-8">
    //         <div className="mb-4 w-1/2">
    //             <label className="block text-base font-medium mb-2" htmlFor="birthday">Date de naissance</label>
    //             <input className="text-black py-2 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" value={birthday} onChange={(e) => setBirthday(e.target.value)} type="date" name="birthday" id="birthday" />
    //         </div>

    //         <div className="mb-4 w-1/2 flex-shrink">
    //             <label className="block text-base font-medium mb-2" htmlFor="sex">Sexe</label>
    //             <select name="sex" value={sex} onChange={(e) => setSex(e.target.value)} id="sex" className="text-black py-3 px-4 block w-full border-gray-200 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
    //                 <option value={null}>Choisissez une option</option>
    //                 <option value="h">Homme</option>
    //                 <option value="f">Femme</option>
    //                 <option value="n">Autre</option>
    //             </select>
    //         </div>
    //     </section>

    //     <div>
    //         <button type="submit" className="w-32 mr-4 p-2 text-white font-bold text-lg bg-sky-500 hover:bg-sky-600  rounded-2xl">Confirmer</button>
    //         ou <Link href={"/signin"} className="text-blue-500 hover:underline">connectez vous.</Link>
    //     </div>
    // </form>



    <form className="max-w-[512px] w-full rounded-xl my-auto sm:px-10 sm:py-8 sm:bg-white/10 sm:stroke-white/5" onSubmit={handleSubmit}>
        {/* <h2 className="text-center text-2xl pb-8 mb-8 border-b-[1px] border-white/10">Titre</h2> */}
        <div className="flex flex-col gap-4" >
            {/* Nom + Prénom */}
            <section className="grid grid-cols-2 gap-x-3 gap-y-2">
                <label htmlFor="firstname">Prénom</label>
                <label htmlFor="lastname">Nom</label>

                <div className="group w-full flex bg-white/10 border-[1px] border-white/5 h-11 px-4 py-3 gap-3 rounded-md focus-within:border-b-primary transition-colors ease-in-out duration-500">
                    <FirstnameSVG className="h-full"/>
                    <input value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" name="firstname" id="firstname" placeholder="Prénom" required className="text-sm placeholder:text-white/30 bg-transparent disabled:pointer-events-none w-full focus:outline-none caret-primary" />
                </div>

                <div className="group w-full flex bg-white/10 border-[1px] border-white/5 h-11 px-4 py-3 gap-3 rounded-md focus-within:border-b-primary transition-colors ease-in-out duration-500">
                    <LastnameSVG className="h-full"/>
                    <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" name="lastname" id="lastname" placeholder="Nom" required className="text-sm placeholder:text-white/30 bg-transparent disabled:pointer-events-none w-full focus:outline-none caret-primary" />
                </div>
            </section>

            {/* Pseudo */}
            <section className="flex flex-col gap-2">
                <label htmlFor="pseudo">Pseudo</label>
                <div className="group w-full flex bg-white/10 border-[1px] border-white/5 h-11 px-4 py-3 gap-3 rounded-md focus-within:border-b-primary transition-colors ease-in-out duration-500">
                    <PseudoSVG className="h-full"/>
                    <input value={pseudo} onChange={(e) => setPseudo(e.target.value)} type="text" name="pseudo" id="pseudo" placeholder="Pseudo" required className="text-sm placeholder:text-white/30 bg-transparent disabled:pointer-events-none w-full focus:outline-none caret-primary" />
                </div>
            </section>


            {/* Email */}
            <section className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <div className="group w-full flex bg-white/10 border-[1px] border-white/5 h-11 px-4 py-3 gap-3 rounded-md focus-within:border-b-primary transition-colors ease-in-out duration-500">
                    <EmailSVG className="h-full"/>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" placeholder="Email" required className="text-sm placeholder:text-white/30 bg-transparent disabled:pointer-events-none w-full focus:outline-none caret-primary" />
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
                <div className="text-secondary">Robustesse du mot de passe</div>
                <div className="w-full h-0.5 bg-white"></div>
            </section>

            {/* Bouton submit */}
            <button type="submit" className="text-2xl font-medium text-[#0E0F11] py-2 rounded-lg bg-gradient-to-b from-primary to-primary">S'inscrire</button>

            {/* ToS */}
            <p className="text-sm text-text-secondary">En créant un compte, vous acceptez les <Link href={"/tos"} className="text-white underline">Conditions d'utilisation</Link>. Nous vous enverrons occasionnellement des e-mails liés à votre compte </p>
        </div>

        {/* Login */}
        <p className="text-sm text-center mt-8">Vous avez déjâ un compte ? <Link className="text-primary hover:underline" href={"/signin"}>Connexion</Link></p>
    </form>
  )
}

export default SignUpForm