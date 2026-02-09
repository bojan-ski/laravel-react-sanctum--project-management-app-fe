export type ApiResponseStatus = 'success' | 'error';

export type NullDataApiResponse = {
    status: ApiResponseStatus;
    message: string;
    data: null;
};