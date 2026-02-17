import api from "../api/axios";
import type { TaskFormData } from "../schemas/taskSchema";
import type { NullDataApiResponse } from "../types/api";

export async function createTask(
    projectId: number, 
    formData: TaskFormData
): Promise<NullDataApiResponse> {
    const response = await api.post(`/api/projects/${projectId}/tasks`, formData);  

    return response.data;
}