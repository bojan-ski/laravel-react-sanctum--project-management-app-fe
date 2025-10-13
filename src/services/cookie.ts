import api from '../api/axios';

export async function getCsrfCookie() {
    try {
        const response = await api.get('/sanctum/csrf-cookie');

        return response;
    } catch (error) {
        throw error;
    }
}