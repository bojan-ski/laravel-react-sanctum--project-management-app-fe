import api from "../api/axios";
import { getCsrfCookie } from "./cookie";

export async function login(email: string, password: string) {
    await getCsrfCookie();

    const res = await api.post('/api/login', { email, password });

    return res.data;
}

export async function logout() {
    const res = await api.post('/api/logout');

    return res.data;
}