import { type JSX, type MouseEvent } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch } from '../../hooks/useRedux';
import { markNotificationsAsRead } from '../../features/regularUser/notificationSlice';
import { formatDateAdvance } from '../../utils/helpers';
import InvitationOptions from './InvitationOptions';
import toast from 'react-hot-toast';

type NotificationItemProps = {
    notification: any;
    onClose: () => void;
};

const NotificationItem = ({ notification, onClose }: NotificationItemProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const handleMarkAsRead = async (e: MouseEvent<HTMLDivElement>): Promise<void> => {
        e.stopPropagation();

        // mark as read
        if (!notification.read_at) {
            const response = await dispatch(markNotificationsAsRead(notification.id));

            if (response.meta.requestStatus == 'rejected') {
                toast.error(response.payload);
            }
        }

        // navigate based on notification type
        if (notification.type == 'project_update') {
            navigate(`/projects/${notification.notifiable_id}`);

            onClose();
        }
    }; 

    return (
        <div
            onClick={handleMarkAsRead}
            className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read_at ? 'bg-indigo-50/50' : ''}`}
        >
            {/* message */}
            <div className='text-xs mb-3'>
                <p>
                    {notification.data.message}
                </p>
                <p className="text-gray-500 mt-2">
                    {formatDateAdvance(notification.created_at)}
                </p>
            </div>

            {/* invitation action options */}
            {(notification.is_invitation && !notification.action_taken) && (
                <InvitationOptions 
                    notificationId={notification.id}
                    onClose={onClose}
                />
            )}
        </div>
    );
};

export default NotificationItem;