import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMessages, sendMessage, } from "../../services/message";
import { handleAsyncThunkError } from "../../api/reduxErrorHandler";
import type { MessageState } from "../../types/message";

const initialMessageState: MessageState = {
    isLoading: false,
    messages: [],
};

export const getTaskMessages = createAsyncThunk('messages/getTaskMessages', async (
    taskId: number,
    { rejectWithValue }
) => {
    console.log('getTaskMessages');

    try {
        const apiCall = await getMessages(taskId);
        console.log(apiCall);

        return apiCall;
    } catch (error: any) {
        console.log(error);

        return handleAsyncThunkError(error, rejectWithValue);
    }
});

type SendTaskMessagesProps = {
    taskId: number;
    message: string;
};

export const sendTaskMessages = createAsyncThunk('messages/sendTaskMessages', async (
    { taskId, message }: SendTaskMessagesProps,
    { rejectWithValue }
) => {
    console.log('getUserNotifications');

    try {
        const apiCall = await sendMessage(taskId, message);
        console.log(apiCall);

        return apiCall;
    } catch (error: any) {
        console.log(error);

        return handleAsyncThunkError(error, rejectWithValue);
    }
});


const messageSlice = createSlice({
    name: 'messages',
    initialState: initialMessageState,
    reducers: {
        addMessage: (state, { payload }): void => {
            console.log(payload);

            state.messages.push(payload);
        },
    },
    extraReducers: (builder) => {
        builder
            // get task messages
            .addCase(getTaskMessages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTaskMessages.fulfilled, (state, { payload }) => {
                console.log(payload);

                state.isLoading = false;

                state.messages = payload.data;
            })
            .addCase(getTaskMessages.rejected, (state) => {
                state.isLoading = false;
            })

            // send message
            .addCase(sendTaskMessages.fulfilled, (state, { payload }) => {
                console.log(payload);

                state.messages.push(payload.data);
            });
    },
});

export const {
    addMessage
} = messageSlice.actions;
export default messageSlice.reducer;