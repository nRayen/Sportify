import { z } from "zod"


// Authentification
// Schéma Form Login
export const LoginSchema = z.object({
    userLogin : z.string().min(1, "Ce champ ne peut pas être vide."),
    password: z.string().min(1, "Ce champ ne peut pas être vide."),
})


// Schéma Form Register
export const RegisterSchema = z.object({
    pseudo : z.string().min(1, "Ce champ ne peut pas être vide."),
    firstname: z.string().min(1, "Ces champs ne peuvent pas être vides."),
    lastname: z.string().min(1, "Ces champs ne peuvent pas être vides."),
    email: z.string().email("Veuillez fournir un email valide"),
    password: z.string()
    .regex(/[A-Z]/, "Le mot de passe doit contenir une majuscule")
    .regex(/[a-z]/, "Le mot de passe doit contenir une minuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir un chiffre")
    .regex(/[\W_]/, "Le mot de passe doit contenir un caractère spécial")
    .min(12, "Le mot de passe doit faire au moins 12 caractères")
})

// Schéma Form ForgotPassword
export const ForgotPasswordSchema = z.object({
    email: z.string().email("Veuillez fournir un email valide")
})






// Exercices
// Schéma Form Create Exercise
export const CreateExerciseSchema = z.object({
    title: z.string().min(1, "Ce champ ne peut pas être vide."),
    description: z.string().optional(),
    isPublic: z.boolean().optional()
})

// Schéma Form Update Exercise
export const UpdateExerciseSchema = z.object({
    id: z.string().min(1, "Ce champ ne peut pas être vide."),
    title: z.string().min(1, "Ce champ ne peut pas être vide."),
    description: z.string().optional(),
    isPublic: z.boolean().optional()
})

// Schéma Form Delete Exercise
export const DeleteExerciseSchema = z.object({
    id: z.string().min(1, "Ce champ ne peut pas être vide.")
})

// Schéma Form Make Public Exercise
export const MakePublicExerciseSchema = z.object({
    id: z.string().min(1, "Ce champ ne peut pas être vide."),
    isPublic: z.boolean().optional()
})





// Seances
// Schéma Form Create Seance
export const CreateSeanceSchema = z.object({
    title: z.string().min(1, "Ce champ ne peut pas être vide."),
    date: z.string().min(1, "Ce champ ne peut pas être vide."),
    duration: z.number().min(1, "Ce champ ne peut pas être vide."),
    objective: z.string().optional()
})

// Schéma Form Update Seance
export const UpdateSeanceSchema = z.object({
    id: z.string().min(1, "Ce champ ne peut pas être vide."),
    title: z.string().min(1, "Ce champ ne peut pas être vide."),
    date: z.string().min(1, "Ce champ ne peut pas être vide."),
    duration: z.number().min(1, "Ce champ ne peut pas être vide."),
    objective: z.string().optional()
})

// Schéma Form Delete Seance
export const DeleteSeanceSchema = z.object({
    id: z.string().min(1, "Ce champ ne peut pas être vide.")
})


// Données physiques
export const CreatePhysicalDataSchema = z.object({
    taille: z.number().min(1, "Ce champ ne peut pas être vide."),
    poids: z.number().min(1, "Ce champ ne peut pas être vide."),
})


