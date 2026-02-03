import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .email('Please enter a valid email address')
        .max(64, "Email must not exceed 64 characters"),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
});
export type LoginFormData = z.infer<typeof loginSchema>;