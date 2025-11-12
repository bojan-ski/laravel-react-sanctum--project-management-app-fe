import { type JSX } from 'react';
import { CardHeader, CardTitle } from '../../ui/card';
import { Link } from 'react-router';

function BellHeader({ unreadCount }: { unreadCount: number; }): JSX.Element {
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
            </div>
        </CardHeader>
    );
}

export default BellHeader;