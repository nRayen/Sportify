import prisma from "@/libs/prisma";
import { getSession } from "@/libs/session";
import { CreateExerciseSchema } from "@/libs/zod";
import { NextResponse } from "next/server";


// Requete API pour créer un exercice
export async function POST (request) {
    const { title, description, isPublic } = await request.json();

    // Récupération de la session
    const session = await getSession()
    if (!session) {
        return NextResponse.json({ error: "Utilisateur non connecté", code: "UNAUTHORIZED" }, { status: 401 });
    }

    // Validation des données
    const validatedFields = CreateExerciseSchema.safeParse({ title, description, isPublic });
    if (!validatedFields.success) {
        return NextResponse.json({ error: "Données invalides", code: "INVALID_DATA" }, { status: 400 });
    }


    try {
        const exercises = await prisma.exercice.create({
            data: {
                title,
                description,
                public: isPublic,
                id_user: session.userId
            }
        })

        return NextResponse.json(
            exercises, {message: "Exercice créé avec succès", code: "SUCCESS", status: 200}
        )

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: "Erreur de chargement", code: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}