import api from "../api/axios";

export async function getUserProjects() {
    const response = await api.get(`/api/projects`);
    console.log(response);

    return response.data;
}

export async function createProject(newProjectData: any) {
    const response = await api.post('/api/projects', newProjectData);

    return response.data;
}