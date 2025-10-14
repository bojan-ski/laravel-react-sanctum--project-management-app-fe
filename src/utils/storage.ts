import type { User } from "../types/types";

const USER_KEY: string = 'user';

// IN PRODUCTION CHANGE TO localStorage !!!

export function getUserDataFromLS(): User | null {
    const userData: string | null = sessionStorage.getItem(USER_KEY);

    return userData ? JSON.parse(userData) : null;
}

export function setUserDataInLS(userData: User): void {
    sessionStorage.setItem(USER_KEY, JSON.stringify(userData));
}

export function removeUserDataFromLS(): void {
    sessionStorage.removeItem(USER_KEY);
}