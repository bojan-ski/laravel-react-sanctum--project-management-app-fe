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
    is_creator: boolean,
    is_assignee: boolean,
} & Task;

// api response
export type GetUserTasksResponse = {
    data: Task[];
} & ApiResponse;

export type SelectedTaskDetailsResponse = {
    data: TaskDetails;
} & ApiResponse;

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

export type GetUserTasksResponseErrors = {
    ownership?: string;
    status?: string;
    priority?: string;
};

export type TaskFormDataErrors = {
    assigned_to?: string;
    title?: string;
    description?: string;
    priority?: string;
    due_date?: string;
};

// task slice
export type UserTasksFiltersOwner = 'all' | 'created' | 'assigned';
export type UserTasksFiltersStatus = 'all' | 'todo' | 'in_progress' | 'review' | 'done';
export type UserTasksFiltersPriority = 'all' | 'low' | 'medium' | 'high' | 'critical';

export type UserTasksFilters = {
    ownership: UserTasksFiltersOwner;
    status: UserTasksFiltersStatus;
    priority: UserTasksFiltersPriority;
};

export type UserTasksPagination = {
    currentPage: number;
    lastPage: number;
};

export type TaskState = {
    isLoading: boolean;
    projectTasks: Task[];
    userTasks: Task[];
    filters: UserTasksFilters;
    pagination: UserTasksPagination;
};
