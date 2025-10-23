import api from "../api/axios";

export async function createProject(newProjectData: any) {
    const response = await api.post('/api/projects', newProjectData);

    return response.data;
}