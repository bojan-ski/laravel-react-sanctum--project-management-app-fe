import { type JSX } from 'react';
import { Checkbox } from '../../../ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { userInitials } from '../../../../utils/helpers';

type AvailableUserRowProps = {
    isSelected: boolean;
    userId: number;
    userName: string;
    userEmail: string;
    userAvatar: string | null;
    onToggleUser: (id: number) => void;
};

function AvailableUserRow({
    isSelected,
    userId,
    userName,
    userEmail,
    userAvatar,
    onToggleUser
}: AvailableUserRowProps): JSX.Element {
    return (
        <div
            className={`flex items-center gap-3 p-4 hover:bg-gray-50 transition cursor-pointer ${isSelected ? 'bg-indigo-50 hover:bg-indigo-50' : ''}`}
            onClick={() => onToggleUser(userId)}
        >
            <Checkbox
                id={`user-${userId}`}
                checked={isSelected}
                onCheckedChange={() => onToggleUser(userId)}
                onClick={(e) => e.stopPropagation()}
            />

            <Avatar className="h-10 w-10">
                <AvatarImage src={userAvatar as string} alt={userName} />

                <AvatarFallback className='text-xs'>
                    {userInitials(userName)}
                </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">
                    {userName}
                </p>
                <p className="text-sm text-gray-600">
                    {userEmail}
                </p>
            </div>
        </div>
    );
}

export default AvailableUserRow;