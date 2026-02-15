import { type JSX, type MouseEvent } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useThunk } from '../../hooks/useThunk';
import { markNotificationsAsRead } from '../../features/regularUser/notificationSlice';
import type { Notification } from '../../types/notification';
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
    const navigate: NavigateFunction = useNavigate();
    const { run } = useThunk(markNotificationsAsRead);    

    const handleMarkAsRead = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.stopPropagation();

        const thunkCall = await run(notification.id);
        console.log(thunkCall);        

        if (thunkCall.ok) {
            toast.success(thunkCall.data.message);
        } else {
            toast.error(thunkCall.error.random || "Mark As Read Error");
        }

        // navigate based on notification type and close notification dropdown
        setTimeout(() => {
            if (notification.type == 'project_update') {
                navigate(`/projects/${notification.notifiable_id}`);

                if (onClose) onClose();
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