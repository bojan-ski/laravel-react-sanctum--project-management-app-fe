import { type JSX } from 'react';
import type { Notification } from '../../types/notification';
import InvitationOptions from './InvitationOptions';
import MarkAsReadOption from './MarkAsReadOption';
import { formatDateAdvance } from '../../utils/helpers';

type NotificationItemProps = {
    notification: Notification;
    onClose?: () => void;
};

const NotificationItem = ({
    notification,
    onClose
}: NotificationItemProps): JSX.Element => {
    return (
        <div
            className={`px-4 py-2 hover:bg-gray-50 transition-colors ${!notification.read_at ? 'bg-indigo-50/50' : ''}`}
        >
            <div className='text-xs text-start mb-1'>
                <p>
                    {notification.data.message}
                </p>
                <p className="text-gray-600 mt-2">
                    {formatDateAdvance(notification.created_at)}
                </p>
            </div>

            {(!notification.is_invitation && !notification.read_at) && (
                <MarkAsReadOption
                    notification={notification}
                    onClose={onClose}
                />
            )}

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