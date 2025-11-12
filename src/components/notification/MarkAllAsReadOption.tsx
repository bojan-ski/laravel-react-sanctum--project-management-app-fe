import { type JSX } from 'react';
import { markAllNotificationsAsRead } from '../../features/regularUser/notificationSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import type { NotificationState } from '../../types/types';
import { Button } from '../ui/button';
import { CheckCheck } from 'lucide-react';
import toast from 'react-hot-toast';

function MarkAllAsReadOption({ onClose }: { onClose: () => void; }): JSX.Element {
    const { isLoading } = useAppSelector<NotificationState>(state => state.notifications);
    const dispatch = useAppDispatch();

    const handleMarkAllAsRead = async (): Promise<void> => {
        const response = await dispatch(markAllNotificationsAsRead());
        
        if (response.meta.requestStatus == 'fulfilled') {
            toast.success(response.payload.message);

            onClose();
        }

        if (response.meta.requestStatus == 'rejected') {
            toast.error(response.payload);
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleMarkAllAsRead}
            className="text-xs cursor-pointer"
            disabled={isLoading}
        >
            <CheckCheck className="h-3 w-3 mr-1" />
            {isLoading ? 'Wait...' : 'Mark all read'}
        </Button>
    );
}

export default MarkAllAsReadOption;