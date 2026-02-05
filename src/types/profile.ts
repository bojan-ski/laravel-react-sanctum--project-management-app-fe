import type { User } from "./user";

export type ProfileResponse = {
    status: 'success';
    message: string;
    data: User;
};

export type PasswordChangeResponse = {
    status: 'success';
    message: string;
    data: null;
};

export type DeleteAccountResponse = {
    status: 'success';
    message: string;
    data: null;
};

export type ChangePasswordFormDataErrors = {
    old_password?: string;
    new_password?: string;
    new_password_confirm?: string;
};