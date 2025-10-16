export type User = {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    role: string;
};

export type LaravelValidationErrors = Record<string, string[]>;

export type NewUserFormData = {
    name: string;
    email: string;
    password: string;
};