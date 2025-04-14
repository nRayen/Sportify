import prisma from "@/libs/prisma";
import { getSession } from "@/libs/session";
import { CreateSeanceSchema } from "@/libs/zod";
import { NextResponse } from "next/server";


// Requete API pour créer une seance
export async function POST (request) {
    const { title, date, duration, objective, exercises } = await request.json();

    // Récupération de la session
    const session = await getSession()
    if (!session) {
        return NextResponse.json({ error: "Utilisateur non connecté", code: "UNAUTHORIZED" }, { status: 401 });
    }

    // Validation des données
    const validatedFields = CreateSeanceSchema.safeParse({ title, date, duration, objective });
    if (!validatedFields.success) {
        console.error(validatedFields.error);
        return NextResponse.json({ error: "Données invalides", code: "INVALID_DATA" }, { status: 400 });
    }

    try {
        const seances = await prisma.seance.create({
            data: {
                title,
                date,
                duration,
                objective,
                id_user: session.userId,
                ExerciceStats: {
                    create: exercises.map((exercise) => ({
                        sets: exercise.sets,
                        reps: exercise.reps,
                        weight: exercise.weight,
                        id_exercice: exercise.id_exercice
                    }))
                }
            }
        })

        return NextResponse.json(
            seances, {message: "Seance créée avec succès", code: "SUCCESS", status: 200}
        )

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: "Erreur de chargement", code: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}


// Requete API pour récupérer toutes les seances d'un utilisateur
export async function GET (request) {
    const session = await getSession()
    if (!session) {
        return NextResponse.json({ error: "Utilisateur non connecté", code: "UNAUTHORIZED" }, { status: 401 });
    }

    try {
        const seances = await prisma.seance.findMany({
            where: { id_user: session.userId },
            include: {
                ExerciceStats: true
            }
        })
        return NextResponse.json(
            seances, {message: "Seances récupérées avec succès", code: "SUCCESS", status: 200}
        )
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: "Erreur de chargement", code: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}
