import { type JSX } from 'react';
import UserAvatar from '../../global/UserAvatar';
import { Badge } from '../../ui/badge';

type ProjectOwnerDetailsProps = {
    ownerAvatar: string;
    ownerName: string;
    divCss?: string;
};

function ProjectOwnerDetails({
    ownerAvatar,
    ownerName,
    divCss
}: ProjectOwnerDetailsProps): JSX.Element {
    return (
        <div className={`flex items-center gap-2 ${divCss}`}>
            <UserAvatar
                name={ownerName}
                avatar={ownerAvatar}
            />
            <span className="text-sm">
                {ownerName}
            </span>
            <Badge variant="secondary" className="ml-2 text-xs">
                Owner
            </Badge>
        </div>
    );
}

export default ProjectOwnerDetails;