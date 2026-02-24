import api from "../api/axios";
import type { ProjectFormData } from "../schemas/projectSchema";
import type { NullDataApiResponse } from "../types/api";
import type {
    GetProjectsResponse,
    SelectedProjectDataResponse,
    SelectedProjectDetailsResponse
} from "../types/project";

export async function getProjects(
    ownership: string = 'all',
    status: string = 'all',
    page: number = 1
): Promise<GetProjectsResponse> {
    const response = await api.get(`/api/projects`, {
        params: {
            ownership,
            status,
            page
        },
    });

    return response.data;
}

export const createProject = async (newProjectData: ProjectFormData): Promise<NullDataApiResponse> => {
    const formData = new FormData();
    formData.append('title', newProjectData.title);
    formData.append('description', newProjectData.description);
    formData.append('deadline', newProjectData.deadline);

    if (newProjectData.document) {
        formData.append('document', newProjectData.document);
    }

    const response = await api.post('/api/projects', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

export async function getProjectDetails(projectId: number): Promise<SelectedProjectDetailsResponse> {
    const response = await api.get(`/api/projects/${projectId}`);    

    return response.data;
}

export async function getProjectData(projectId: number): Promise<SelectedProjectDataResponse> {
    const response = await api.get(`/api/projects/${projectId}/edit`);

    return response.data;
}

export async function updateProject(
    projectId: number,
    updateProjectData: ProjectFormData
): Promise<SelectedProjectDataResponse> {
    const formData = new FormData();
    formData.append('title', updateProjectData.title);
    formData.append('description', updateProjectData.description);
    formData.append('deadline', updateProjectData.deadline);

    if (updateProjectData.document) {
        formData.append('document', updateProjectData.document);
    }

    formData.append('_method', 'PUT');

    const response = await api.post(`/api/projects/${projectId}/update`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
}

export const statusChange = async (
    projectId: number,
    newProjectStatus: string
): Promise<SelectedProjectDetailsResponse> => {
    const response = await api.put(`/api/projects/${projectId}/status`, {
        status: newProjectStatus
    });

    return response.data;
};

export const deleteProject = async (projectId: number): Promise<NullDataApiResponse> => {
    const response = await api.delete(`/api/projects/${projectId}/destroy`);

    return response.data;
};