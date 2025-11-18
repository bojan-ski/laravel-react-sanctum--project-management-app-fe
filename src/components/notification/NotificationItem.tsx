import { type JSX } from 'react';
import type { Notification } from '../../types/types';
import InvitationOptions from './InvitationOptions';
import MarkAsReadOption from './MarkAsReadOption';
import { formatDateAdvance } from '../../utils/helpers';

type NotificationItemProps = {
    notification: Notification;
    onClose: () => void;
};

const NotificationItem = ({
    notification,
    onClose
}: NotificationItemProps): JSX.Element => {
    return (
        <div
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

            {/* mark as read option */}
            {(!notification.is_invitation && !notification.read_at) && (
                <MarkAsReadOption
                    notification={notification}
                    onClose={onClose}
                />
            )}

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