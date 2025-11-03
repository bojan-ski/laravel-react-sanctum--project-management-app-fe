import { type JSX } from 'react';
import { userInitials } from '../../../utils/helpers';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

type ProjectOwnerDetailsProps = {
    ownerAvatar: string;
    ownerName: string;
};

function ProjectOwnerDetails({ ownerAvatar, ownerName }: ProjectOwnerDetailsProps): JSX.Element {       
    return (
        <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
                <AvatarImage src={ownerAvatar} alt={ownerName} />

                <AvatarFallback className="border-2 w-25 h-25 text-center rounded-full">
                    {userInitials(ownerName)}
                </AvatarFallback>
            </Avatar>
            <span className="text-sm">
                {ownerName}
            </span>
        </div>
    );
}

export default ProjectOwnerDetails;