import api from "../api/axios";
import { getCsrfCookie } from "./cookie";
import type { LoginResponse } from "../types/auth";
import type { NullDataApiResponse } from "../types/api";

export async function login(
    email: string,
    password: string
): Promise<LoginResponse> {
    await getCsrfCookie();

    const response = await api.post('/api/login', {
        email,
        password
    });

    return response.data;
}

export async function logout(): Promise<NullDataApiResponse> {
    const response = await api.post('/api/logout');

    return response.data;
}