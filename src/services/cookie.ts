import api from '../api/axios';

export async function getCsrfCookie(): Promise<void> {
    try {
        await api.get('/sanctum/csrf-cookie');
    } catch (error) {
        console.log(error);
    }
}