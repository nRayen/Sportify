import { z } from "zod"

export const LoginSchema = z.object({
    userLogin : z.string().min(1, "Ce champ ne peut pas être vide."),
    password: z.string().min(1, "Ce champ ne peut pas être vide."),
})

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