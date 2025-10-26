import api from "../api/axios";

export async function getUserProjects(page: number = 1) {
    const response = await api.get(`/api/projects`, {
        params: { page },
    });
    console.log(response);

    return response.data;
}

export async function createProject(newProjectData: any) {
    const response = await api.post('/api/projects', newProjectData);

    return response.data;
}