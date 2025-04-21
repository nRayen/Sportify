import prisma from "@/libs/prisma";
import { getSession } from "@/libs/session";
import { CreatePhysicalDataSchema } from "@/libs/zod";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { taille, poids } = await request.json();
    
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Utilisateur non connecté", code: "UNAUTHORIZED" }, { status: 401 });
    }

    const validatedFields = CreatePhysicalDataSchema.safeParse({ taille, poids });
    if (!validatedFields.success) {
        console.error(validatedFields.error);
        return NextResponse.json({ error: "Données invalides", code: "INVALID_DATA" }, { status: 400 });
    }

    try {
        console.log("typeof poids:", typeof poids, "valeur:", poids);
        console.log("String poids:", poids.toString());
        const physicalData = await prisma.physicalData.create({
            data: {
                height: taille,
                weight: poids,
                id_user: session.userId
            }
        })
        return NextResponse.json(physicalData, { message: "Données physiques créées avec succès", code: "SUCCESS", status: 200 });   
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erreur lors de la création des données physiques", code: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }   
}



export async function GET(request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Utilisateur non connecté", code: "UNAUTHORIZED" }, { status: 401 });
    }

    try {
        const physicalData = await prisma.physicalData.findMany({
            where: { id_user: session.userId },
            orderBy: { created_at: 'asc' }
        })
        return NextResponse.json(physicalData, { message: "Données physiques récupérées avec succès", code: "SUCCESS", status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erreur lors de la récupération des données physiques", code: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}

