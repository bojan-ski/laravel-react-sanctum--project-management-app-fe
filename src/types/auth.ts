import type { User } from "./user";

export type LoginResponse = {
    status: 'success';
    message: string;
    data: User;
}

export type LogoutResponse = {
    status: 'success';
    message: string;
    data: null;
}