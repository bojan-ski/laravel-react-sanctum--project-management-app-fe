import { type JSX } from 'react';
import { CardHeader, CardTitle } from '../../ui/card';
import MarkAllAsReadOption from '../MarkAllAsReadOption';
import { Link } from 'react-router';

type BellHeaderProps = {
    unreadCount: number;
    onClose: () => void;
};

function BellHeader({ unreadCount, onClose }: BellHeaderProps): JSX.Element {
    return (
        <CardHeader className="border-b">
            <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                    <Link
                        className='text-blue-500 hover hover:text-blue-700 cursor-pointer'
                        to={'/notifications'}>
                        Notifications
                    </Link>
                </CardTitle>

                {/* mark all notifications as read option */}
                {unreadCount > 0 && <MarkAllAsReadOption onClose={onClose} />}
            </div>
        </CardHeader>
    );
}

export default BellHeader;