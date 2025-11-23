import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .email()
        .min(2, "Email must be at least 2 characters")
        .max(64, "Email must not exceed 48 characters"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});
export type LoginFormData = z.infer<typeof loginSchema>;