export type Message = {
    id: number;
    task_id: number;
    message: string;
    user: {
        id: number;
        name: string;
        avatar: string | null;
    };
    created_at: string;
};

// message slice
export type MessageState = {
    isLoading: boolean;
    messages: Message[];
};