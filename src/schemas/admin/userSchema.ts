import { z } from "zod";

export const addUserSchema = z.object({
    name: z
        .string()
        .max(64, "Title cannot exceed 64 characters"),
    email: z
        .email()
        .max(64, "Email cannot exceed 64 characters"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
});
export type AddUserFormData = z.infer<typeof addUserSchema>;