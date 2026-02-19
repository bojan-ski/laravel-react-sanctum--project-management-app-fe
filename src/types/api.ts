export type ApiResponseStatus = 'success' | 'error';

export type ApiResponse = {
    status: ApiResponseStatus;
    message: string;
};

export type NullDataApiResponse = {
    data: null;
} & ApiResponse;