import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

const bcrypt = require('bcrypt')

// Route pour créer un USER
export async function POST(request) {
    const {pseudo, firstname, lastname, email, password, birthday, sex} = await request.json()

    // Vérifier si le pseudo existe
    const existingPseudoCheck = await prisma.uSERS.findUnique({
        where: {
            pseudo : pseudo
        }
    })
    if(existingPseudoCheck) {
        return NextResponse.json(
            {error : "Pseudo déjà utilisé", code : 409},
            {status : 409}) // Code HTTP : CONFLICT
    }

    // Vérifier si le mail existe
    const existingEmailCheck = await prisma.uSERS.findUnique({
        where: {
            email : email
        }
    })
    if(existingEmailCheck) {
        return NextResponse.json(
            {error : "Email déjà utilisé", code : 409},
            {status : 409}) // Code HTTP : CONFLICT
    }

    // Hasher le mot de passe
    const hashedPwd = await bcrypt.hash(password, 10)

    // Création dans la base de données
    try {
        await prisma.uSERS.create({
            data : {
                pseudo,
                firstname,
                lastname,
                email,
                password : hashedPwd,
                birthday,
                sex,
            }
        })

        return NextResponse.json(
            { message: "Utilisateur ajouté avec succès" },
            { status: 201 } // Code HTTP : CREATION
        )

    // Gestion erreur inconnue
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);

        return NextResponse.json(
            { error: "Erreur interne du serveur", code: 500 },
            { status: 500 } // Code HTTP : ERREUR SERVEUR
        )
    }
}