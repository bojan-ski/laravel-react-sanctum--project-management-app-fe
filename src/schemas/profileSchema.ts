import { z } from "zod";

export const changePasswordSchema = z.object({
    old_password: z
        .string()
        .min(6, "Old password must be at least 6 characters"),
    new_password: z
        .string()
        .min(6, "New password must be at least 6 characters"),
    new_password_confirm: z
        .string()
        .min(6, "Confirmation password must be at least 6 characters"),
})
    .refine((data) => data.new_password === data.new_password_confirm, {
        message: "Passwords do not match",
        path: ["new_password_confirm"],
    });
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export const deleteAccountSchema = z.object({
    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});
export type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>;
