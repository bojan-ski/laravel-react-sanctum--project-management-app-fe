import { type JSX } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { userInitials } from '../../utils/helpers';

type UserAvatarProps = {
    avatarCss?: string; 
    avatarFallbackCss?: string; 
    name: string;
    avatar: string | null;
};

function UserAvatar({
    avatarCss,
    avatarFallbackCss ='text-xs',
    name,
    avatar
}: UserAvatarProps): JSX.Element {
    return (
        <Avatar className={avatarCss}>
            <AvatarImage src={avatar as string} alt={name} />
            <AvatarFallback className={avatarFallbackCss}>
                {userInitials(name)}
            </AvatarFallback>
        </Avatar>
    );
}

export default UserAvatar;