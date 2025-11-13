import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { acceptInvitation, declineInvitation, getNotifications, getUnreadCount, markAllAsRead, markAsRead } from "../../services/notification";
import type { Notification, NotificationState } from "../../types/types";

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
    notificationId: number,
    { rejectWithValue }) => {
    try {
        const apiCall = await markAsRead(notificationId);

        return apiCall;
    } catch (error: any) {
        return rejectWithValue(error?.response?.statusText || 'Error - Mark as read');
    }
});

export const markAllNotificationsAsRead = createAsyncThunk('notifications/markAllAsRead', async (
    _,
    { rejectWithValue }
) => {
    try {
        const apiCall = await markAllAsRead();

        return apiCall;
    } catch (error: any) {
        return rejectWithValue(error?.response?.statusText || 'Error - Mark all messages as read');
    }
});

export const acceptProjectInvitation = createAsyncThunk('notifications/acceptInvitation', async (
    notificationId: number,
    { rejectWithValue }
) => {
    try {
        const apiCall = await acceptInvitation(notificationId);

        return apiCall;
    } catch (error: any) {
        return rejectWithValue(error?.response?.statusText || 'Error - Accept Invitation');
    }
});

export const declineProjectInvitation = createAsyncThunk('notifications/declineInvitation', async (
    notificationId: number,
    { rejectWithValue }) => {
    try {
        const apiCall = await declineInvitation(notificationId);       

        return apiCall;
    } catch (error: any) {
        return rejectWithValue(error?.response?.statusText || 'Error - Decline Invitation');
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
                state.notifications = payload.data;
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
                state.unreadCount = payload.data.count;
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
                state.isLoading = false;

                const notification = state.notifications.find((notification: Notification): boolean => notification.id === payload.data);

                if (notification && !notification.read_at) {
                    notification.read_at = new Date().toISOString();

                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                }
            })
            .addCase(markNotificationsAsRead.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload as string;
            })

            // mark all notifications as read
            .addCase(markAllNotificationsAsRead.pending, (state) => {
                state.isLoading = true;
                state.error = '';
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
            .addCase(markAllNotificationsAsRead.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload as string;
            })

            // accept project invitation
            .addCase(acceptProjectInvitation.pending, (state) => {
                state.isLoading = true;
                state.error = '';
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
            .addCase(acceptProjectInvitation.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload as string;
            })

            // decline project invitation
            .addCase(declineProjectInvitation.pending, (state) => {
                state.isLoading = true;
                state.error = '';
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
            .addCase(declineProjectInvitation.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload as string;
            });
    },
});

export default notificationSlice.reducer;