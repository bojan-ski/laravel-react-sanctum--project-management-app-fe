import api from "../api/axios";
import { getCsrfCookie } from "./cookie";

export async function login(
    email: string,
    password: string
) {
    await getCsrfCookie();

    const response = await api.post('/api/login', { 
        email, 
        password 
    });

    return response.data;
}

export async function logout() {
    const response = await api.post('/api/logout');

    return response.data;
}