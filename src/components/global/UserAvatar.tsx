import { type JSX } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { userInitials } from '../../utils/helpers';

type UserAvatarProps = {
    avatarCss?: string; 
    name: string;
    avatar: string | null;
};

function UserAvatar({
    avatarCss,
    name,
    avatar
}: UserAvatarProps): JSX.Element {
    return (
        <Avatar className={avatarCss}>
            <AvatarImage src={avatar as string} alt={name} />
            <AvatarFallback className='text-xs'>
                {userInitials(name)}
            </AvatarFallback>
        </Avatar>
    );
}

export default UserAvatar;