export type User = {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    role: string;
    created_at: string;
    updated_at: string;
};



export type LaravelValidationErrors = Record<string, string[]>;

export type NewUserFormData = {
    name: string;
    email: string;
    password: string;
};

export type CreateNewUserErrors = {
    name?: string;
    email?: string;
    password?: string;
    random?: string;
};

export type UsersState = {
    isLoading: boolean;
    users: User[];
    currentPage: number;
    lastPage: number;
    total: number;
    errors: CreateNewUserErrors;
};