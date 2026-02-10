export type Document = {
    id: number;
    documentable_type: string;
    documentable_id: string;
    uploaded_by: number;
    doc_name: string;
    doc_path: string;
    created_at: string;
    updated_at: string;
};

// document slice
export type DocumentState = {
    isLoading: boolean;
};