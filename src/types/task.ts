import type { ApiResponse } from "./api";
import type { Document } from "./document";

export type TaskStatus = 'to_do' | 'in_progress' | 'review' | 'done';
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
    can_view_task: boolean;
    created_at: string;
    updated_at: string;
};

export type TaskActivityAction = 'status_changed' | 'priority_changed' | 'document_uploaded';

export type TaskActivity = {
    id: number;
    task_id: number;
    user_id: number;
    user: {
        id: number;
        name: string;
        email: string;
        avatar: string | null;
    };
    action: TaskActivityAction;
    changes: {
        from: string;
        to: string;
    };
    document: Document;
    created_at: string;
    updated_at: string;
};

export type TaskDetails = {
    project: {
        id: number;
        title: string;
        status: string;
        is_active: boolean;
    };
    creator: {
        id: number;
        name: string;
        email: string;
        avatar: string | null;
    };
    task_in_progress: boolean;
    activities: TaskActivity[];
    is_creator: boolean,
    is_assignee: boolean,
} & Task;

// api response
export type GetUserTasksResponse = {
    data: {
        data: Task[];
        current_page: number;
        last_page: number;
    };
} & ApiResponse;

export type SelectedTaskDetailsResponse = {
    data: TaskDetails;
} & ApiResponse;

export type UpdateTaskStatusResponse = {
    data: {
        id: number,
        status: string;
    };
} & ApiResponse;

export type UpdateTaskPriorityResponse = {
    data: {
        id: number,
        priority: string;
    };
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
export type UserTasksFiltersStatus = 'all' | 'to_do' | 'in_progress' | 'review' | 'done';
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
