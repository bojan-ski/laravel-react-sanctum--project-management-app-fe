import api from "../api/axios";
import type { NewProjectFormData } from "../types/types";

export async function getUserProjects(
    ownership: string = '',
    status: string = '',
    page: number = 1
) {
    const response = await api.get(`/api/projects`, {
        params: { ownership, status, page },
    });

    return response.data;
}

export const createProject = async (newProjectData: NewProjectFormData) => {
    const formData = new FormData();
    formData.append('title', newProjectData.title);
    formData.append('description', newProjectData.description);
    formData.append('deadline', newProjectData.deadline);

    if (newProjectData.document_path) {
        formData.append('document_path', newProjectData.document_path);
    }

    const response = await api.post('/api/projects', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

export const deleteProject = async (projectId: string) => {
    const response = await api.delete(`/api/projects/${projectId}`);   

    return response.data;
};