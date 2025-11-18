import { type JSX } from 'react';
import { useThunk } from '../../hooks/useThunk';
import { useAppSelector } from '../../hooks/useRedux';
import { markAllNotificationsAsRead } from '../../features/regularUser/notificationSlice';
import type { NotificationState } from '../../types/types';
import { Button } from '../ui/button';
import { CheckCheck } from 'lucide-react';
import toast from 'react-hot-toast';

function MarkAllAsReadOption({ onClose }: { onClose: () => void; }): JSX.Element {
    const { isLoading } = useAppSelector<NotificationState>(state => state.notifications);
    const { run } = useThunk(markAllNotificationsAsRead);

    const handleMarkAllAsRead = async (): Promise<void> => {

        const thunkCall = await run(undefined);

        if (thunkCall.ok) {
            toast.success(thunkCall.data.message);

            onClose();
        } else {
            toast.error(thunkCall.error);
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