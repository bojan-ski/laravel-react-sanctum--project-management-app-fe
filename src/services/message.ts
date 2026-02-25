import api from "../api/axios";

export async function getMessages(taskId: number) {
    const response = await api.get(`/api/tasks/${taskId}/messages`);
    console.log(response);    

    return response.data;
}

export async function sendMessage(
    taskId: number,
    message: string
) {
    const response = await api.post(`/api/tasks/${taskId}/messages`, { message });
    console.log(response);    

    return response.data;
}