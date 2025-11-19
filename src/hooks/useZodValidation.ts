import { useState } from "react";
import type { z } from "zod";
import toast from "react-hot-toast";

export function useZodValidation<T>() {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = (
        schema: z.ZodType<T>, 
        data: unknown
    ): T | null => {
        const result = schema.safeParse(data);

        if (!result.success) {
            const zodErrors: Record<string, string> = {};

            result.error.issues.forEach((err: z.core.$ZodIssue) => {
                if (err.path[0]) zodErrors[err.path[0].toString()] = err.message;
            });

            setErrors(zodErrors);

            toast.error("Validation error!");

            return null;
        }

        setErrors({});

        return result.data;
    };

    return { errors, setErrors, validate };
}
