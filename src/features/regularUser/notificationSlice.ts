import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNotifications, getUnreadCount, markAllAsRead, markAsRead } from "../../services/notification";
import type { Notification } from "../../types/types";

export type NotificationState = {
    isLoading: boolean;
    notifications: Notification[];
    unreadCount: number;
    error: string;
};

const initialNotificationState: NotificationState = {
    isLoading: false,
    notifications: [],
    unreadCount: 0,
    error: '',
};

export const getUserNotifications = createAsyncThunk('notifications/getUserNotifications', async (
    _,
    { rejectWithValue }
) => {
    console.log('getUserNotifications');

    try {
        const apiCall = await getNotifications();

        return apiCall;
    } catch (error: any) {
        return rejectWithValue(error?.response?.statusText || 'Error - Get user notifications');
    }
});

export const fetchUnreadCount = createAsyncThunk('notifications/fetchUnreadCount', async (
    _,
    { rejectWithValue }
) => {
    try {
        const apiCall = await getUnreadCount();

        return apiCall;
    } catch (error: any) {
        return rejectWithValue(error?.response?.statusText || 'Error - Fetch unread count');
    }
});

export const markNotificationsAsRead = createAsyncThunk('notifications/markAsRead', async (
    { notificationId }: { notificationId: number; },
    { rejectWithValue }) => {
    try {
        const apiCall = await markAsRead(notificationId);
        console.log(apiCall);

        return apiCall;
    } catch (error: any) {
        console.log(error);

        return rejectWithValue(error?.response?.statusText || 'Error - Mark as read');
    }
});

export const markAllNotificationsAsRead = createAsyncThunk('notifications/markAllAsRead', async (
    _,
    { rejectWithValue }
) => {
    try {
        const apiCall = await markAllAsRead();
        console.log(apiCall);

        return apiCall;
    } catch (error: any) {
        console.log(error);

        return rejectWithValue(error?.response?.statusText || 'Error - Mark all messages as read');
    }
});

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: initialNotificationState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get user notifications
            .addCase(getUserNotifications.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(getUserNotifications.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.notifications = payload.data
            })
            .addCase(getUserNotifications.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload as string;
            })

            // fetch unread count
            .addCase(fetchUnreadCount.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(fetchUnreadCount.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.unreadCount = payload.data.count
            })
            .addCase(fetchUnreadCount.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload as string;
            })

            // mark notifications as read
            .addCase(markNotificationsAsRead.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(markNotificationsAsRead.fulfilled, (state, { payload }) => {
                console.log(payload);

                state.isLoading = false;
            })
            .addCase(markNotificationsAsRead.rejected, (state, { payload }) => {
                console.log(payload);

                state.isLoading = false;
                state.error = payload as string;
            })

            // mark all notifications as read
            .addCase(markAllNotificationsAsRead.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(markAllNotificationsAsRead.fulfilled, (state, { payload }) => {
                console.log(payload);

                state.isLoading = false;
            })
            .addCase(markAllNotificationsAsRead.rejected, (state, { payload }) => {
                console.log(payload);

                state.isLoading = false;
                state.error = payload as string;
            });
    },
});

export default notificationSlice.reducer;