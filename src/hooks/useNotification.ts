import { useEffect } from 'react';
import { useAppDispatch } from './useRedux';
import { fetchUnreadCount } from '../features/regularUser/notificationSlice';

function useNotification(enabled = true, interval = 60000) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log('useEffect - useNotification');
        
        if (!enabled) return;

        dispatch(fetchUnreadCount());

        const pollInterval = setInterval(() => {
            dispatch(fetchUnreadCount());
        }, interval);

        return () => {
            clearInterval(pollInterval);
        };
    }, [enabled, interval]);
}

export default useNotification;