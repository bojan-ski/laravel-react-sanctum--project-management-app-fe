import api from "../api/axios";
import type { ProjectFormData } from "../types/types";

export async function getProjects(
    ownership: string = '',
    status: string = '',
    page: number = 1
) {
    const response = await api.get(`/api/projects`, {
        params: { ownership, status, page },
    });

    return response.data;
}

export const createProject = async (newProjectData: ProjectFormData) => {
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

export async function getProjectDetails(projectId: number) {
    const response = await api.get(`/api/projects/${projectId}`);    

    return response.data;
}

export async function getProjectData(projectId: number) {
    const response = await api.get(`/api/projects/${projectId}/edit`);
    // console.log(response);

    return response.data;
}

export async function updateProject(
    projectId: number,
    newProjectData: ProjectFormData
) {
    const formData = new FormData();
    formData.append('title', newProjectData.title);
    formData.append('description', newProjectData.description);
    formData.append('deadline', newProjectData.deadline);

    if (newProjectData.document_path) {
        formData.append('document_path', newProjectData.document_path);
    }

    formData.append('_method', 'PUT');

    const response = await api.post(`/api/projects/${projectId}/update`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
}

export const deleteProject = async (projectId: number) => {
    const response = await api.delete(`/api/projects/${projectId}/destroy`);

    return response.data;
};