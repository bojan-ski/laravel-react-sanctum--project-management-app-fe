import type { ApiResponse } from "./api";

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export type Task = {
    id: number;
    project_id: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    due_date: string;
    is_overdue: boolean;
    assignee: {
        id: number;
        name: string;
        email: string;
        avatar: string | null;
    };
    created_at: string;
    updated_at: string;
};

export type TaskDetails = {
    can_update_status: boolean;
    project: {
        id: number;
        title: string;
    };
    creator: {
        id: number;
        name: string;
        avatar: string | null;
    };
    activities: any;
} & Task;

// api response
export type SelectedTaskDetailsResponse = {
    status: 'success';
    message: string;
    data: TaskDetails;
};

export type UpdateTaskStatusResponse = {
    data: {
        id: number,
        status: string;
    } | null;
} & ApiResponse;

export type UpdateTaskPriorityResponse = {
    data: {
        id: number,
        priority: string;
    } | null;
} & ApiResponse;

export type TaskFormDataErrors = {
    assigned_to?: string;
    title?: string;
    description?: string;
    priority?: string;
    due_date?: string;
};

// task slice
export type TaskState = {
    isLoading: boolean;
    tasks: Task[];
};
