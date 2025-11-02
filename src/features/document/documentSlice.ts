import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteDocument } from "../../services/document";

const initialDocumentState = {
    isLoading: false,
};

export const deleteProjectDocument = createAsyncThunk('document/deleteUserProject', async (
    projectId: number,
    { rejectWithValue }
) => {
    try {
        const apiCall = await deleteDocument(projectId);       

        return { projectId, message: apiCall.message };
    } catch (error: any) {        
        return rejectWithValue(error?.response?.statusText || 'Error - Delete project');
    }
});

const documentSlice = createSlice({
    name: 'document',
    initialState: initialDocumentState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteProjectDocument.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProjectDocument.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteProjectDocument.rejected, (state) => {                
                state.isLoading = false;
            })

    },
});

export default documentSlice.reducer;