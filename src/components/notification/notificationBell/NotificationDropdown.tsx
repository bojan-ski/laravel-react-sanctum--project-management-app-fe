import { useEffect, useRef, type JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { fetchUnreadCount, getUserNotifications } from '../../../features/regularUser/notificationSlice';
import { useNotificationBell } from '../../../context/notificationBellProvider';
import type { NotificationState } from '../../../types/notification';
import { Card } from '../../ui/card';
import BellHeader from './BellHeader';
import BellContent from './BellContent';

const NotificationDropdown = ({ isOpen }: { isOpen: boolean; }): JSX.Element => {
    const { isLoading, unreadNotifications, unreadCount } = useAppSelector<NotificationState>(state => state.notifications);
    const dispatch = useAppDispatch();
    const { closeDropdown } = useNotificationBell();
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            dispatch(fetchUnreadCount());
            dispatch(getUserNotifications(true));
        }
    }, [ isOpen, dispatch ]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent): void => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                closeDropdown();
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [ isOpen, closeDropdown ]);

    return (
        <div
            ref={dropdownRef}
            className="absolute -right-20 md:-right-40 top-12 w-64 md:w-96 max-h-[600px] z-50 shadow-lg"
        >
            <Card className='p-0 gap-0'>
                <BellHeader unreadCount={unreadCount} />
                <BellContent
                    isLoading={isLoading}
                    notifications={unreadNotifications}
                />
            </Card>
        </div>
    );
};

export default NotificationDropdown;