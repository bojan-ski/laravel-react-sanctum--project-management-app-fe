import type { ApiResponse } from "./api";

export type Message = {
    id: number;
    task_id: number;
    message: string;
    user: {
        id: number;
        name: string;
        avatar: string | null;
    };
    read_at: string | null;
    is_read: boolean;
    created_at: string;
    updated_at: string;
};

// api response
export type GetMessagesResponse = {
    data: Message[];
} & ApiResponse;

export type SendMessageResponse = {
    data: Message;
} & ApiResponse;

export type SendMessageResponseErrors = {
    message?: string;
};

export type DeleteMessageResponse = {
    data: {
        id: number;
    };
} & ApiResponse;

// message slice
export type MessageState = {
    isLoading: boolean;
    messages: Message[];
    unreadMessageCount: number;
};