import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { RegisterSchema } from "@/libs/zod";
import { Resend } from 'resend';
import WelcomeMail from "@/components/emails/WelcomeMail";

const bcrypt = require('bcrypt')
const resend = new Resend(process.env.RESEND_API_KEY)

// Route pour créer un USER
export async function POST(request) {
    const {pseudo, firstname, lastname, email, password, birthday, sex} = await request.json()

    // Validation données
    const validation = RegisterSchema.safeParse({pseudo, firstname, lastname, email, password, birthday, sex})
    if (!validation.success) {
        return NextResponse.json(
            {error : "Formulaire non valide", code : 400},
            {status : 400}) // Code HTTP : BAD_REQUEST
    }

    // Vérifier si le pseudo existe
    const existingPseudoCheck = await prisma.user.findUnique({
        where: {
            pseudo : pseudo
        }
    })
    if(existingPseudoCheck) {
        return NextResponse.json(
            {error : "PSEUDO_TAKEN", code : 409, field : "pseudo"},
            {status : 409}) // Code HTTP : CONFLICT
    }

    // Vérifier si le mail existe
    const existingEmailCheck = await prisma.user.findUnique({
        where: {
            email : email
        }
    })
    if(existingEmailCheck) {
        return NextResponse.json(
            {error : "EMAIL_TAKEN", code : 409, field : "email"},
            {status : 409}) // Code HTTP : CONFLICT
    }

    // Hasher le mot de passe
    const hashedPwd = await bcrypt.hash(password, 10)

    // Création dans la base de données
    try {
        await prisma.user.create({
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



        // Envoyer un mail de bienvenue
        const { error } = await resend.emails.send({
            from: 'Sportify <welcome.sportify@nrayen.fr>',
            to: [email],
            subject: 'Bienvenue sur Sportify',
            react: WelcomeMail({ pseudo }),
        });

        // Erreur lors de l'envoi du mail
        if (error) {
            return NextResponse.json(
                { error : error.message , code: 500 },
                { status: 500 } // Code HTTP : ERREUR SERVEUR
            )
        }

        // Utilisateur ajouté avec succès
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