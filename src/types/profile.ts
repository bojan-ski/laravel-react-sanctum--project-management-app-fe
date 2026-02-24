import type { ApiResponse } from "./api";
import type { User } from "./user";

export type ProfileResponse = {
    data: User;
} & ApiResponse;

export type ChangePasswordFormDataErrors = {
    old_password?: string;
    new_password?: string;
    new_password_confirm?: string;
};

export type DeleteAccountFormDataError = {
    password?: string;
};