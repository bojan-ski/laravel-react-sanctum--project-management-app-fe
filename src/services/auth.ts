import api from "../api/axios";
import { getCsrfCookie } from "./cookie";
import type { LoginResponse, LogoutResponse } from "../types/auth";

export async function login(
    email: string,
    password: string
): Promise<LoginResponse> {
    await getCsrfCookie();

    const response = await api.post<LoginResponse>('/api/login', {
        email,
        password
    });

    return response.data;
}

export async function logout(): Promise<LogoutResponse> {
    const response = await api.post<LogoutResponse>('/api/logout');

    return response.data;
}