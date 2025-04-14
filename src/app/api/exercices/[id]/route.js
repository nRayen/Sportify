import prisma from "@/libs/prisma";
import { UpdateExerciseSchema } from "@/libs/zod";
import { NextResponse } from "next/server";


// Requete API pour mettre à jour un exercice
export async function PUT (request, { params }) {
    const { id } = await params;
    const { title, description, isPublic } = await request.json();
    console.log(id, title, description, isPublic);

    // Validation des données
    const validatedFields = UpdateExerciseSchema.safeParse({ id, title, description, isPublic });
    if (!validatedFields.success) {
        console.log(validatedFields.error);
        return NextResponse.json({ error: "Données invalides", code: "INVALID_DATA" }, { status: 400 });
    }

    // Mise à jour de l'exercice dans la base de données
    try {
        const exercises = await prisma.exercice.update({
            where: { id: parseInt(id) },
            data: {
                title,
                description,
                public: isPublic,
            }
        })

        return NextResponse.json(
            exercises, {message: "Exercice mis à jour avec succès", code: "SUCCESS"}, {status: 200}
        )

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: "Erreur de chargement", code: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}


// Requete API pour supprimer un exercice
export async function DELETE (request, { params }) {
    const { id } = await params;

    // Suppression de l'exercice dans la base de données
    try {
        const exercises = await prisma.exercice.delete({
            where: { id: parseInt(id) }
        })

        return NextResponse.json(
            exercises, {message: "Exercice supprimé avec succès", code: "SUCCESS"}, {status: 200}
        )
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: "Erreur de chargement", code: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}
