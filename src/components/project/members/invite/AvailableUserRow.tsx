import { type JSX } from 'react';
import { Checkbox } from '../../../ui/checkbox';
import UserAvatar from '../../../global/UserAvatar';

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

            <UserAvatar 
                avatarCss='h-10 w-10'
                name={userName}
                avatar={userAvatar}
            />            

            <div>
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