import type { User } from "./user";

export type Member = {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    joined_at: string;
};

// member slice
export type ProjectMembersState = {
    isLoading: boolean;
    availableUsers: User[];
};