import { type JSX } from 'react';
import type { User } from '../../../types/user';
import UserAvatar from '../../global/UserAvatar';
import { formatDate } from '../../../utils/helpers';
import { Calendar, Mail } from 'lucide-react';

function RegularUserData({ user }: { user: User; }): JSX.Element {
    return (
        <div className="bg-white border rounded-lg p-6">
            <UserAvatar
                name={user.name}
                avatar={user.avatar}
                avatarCss='h-20 w-20 mb-4'
                avatarFallbackCss="text-lg bg-blue-100 text-blue-600"
            />

            <div className='space-y-2'>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    {user.name}
                </h2>

                <div className="text-sm md:text-base flex items-center gap-1 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>Email:</span>
                    <span className='font-medium'>{user.email}</span>
                </div>

                <div className="text-xs md:text-base flex items-center gap-1 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Joined:</span>
                    <span className='font-medium'>{formatDate(user.created_at)}</span>
                </div>
            </div>
        </div>
    );
}

export default RegularUserData;