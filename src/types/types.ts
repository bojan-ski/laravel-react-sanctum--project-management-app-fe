// GLOBAL
export type User = {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    role: string;
    created_at: string;
    updated_at: string;
};

// REDUX SLICES
export type LaravelValidationErrors = Record<string, string[]>;

// admin/createUserSlice
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

export type NewUserState = {
    isLoading: boolean;
    formData: NewUserFormData;
    errors: CreateNewUserErrors;
};

// admin/usersSlice
export type UsersState = {
    isLoading: boolean;
    users: User[];
    search: string;
    currentPage: number;
    lastPage: number;
    total: number;
    error: string;
};