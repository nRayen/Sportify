import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { ForgotPasswordSchema } from "@/libs/zod";
import { Resend } from "resend";
import ResetPasswordMail from "@/components/emails/ResetPasswordMail";

const bcrypt = require('bcrypt')
const resend = new Resend(process.env.RESEND_API_KEY)


// Créer la clé de route pour reset le password
export async function POST (request) {
    const {email} = await request.json()

    // Validation
    const validation = ForgotPasswordSchema.safeParse({email})
    if (!validation.success) {
        return NextResponse.json(
            {error : "Formulaire non valide", code : 400},
            {status : 400}) // Code HTTP : BAD_REQUEST
    }

    const hash = crypto.randomUUID()

    try {
        // Récupérer id user
        const userId = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                id: true
            }
        })

        // Vérifier si on trouve bien un user
        if(!userId) {
            console.error(userId)
            console.error("Erreur lors de la récupération de l'utilisateur");

            return NextResponse.json(
                { error: "Email non trouvé", code: 404 },
                { status: 404 } // Code HTTP : NOT FOUND
            )
        }

        // Créer la key dans la BDD
        await prisma.resetPasswordKey.create({
            data: {
                key: hash,
                user_id: userId.id
            }
        })

        // Envoyer le mail
        const { error } = await resend.emails.send({
            from: 'Sportify <account.sportify@nrayen.fr>',
            to: [email],
            subject: 'Modifier votre mot de passe',
            react: ResetPasswordMail({ hash }),
        });

        if (error) {
            console.log("Erreur lors de l'envoi du mail " + error.message);
            return NextResponse.json(
                { error : error.message , code: 500 },
                { status: 500 } // Code HTTP : ERREUR SERVEUR
            )
        }

        // Key créée avec succès
        return NextResponse.json(
            { message: "Key créée avec succès" },
            { status: 201 } // Code HTTP : CREATION
        )


    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);

        return NextResponse.json(
            { error: "Erreur interne du serveur", code: 500 },
            { status: 500 } // Code HTTP : ERREUR SERVEUR
        )
    }

}

// Vérifier la clé pour reset le password
export async function GET (request) {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key"); // Récupération du paramètre "key"

    // Vérifier si on a bien une clé
    if (!key) {
        return NextResponse.json(
            {error : "Formulaire non valide", code : 400},
            {status : 400}) // Code HTTP : BAD_REQUEST
        }

        // Vérifier si la clé existe
        try {
            const validKey = await prisma.resetPasswordKey.findFirst({
                where: {
                    key: key
                },
                select: {
                    key: true,
                    created_at: true
                }
            })
            console.error(validKey)

            // Retourner si on ne trouve pas la clé
            if (!validKey) {
            console.error("clé pas trouvée")
            return NextResponse.json(
                {error: "Clé introuvable, redirection", code: 404},
                {status: 404} // Code HTTP : NOT FOUND
            )
        }

        // Autoriser la page
        return NextResponse.json(
            {message: "Clé trouvée, page autorisée", code: 201},
            {status: 201} // Code HTTP : AUTHORIZED
        )
    } catch (error) {
        console.error("Erreur lors de la vérification de la clé", error);

        return NextResponse.json(
            { error: "Erreur interne du serveur", code: 500 },
            { status: 500 } // Code HTTP : ERREUR SERVEUR
        )
    }
}