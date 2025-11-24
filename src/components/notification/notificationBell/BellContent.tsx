import { type JSX } from 'react';
import type { Notification } from '../../../types/types';
import { useNotificationBell } from '../../../context/notificationBellProvider';
import NotificationItem from '../NotificationItem';
import { CardContent } from '../../ui/card';
import { Skeleton } from '../../ui/skeleton';
import { Inbox } from 'lucide-react';

type BellContentProps = {
    isLoading: boolean;
    notifications: Notification[];
};

function BellContent({
    isLoading,
    notifications,
}: BellContentProps): JSX.Element {
    const { closeDropdown } = useNotificationBell();

    return (
        <CardContent className="p-0 max-h-[500px] overflow-y-auto">
            {isLoading ? (
                <div className="p-4 space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-3 w-2/3" />
                        </div>
                    ))}
                </div>
            ) : notifications.length == 0 ? (
                <div className="text-center py-8">
                    <Inbox className="h-12 w-12 mx-auto mb-3" />
                    <p>
                        No notifications yet
                    </p>
                </div>
            ) : (
                <div className="divide-y">
                    {notifications.map((notification: Notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onClose={closeDropdown}
                        />
                    ))}
                </div>
            )}
        </CardContent>
    );
}

export default BellContent;