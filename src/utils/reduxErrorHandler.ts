type LaravelValidationErrors = Record<string, string[]>;
type BaseStateErrors = {
    random?: string;
    [key: string]: string | undefined;
}

export function handleAsyncThunkError<T extends BaseStateErrors>(
    error: any,
    rejectWithValue: (value: T) => any,
) {
    if (error.response?.status === 422) {
        const fieldErrors = error.response.data.errors as LaravelValidationErrors;
        const formattedErrors: BaseStateErrors = {};

        for (const key in fieldErrors) {
            formattedErrors[key] = fieldErrors[key][0];
        }

        return rejectWithValue(formattedErrors as T);
    }

    if (error.response?.status === 404) {
        return rejectWithValue({ 
            random: error.response.statusText || "Resource not found" 
        } as T);
    }

    if (error.response?.status === 401) {
        return rejectWithValue({ 
            random: error.response.data.message || "Unauthorized" 
        } as T);
    }

    if (error.response?.status === 403) {
        return rejectWithValue({ 
            random: error.response.data.message || "Forbidden" 
        } as T);
    }

    if (error.response?.status >= 500) {
        return rejectWithValue({ 
            random: "Server error" 
        } as T);
    }

    if (error.response?.data?.message) {
        return rejectWithValue({ 
            random: error.response.data.message 
        } as T);
    }

    return rejectWithValue({ 
        random: error.message || "An error occurred" 
    } as T);
}