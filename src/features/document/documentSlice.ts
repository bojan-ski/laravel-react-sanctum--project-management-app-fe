import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteDocument, downloadDocument } from "../../services/document";
import { handleAsyncThunkError } from "../../utils/reduxErrorHandler";
import type { DocumentState } from "../../types/document";

const initialDocumentState: DocumentState = {
    isLoading: false,
};

type DownloadSelectedDocumentProps = {
    documentId: number;
    filename: string;
};

export const downloadSelectedDocument = createAsyncThunk('document/downloadSelectedDocument', async (
    { documentId, filename }: DownloadSelectedDocumentProps,
    { rejectWithValue }
) => {
    try {
        const apiCall = await downloadDocument(documentId, filename);

        return apiCall;
    } catch (error: any) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const deleteSelectedDocument = createAsyncThunk('document/deleteSelectedDocument', async (
    documentId: number,
    { rejectWithValue }
) => {
    try {
        const apiCall = await deleteDocument(documentId);  

        return apiCall;
    } catch (error: any) {
        console.log(error);
        
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

const documentSlice = createSlice({
    name: 'document',
    initialState: initialDocumentState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // download document
            .addCase(downloadSelectedDocument.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(downloadSelectedDocument.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(downloadSelectedDocument.rejected, (state) => {
                state.isLoading = false;
            })

            // delete document
            .addCase(deleteSelectedDocument.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteSelectedDocument.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteSelectedDocument.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default documentSlice.reducer;