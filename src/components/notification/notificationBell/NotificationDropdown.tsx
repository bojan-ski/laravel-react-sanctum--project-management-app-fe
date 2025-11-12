import { useEffect, useRef, type JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { getUserNotifications } from '../../../features/regularUser/notificationSlice';
import type { NotificationState } from '../../../types/types';
import BellHeader from './BellHeader';
import BellContent from './BellContent';
import { Card } from '../../ui/card';

type NotificationDropdownProps = {
    isOpen: boolean;
    onClose: () => void;
};

const NotificationDropdown = ({ isOpen, onClose }: NotificationDropdownProps): JSX.Element => {
    const { isLoading, notifications, unreadCount } = useAppSelector<NotificationState>(state => state.notifications);
    const dispatch = useAppDispatch();
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // fetch notifications on dropdown opens
    useEffect(() => {
        if (isOpen) {
            dispatch(getUserNotifications());
        }
    }, [isOpen, dispatch]);

    // close dropdown on clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent): void => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen, onClose]);    

    return (
        <div
            ref={dropdownRef}
            className="absolute right-0 top-12 w-96 max-h-[600px] z-50 shadow-lg"
        >
            <Card>
                <BellHeader unreadCount={unreadCount} />

                <BellContent
                    isLoading={isLoading}
                    notifications={notifications}
                    onClose={onClose}
                />
            </Card>
        </div>
    );
};

export default NotificationDropdown;