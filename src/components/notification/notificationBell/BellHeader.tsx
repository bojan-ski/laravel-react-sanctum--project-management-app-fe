import { type JSX } from 'react';
import { CardHeader, CardTitle } from '../../ui/card';
import MarkAllAsReadOption from '../MarkAllAsReadOption';
import { Link } from 'react-router';

function BellHeader({ unreadCount }: { unreadCount: number; }): JSX.Element {
    return (
        <CardHeader className="border-b pt-6 gap-0">
            <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                    <Link
                        className='text-base md:text-lg text-blue-500 hover hover:text-blue-700 cursor-pointer'
                        to={'/notifications'}
                    >
                        Notifications
                    </Link>
                </CardTitle>

                {unreadCount > 0 && <MarkAllAsReadOption />}
            </div>
        </CardHeader>
    );
}

export default BellHeader;