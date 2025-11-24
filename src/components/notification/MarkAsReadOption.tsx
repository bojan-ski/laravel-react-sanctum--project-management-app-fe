import { type JSX, type MouseEvent } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useThunk } from '../../hooks/useThunk';
import { markNotificationsAsRead } from '../../features/regularUser/notificationSlice';
import type { Notification } from '../../types/types';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';

type MarkAsReadOptionProps = {
    notification: Notification;
    onClose?: () => void;
};

function MarkAsReadOption({
    notification,
    onClose
}: MarkAsReadOptionProps): JSX.Element {
    const { run } = useThunk(markNotificationsAsRead);
    const navigate: NavigateFunction = useNavigate();

    const handleMarkAsRead = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.stopPropagation();

        // mark as read
        const thunkCall = await run(notification.id);

        if (!thunkCall.ok){
            toast.error(thunkCall.error);
            return;
        }

        // navigate based on notification type and close notification dropdown
        setTimeout(() => {
            if (notification.type == 'project_update') {
                navigate(`/projects/${notification.notifiable_id}`);

               if(onClose) onClose();
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