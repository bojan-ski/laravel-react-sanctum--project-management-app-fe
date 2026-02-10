import api from "../api/axios";
import type { NullDataApiResponse } from "../types/api";

export const downloadDocument = async (
    documentId: number,
    filename: string
): Promise<void> => {
    const response = await api.get(`/api/documents/${documentId}/download`, {
        responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
};

export const deleteDocument = async (documentId: number): Promise<NullDataApiResponse> => {
    const response = await api.delete(`/api/documents/${documentId}/destroy`);

    return response.data;
};