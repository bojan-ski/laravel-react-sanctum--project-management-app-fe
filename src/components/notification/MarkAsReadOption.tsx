import { type JSX, type MouseEvent } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch } from '../../hooks/useRedux';
import { markNotificationsAsRead } from '../../features/regularUser/notificationSlice';
import type { Notification } from '../../types/types';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';

type MarkAsReadOptionProps = {
    notification: Notification;
    onClose: () => void;
};

function MarkAsReadOption({
    notification,
    onClose
}: MarkAsReadOptionProps): JSX.Element {
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const handleMarkAsRead = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.stopPropagation();

        // mark as read
        if (!notification.read_at) {
            const response = await dispatch(markNotificationsAsRead(notification.id));

            if (response.meta.requestStatus == 'rejected') {
                toast.error(response.payload);
            }
        }

        // navigate based on notification type
        setTimeout(() => {
            if (notification.type == 'project_update') {
                navigate(`/projects/${notification.notifiable_id}`);

                onClose();
            }
        }, 1000);
    };

    return (
        <div className='text-end'>
            <Button
                size='sm'
                variant={'outline'}
                className='text-xs cursor-pointer'
                onClick={handleMarkAsRead}>
                read
            </Button>
        </div>
    );
}

export default MarkAsReadOption;