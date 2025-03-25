import prisma from "@/libs/prisma";
import { getSession } from "@/libs/session";
import { NextResponse } from "next/server";


// Requete API pour récupérer une liste d'exercices personnels
export async function GET (request) {
    const session = await getSession()
    if (!session) {
        return NextResponse.json({ error: "Erreur de chargement" }, { status: 401 });
    }

    try {
        const exercises = await prisma.exercice.findMany({
            where: {
                id_user: session.userId
            }
        })

        return NextResponse.json(
            exercises, {status: 200}
        )

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: "Erreur de chargement" }, { status: 500 });
    }


}