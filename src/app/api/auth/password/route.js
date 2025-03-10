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

    const hash = await bcrypt.hash(email, 10)

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