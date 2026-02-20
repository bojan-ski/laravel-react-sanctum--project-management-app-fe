import api from "../api/axios";
import type { TaskFormData } from "../schemas/taskSchema";
import type { NullDataApiResponse } from "../types/api";
import type {
    SelectedTaskDetailsResponse,
    UpdateTaskPriorityResponse,
    UpdateTaskStatusResponse
} from "../types/task";

export async function createTask(
    projectId: number,
    formData: TaskFormData
): Promise<NullDataApiResponse> {
    const response = await api.post(`/api/projects/${projectId}/tasks`, formData);

    return response.data;
}

export async function getTaskDetails(taskId: number): Promise<SelectedTaskDetailsResponse> {
    const response = await api.get(`/api/tasks/${taskId}`);

    return response.data;
}

export async function changeTaskStatus(
    taskId: number,
    newTaskStatus: string
): Promise<UpdateTaskStatusResponse> {
    const response = await api.put(`/api/tasks/${taskId}/status`, {
        status: newTaskStatus
    });

    return response.data;
}

export async function changeTaskPriority(
    taskId: number,
    newTaskPriority: string
): Promise<UpdateTaskPriorityResponse> {
    const response = await api.put(`/api/tasks/${taskId}/priority`, {
        priority: newTaskPriority
    });

    return response.data;
}

export async function deleteTask(taskId: number): Promise<NullDataApiResponse> {
    const response = await api.delete(`/api/tasks/${taskId}`);

    return response.data;
}
