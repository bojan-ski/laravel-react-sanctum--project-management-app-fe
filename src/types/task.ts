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
    assignee: {
        id: number;
        name: string;
        email: string;
        avatar: string | null;
    };
    created_at: string;
    updated_at: string;
};

// task slice
export type TaskState = {
    isLoading: boolean;
    tasks: Task[];
};

// create task
export type TaskFormDataErrors = {
    assigned_to?: string;
    title?: string;
    description?: string;
    priority?: string;
    due_date?: string;
};