import type { AuthResponse } from "../types/auth";

const USER_KEY: string = 'user';

// IN PRODUCTION CHANGE TO localStorage !!!

export function getUserDataFromLS(): AuthResponse | null {
    const data: string | null = sessionStorage.getItem(USER_KEY);

    return data ? JSON.parse(data) : null;
}

export function setUserDataInLS(data: AuthResponse): void {
    sessionStorage.setItem(USER_KEY, JSON.stringify(data));
}

export function removeUserDataFromLS(): void {
    sessionStorage.removeItem(USER_KEY);
}