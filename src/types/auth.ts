import type { ApiResponse } from "./api";

// api response
export type AuthResponse = {
    id: number | null;
    is_admin: boolean;
    is_authenticated: boolean;
};

export type LoginResponse = {
    data: AuthResponse;
} & ApiResponse;

export type AuthStateErrors = {
    email?: string;
    password?: string;
};

// slice
export type AuthState = {
    isLoading: boolean;
    user: AuthResponse;
};