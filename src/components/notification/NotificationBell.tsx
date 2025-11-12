import { useState, type JSX } from 'react';
import { useAppSelector } from '../../hooks/useRedux';
import useNotification from '../../hooks/useNotification';
import type { NotificationState } from '../../features/regularUser/notificationSlice';
import NotificationDropdown from './NotificationDropdown';
import { Button } from '../ui/button';
import { Bell } from 'lucide-react';

const NotificationBell = (): JSX.Element => {
    const { unreadCount } = useAppSelector<NotificationState>(state => state.notifications);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // run fetch notifications on 60s
    useNotification(true, 60000);

    return (
        <div className="relative">
            <Button
                size="icon"
                className="text-white bg-yellow-600 hover:bg-yellow-500 border border-white cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
            >
                <Bell />
                {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </Button>

            {isOpen && (
                <NotificationDropdown
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default NotificationBell;