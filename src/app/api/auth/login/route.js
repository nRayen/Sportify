import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { LoginSchema } from "@/libs/zod";
import { createSession } from "../../../../libs/session";

const bcrypt = require('bcrypt')

// Route pour vérifier les informations de connexion
export async function POST(request) {
    const {userLogin, password} = await request.json()


    // Validation Zod formulaire
    const validation = LoginSchema.safeParse({userLogin, password})
    if (!validation.success) {
        return NextResponse.json(
            {error : "Formulaire non valide", code : 400},
            {status : 400}) // Code HTTP : BAD_REQUEST
    }

    try {
        // Vérifier si le login est bon et récupérer le mdp
        const userLoginCheck = await prisma.user.findUnique({
            where: {
                    pseudo : userLogin,
                },
            select : {
                password : true,
                id : true
            }
            })

        // Renvoyer erreur si le pseudo n'est pas connu
        if(!userLoginCheck) {
            return NextResponse.json(
                {error : "Nom d'utilisateur et/ou mot de passe incorrect", code : 401},
                {status : 401}) // Code HTTP : UNAUTHORIZED
        }

        // Vérifier si le mot de passe est correct
        let passwordCheck = await bcrypt.compare(password, userLoginCheck.password).then(function(result) {
            return result
        });

        // Vérifier si on autorise la connexion
        if (passwordCheck && userLoginCheck) {

            // Créer la session
            await createSession(userLoginCheck.id)

            // Mettre à jour la date de dernière connexion
            const lastLogin = await prisma.user.update({
                where : {
                    id : userLoginCheck.id
                },
                data : {
                    last_auth : new Date()
                }
            })

            // Renvoyer la réponse
            return NextResponse.json(
                { message: "Connexion réussie"},
                { status: 201 } // Code HTTP : CREATION
            )

        } else {
            return NextResponse.json(
                { error: "Nom d'utilisateur et/ou mot de passe incorrect", code : 401 },
                { status: 401 } // Code HTTP : UNAUTHORIZED
            )
        }

    } catch (error) {
        console.error("Erreur lors de la connexion de l'utilisateur :", error);

        return NextResponse.json(
            { error: "Erreur interne du serveur", code: 500 },
            { status: 500 } // Code HTTP : ERREUR SERVEUR
        )
    }
}