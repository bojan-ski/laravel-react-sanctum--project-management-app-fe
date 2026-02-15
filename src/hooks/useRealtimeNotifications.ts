import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import echo from '../lib/echo';
import { addNotification } from '../features/regularUser/notificationSlice';
import type { AuthState } from '../types/auth';

function useRealtimeNotifications(): void {
    const { user } = useAppSelector<AuthState>(state => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!user.is_authenticated) return;

        const channel = echo
            .private(`notifications.${user.id}`)
            .listen('NotificationSent', (data: any) => {
                dispatch(addNotification(data.notification));
            });

        return () => {
            echo.leave(`notifications.${user.id}`);
        };
    }, [ user.is_authenticated, user.id, dispatch ]);
}

export default useRealtimeNotifications;