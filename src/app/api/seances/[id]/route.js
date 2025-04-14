import prisma from "@/libs/prisma";
import { UpdateSeanceSchema } from "@/libs/zod";
import { NextResponse } from "next/server";


// Requete API pour mettre à jour une séance
export async function PUT (request, { params }) {
    const { id } = await params;
    const { title, date, duration, objective, exercises } = await request.json();
    // Validation des données
    const validatedFields = UpdateSeanceSchema.safeParse({ id, title, date, duration, objective });
    if (!validatedFields.success) {
        console.error(validatedFields.error);
        return NextResponse.json({ error: "Données invalides", code: "INVALID_DATA" }, { status: 400 });
    }

    // Prepare the data for exercises
    const exercisesData = exercises.map(exercise => ({
        id_exercice: exercise.id_exercice,
        reps: exercise.reps,
        weight: exercise.weight,
        sets: exercise.sets
    }));
    
    // Mise à jour de la séance dans la base de données
    try {
        const seance = await prisma.seance.update({
            where: { id: parseInt(id) },
            data: {
                title, 
                date, 
                duration, 
                objective,
                ExerciceStats: {
                    deleteMany: {}, // This deletes all associated exercises
                    create: exercisesData
                }
            }
        });
        console.log({...seance, ExerciceStats: exercisesData});
        return NextResponse.json(
            {...seance, ExerciceStats: exercisesData}, {message: "Séance mise à jour avec succès", code: "SUCCESS"}, {status: 200}
        )
    } catch (error) {
        console.error(error.message);
        return NextResponse.json({ error: "Erreur de chargement", code: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}

// Requete API pour supprimer une séance
export async function DELETE (request, { params }) {
    const { id } = await params;
    try {
        const seance = await prisma.seance.delete({
            where: { id: parseInt(id) }
        })
        return NextResponse.json(seance, {message: "Séance supprimée avec succès", code: "SUCCESS"}, {status: 200})
    } catch (error) {
        console.error(error.message);
        return NextResponse.json({ error: "Erreur de chargement", code: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}
