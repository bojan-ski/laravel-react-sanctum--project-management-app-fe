import api from "../api/axios";

export const deleteDocument = async (projectId: number) => {
    const response = await api.delete(`/api/projects/${projectId}/delete_file`);   

    return response.data;
};