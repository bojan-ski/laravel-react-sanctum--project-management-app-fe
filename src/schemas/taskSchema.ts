import { z } from "zod";

export const taskSchema = z.object({
    assigned_to: z
        .number()
        .positive("Assignee is required"),
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(64, "Title cannot exceed 64 characters"),
    description: z
        .string()
        .min(200, "Description must be at least 200 characters")
        .max(1500, "Description cannot exceed 1500 characters"),
    priority: z.enum([ 'low', 'medium', 'high', 'critical' ], {
        message: "Priority must be low, medium, high, or critical"
    }),
    due_date: z
        .string()
        .refine(
            (value) => {
                if (!value) return false;

                const today = new Date();
                const dueDate = new Date(value);

                return dueDate >= today;
            },
            { message: "Due date must be a valid future date" }
        ),
});
export type TaskFormData = z.infer<typeof taskSchema>;

export const taskStatusSchema = z.enum([
    'to_do', 'in_progress', 'review', 'done'
]);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskPrioritySchema = z.enum([
    'low', 'medium', 'high', 'critical'
]);
export type TaskPriority = z.infer<typeof taskPrioritySchema>;

export const taskOwnershipSchema = z.enum([
    "created", "assigned",
]);
export type TaskOwnership = z.infer<typeof taskOwnershipSchema>;

export const filterTaskPrioritySchema = z.enum([
    'all', ...taskPrioritySchema.options
]);
export type FilterTaskByPriority = z.infer<typeof filterTaskPrioritySchema>;

export const filterTaskStatusSchema = z.enum([
    'all', ...taskStatusSchema.options
]);
export type FilterTaskByStatus = z.infer<typeof filterTaskStatusSchema>;

export const filterTaskOwnershipSchema = z.enum([
    'all', ...taskOwnershipSchema.options
]);
export type FilterTaskByOwnership = z.infer<typeof filterTaskOwnershipSchema>;

export const taskDocumentSchema = z.object({
    document: z
        .instanceof(File, { message: "A file is required" })
        .refine(file => file.size > 0, "File cannot be empty")
        .refine(file => file.size <= 1024 * 1024, "File must be under 1MB")
        .refine(
            file => [
                'application/pdf',
                'application/msword',                                                                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
            ].includes(file.type),
            "Only PDF, DOC, and DOCX files are allowed"
        ),
});
export type TaskDocumentFormData = z.infer<typeof taskDocumentSchema>;