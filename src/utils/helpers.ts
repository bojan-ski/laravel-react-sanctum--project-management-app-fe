import type { Task } from "../types/task";

export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

export const formatDateAdvance = (dateString: string): string => {
    const date: any = new Date(dateString);
    const now: any = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const userInitials = (name: string): string => {
    return name
        .split(' ')
        .map(n => n[ 0 ])
        .join('')
        .toUpperCase()
        .substring(0, 2);
};

export const getTasksByStatus = (tasks: Task[]) => {
    return {
        to_do: tasks.filter(t => t.status === 'to_do'),
        in_progress: tasks.filter(t => t.status === 'in_progress'),
        review: tasks.filter(t => t.status === 'review'),
        done: tasks.filter(t => t.status === 'done'),
    };
}

export const getTaskStatusColor = (status: string): string => {
    switch (status) {
        case 'todo':
            return 'bg-gray-500';
        case 'in_progress':
            return 'bg-blue-500';
        case 'review':
            return 'bg-yellow-500';
        case 'done':
            return 'bg-green-500';
        default:
            return 'bg-gray-500';
    }
};

export const getTaskPriorityColor = (priority: string): string => {
    switch (priority) {
        case 'low':
            return 'bg-gray-200 text-gray-800';
        case 'medium':
            return 'bg-blue-200 text-blue-800';
        case 'high':
            return 'bg-orange-200 text-orange-800';
        case 'critical':
            return 'bg-red-200 text-red-800';
        default:
            return 'bg-gray-200 text-gray-800';
    }
};

export const getTaskStatusLabel = (status: string): string => {
    switch (status) {
        case 'to_do':
            return 'To Do';
        case 'in_progress':
            return 'In Progress';
        case 'review':
            return 'Review';
        case 'done':
            return 'Done';
        default:
            return status;
    }
};