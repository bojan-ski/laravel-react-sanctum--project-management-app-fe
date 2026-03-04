import { useState, type JSX } from 'react';
import { useAppSelector } from '../../../hooks/useRedux';
import useRealtimeNotifications from '../../../hooks/useRealtimeNotifications';
import { NotificationBellProvider } from '../../../context/notificationBellProvider';
import type { NotificationState } from '../../../types/notification';
import NotificationDropdown from './NotificationDropdown';
import { Button } from '../../ui/button';
import { Bell } from 'lucide-react';

const NotificationBell = (): JSX.Element => {
    const { unreadCount } = useAppSelector<NotificationState>(state => state.notifications);
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    useRealtimeNotifications();

    return (
        <div className="text-center relative">
            <Button
                size="icon"
                className="text-white relative bg-yellow-600 hover:bg-yellow-500 border border-white cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
            >
                <Bell />
                {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-white text-gray-800 text-xs flex items-center justify-center border border-yellow-500">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </Button>

            {isOpen && (
                <NotificationBellProvider closeDropdown={() => setIsOpen(false)}>
                    <NotificationDropdown isOpen={isOpen} />
                </NotificationBellProvider>
            )}
        </div>
    );
};

export default NotificationBell;