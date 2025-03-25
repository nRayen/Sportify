import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";


// Requete API pour récupérer une liste d'exercices publics
export async function GET (request) {
    try {
        const exercises = await prisma.exercice.findMany({
            where: {
                public: true
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