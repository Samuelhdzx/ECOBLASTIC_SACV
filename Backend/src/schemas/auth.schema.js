import {z} from "zod";

export const registerSchema = z.object({
    username: z.string({
    required_error: "Username is required",
    }),
    email: z.string({
        required_error: "El correo electrónico es obligatorio"
    }).email({
        message: "Formato de correo electrónico inválido. Ejemplo: usuario@dominio.com"
    }),
    password: z.string({
        required_error: "La contraseña es obligatoria"
    }).min(6, {
        message: "La contraseña debe tener al menos 6 caracteres"
    }).max(30, {
        message: "La contraseña no puede exceder los 30 caracteres"
    }).regex(/^(?=.*[A-Z])(?=.*[0-9])/, {
        message: "La contraseña debe contener al menos una mayúscula y un número"
    })
});

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    }).email({
        message: "Invalid email",
    }),
    password: z.string({
        required_error: "Password is required",
    }).min(6, {
        message: "Password must be at least 6 characters",
    }),
});
