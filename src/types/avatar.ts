export type UpdateUserAvatarResponse = {
    status: 'success';
    message: string;
    data: null;
};

export type UpdateUserAvatarFormDataError = {
    avatar?: string;
};