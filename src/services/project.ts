import api from "../api/axios";

export async function getUserProjects(ownership: string = '', page: number = 1) {
    const response = await api.get(`/api/projects`, {
        params: { ownership, page },
    });
    console.log(response);

    return response.data;
}

export async function createProject(newProjectData: any) {
    const response = await api.post('/api/projects', newProjectData);

    return response.data;
}