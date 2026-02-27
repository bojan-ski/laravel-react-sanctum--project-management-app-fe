import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteMessage, getMessages, markMessagesAsRead, sendMessage, } from "../../services/message";
import { handleAsyncThunkError } from "../../api/reduxErrorHandler";
import type { Message, MessageState, SendMessageResponseErrors } from "../../types/message";

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

        return apiCall;
    } catch (error: any) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

type SendTaskMessageProps = {
    taskId: number;
    message: string;
};

export const sendTaskMessage = createAsyncThunk('messages/sendTaskMessage', async (
    { taskId, message }: SendTaskMessageProps,
    { rejectWithValue }
) => {
    try {
        const apiCall = await sendMessage(taskId, message);

        return apiCall;
    } catch (error: any) {
        return handleAsyncThunkError<SendMessageResponseErrors>(error, rejectWithValue);
    }
});

export const markTaskMessagesAsRead = createAsyncThunk('messages/markMessagesAsRead', async (
    taskId: number,
    { rejectWithValue }
) => {
    try {
        const apiCall = await markMessagesAsRead(taskId);

        return apiCall;
    } catch (error: any) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

type DeleteTaskMessageProps = {
    taskId: number;
    messageId: number;
};

export const deleteTaskMessage = createAsyncThunk('messages/deleteTaskMessage', async (
    { taskId, messageId }: DeleteTaskMessageProps,
    { rejectWithValue }
) => {
    try {
        const apiCall = await deleteMessage(taskId, messageId);

        return apiCall;
    } catch (error: any) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

const messageSlice = createSlice({
    name: 'messages',
    initialState: initialMessageState,
    reducers: {
        addMessage: (state, { payload }): void => {
            state.messages.push(payload);
        },
        removeMessage: (state, {payload}): void => {
            state.messages = state.messages.filter(
                message => message.id !== payload.message_id
            );
        },
    },
    extraReducers: (builder) => {
        builder
            // get task messages
            .addCase(getTaskMessages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTaskMessages.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                state.messages = payload.data;
            })
            .addCase(getTaskMessages.rejected, (state) => {
                state.isLoading = false;
            })

            // send message
            .addCase(sendTaskMessage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendTaskMessage.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                state.messages.push(payload.data);
            })
            .addCase(sendTaskMessage.rejected, (state) => {
                state.isLoading = false;
            })

            // mark messages as read
            .addCase(markTaskMessagesAsRead.fulfilled, (state) => {
                state.messages = state.messages.map((message): Message => ({
                    ...message,
                    read_at: message.read_at || new Date().toISOString(),
                    is_read: true
                }));
            })

            // delete message
            .addCase(deleteTaskMessage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTaskMessage.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                state.messages = state.messages.filter(
                    message => message.id !== payload.data.id
                );
            })
            .addCase(deleteTaskMessage.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const {
    addMessage,
    removeMessage
} = messageSlice.actions;
export default messageSlice.reducer;