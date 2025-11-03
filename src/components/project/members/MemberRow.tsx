import { type JSX } from 'react';
import type { Member } from '../../../types/types';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { formatDate, userInitials } from '../../../utils/helpers';
import { Badge } from '../../ui/badge';

type MemberRowProps = {
    ownerId: number;
    member: Member;
};

function MemberRow({ ownerId, member }: MemberRowProps): JSX.Element {
    return (
        <div
            key={member.id}
            className="flex items-center justify-between hover:bg-gray-50 rounded-lg transition-colors"
        >
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src={member.avatar as string} alt={member.name} />

                    <AvatarFallback>
                        {userInitials(member.name)}
                    </AvatarFallback>
                </Avatar>

                <div className="flex items-center gap-2">
                    <p className="text-sm">
                        {member.name}
                    </p>
                    {member.id == ownerId ? (
                        <Badge variant="secondary" className="text-xs">
                            Owner
                        </Badge>
                    ) : (
                        <p className="text-sm text-gray-600">
                            {member.email}
                        </p>
                    )}
                </div>
            </div>
            <div className="text-sm text-gray-500">
                Joined: {formatDate(member.joined_at)}
            </div>
        </div>
    );
}

export default MemberRow;