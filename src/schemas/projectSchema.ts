import { z } from "zod";

export const projectSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(64, "Title cannot exceed 64 characters"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(3000, "Description cannot exceed 3000 characters"),
    deadline: z
        .string()
        .refine(
            (value) => {
                if (!value) return false;
                
                const today = new Date();
                const deadline = new Date(value);

                return deadline >= today;
            },
            { message: "Deadline must be a valid future date" }
        ),
    document_path: z
        .instanceof(File)
        .optional()
        .or(z.null()),
});
export type ProjectFormData = z.infer<typeof projectSchema>;

export const filterProjectsByOwnershipSchema = z.enum([
    "all", "owner", "member",
]);
export type FilterProjectsByOwnership = z.infer<typeof filterProjectsByOwnershipSchema>;

export const projectStatusSchema = z.enum([
    "all", "pending", "active", "completed", "closed"
]);
export type ProjectStatusFilter = z.infer<typeof projectStatusSchema>;
