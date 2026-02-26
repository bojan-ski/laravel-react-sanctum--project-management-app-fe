import { z } from "zod";

export const messageSchema = z.object({
    message: z
        .string()
        .max(255, "Message cannot exceed 255 characters"),
});
export type TaskMessageFormData = z.infer<typeof messageSchema>;