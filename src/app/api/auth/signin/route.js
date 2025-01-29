import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

const bcrypt = require('bcrypt')

// Route pour vérifier les informations de connexion
export async function POST(request) {
    const {userLogin, password} = await request.json()

    try {
        // Vérifier si le login est bon et récupérer le mdp
        const userLoginCheck = await prisma.uSERS.findUnique({
            where: {
                    pseudo : userLogin,
                },
            select : {
                password : true
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
            return NextResponse.json(
                { message: "Bons identifiants + ...Création session" },
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
















    // Création dans la base de données
    // try {
    //     await prisma.uSERS.create({
    //         data : {
    //             pseudo,
    //             firstname,
    //             lastname,
    //             email,
    //             password : hashedPwd,
    //             birthday,
    //             sex,
    //         }
    //     })

    //     return NextResponse.json(
    //         { message: "Utilisateur ajouté avec succès" },
    //         { status: 201 } // Code HTTP : CREATION
    //     )

    // // Gestion erreur inconnue
    // } catch (error) {
    //     console.error("Erreur lors de la création de l'utilisateur :", error);

    //     return NextResponse.json(
    //         { error: "Erreur interne du serveur", code: 500 },
    //         { status: 500 } // Code HTTP : ERREUR SERVEUR
    //     )
    // }
}