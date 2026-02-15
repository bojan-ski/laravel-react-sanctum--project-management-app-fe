import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    acceptInvitation,
    declineInvitation,
    getNotifications,
    getUnreadCount,
    markAllAsRead,
    markAsRead
} from "../../services/notification";
import { handleAsyncThunkError } from "../../utils/reduxErrorHandler";
import type { Notification, NotificationState } from "../../types/notification";

const initialNotificationState: NotificationState = {
    isLoading: false,
    unreadNotifications: [],
    notifications: [],
    unreadCount: 0,
};

export const getUserNotifications = createAsyncThunk('notifications/getUserNotifications', async (
    unread: boolean,
    { rejectWithValue }
) => {
    console.log('getUserNotifications');

    try {
        const apiCall = await getNotifications(unread);
        console.log(apiCall);

        return apiCall;
    } catch (error: any) {
        console.log(error);
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const fetchUnreadCount = createAsyncThunk('notifications/fetchUnreadCount', async (
    _,
    { rejectWithValue }
) => {
    try {
        const apiCall = await getUnreadCount();
        console.log(apiCall);

        return apiCall;
    } catch (error: any) {
        console.log(error);
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const markNotificationsAsRead = createAsyncThunk('notifications/markAsRead', async (
    notificationId: number,
    { rejectWithValue }) => {
    try {
        const apiCall = await markAsRead(notificationId);
        console.log(apiCall);


        return apiCall;
    } catch (error: any) {
        console.log(error);
        return handleAsyncThunkError(error, rejectWithValue);
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
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const acceptProjectInvitation = createAsyncThunk('notifications/acceptInvitation', async (
    notificationId: number,
    { rejectWithValue }
) => {
    try {
        const apiCall = await acceptInvitation(notificationId);
        console.log(apiCall);

        return apiCall;
    } catch (error: any) {
        console.log(error);
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const declineProjectInvitation = createAsyncThunk('notifications/declineInvitation', async (
    notificationId: number,
    { rejectWithValue }) => {
    try {
        const apiCall = await declineInvitation(notificationId);
        console.log(apiCall);

        return apiCall;
    } catch (error: any) {
        console.log(error);
        return handleAsyncThunkError(error, rejectWithValue);
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
            })
            .addCase(getUserNotifications.fulfilled, (state, action) => {
                state.isLoading = false;

                const unreadMode = action.meta.arg;
                const notifications = action.payload.data;

                if (unreadMode) {
                    state.unreadNotifications = notifications;
                } else {
                    state.notifications = notifications;
                }
            })
            .addCase(getUserNotifications.rejected, (state) => {
                state.isLoading = false;
            })

            // fetch unread count
            .addCase(fetchUnreadCount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUnreadCount.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.unreadCount = payload.data.count;
            })
            .addCase(fetchUnreadCount.rejected, (state) => {
                state.isLoading = false;
            })

            // mark notifications as read
            .addCase(markNotificationsAsRead.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(markNotificationsAsRead.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                const notification = state.notifications.find((notification: Notification): boolean => notification.id === payload.data);

                if (notification && !notification.read_at) {
                    notification.read_at = new Date().toISOString();

                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                }
            })
            .addCase(markNotificationsAsRead.rejected, (state) => {
                state.isLoading = false;
            })

            // mark all notifications as read
            .addCase(markAllNotificationsAsRead.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
                state.isLoading = false;

                state.notifications.forEach((notification: Notification): void => {
                    if (!notification.read_at) {
                        notification.read_at = new Date().toISOString();
                    }
                });
                state.unreadCount = 0;
            })
            .addCase(markAllNotificationsAsRead.rejected, (state) => {
                state.isLoading = false;
            })

            // accept project invitation
            .addCase(acceptProjectInvitation.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(acceptProjectInvitation.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                const notification = state.notifications.find((notification: Notification) => notification.id == payload.data.id);

                if (notification) {
                    notification.action_taken = 'accepted';
                    notification.read_at = new Date().toISOString();

                    if (!notification.read_at) {
                        state.unreadCount = Math.max(0, state.unreadCount - 1);
                    }
                }
            })
            .addCase(acceptProjectInvitation.rejected, (state) => {
                state.isLoading = false;
            })

            // decline project invitation
            .addCase(declineProjectInvitation.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(declineProjectInvitation.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                const notification = state.notifications.find((notification: Notification) => notification.id === payload.data.id);

                if (notification) {
                    notification.action_taken = 'declined';
                    notification.read_at = new Date().toISOString();

                    if (!notification.read_at) {
                        state.unreadCount = Math.max(0, state.unreadCount - 1);
                    }
                }
            })
            .addCase(declineProjectInvitation.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default notificationSlice.reducer;