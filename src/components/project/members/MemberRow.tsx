import { type JSX } from 'react';
import type { Member } from '../../../types/types';
import UserAvatar from '../../global/UserAvatar';
import RemoveMember from './remove/RemoveMember';
import { Badge } from '../../ui/badge';
import { formatDate } from '../../../utils/helpers';

type MemberRowProps = {
    projectId: number;
    ownerId: number;
    isProjectOwner: boolean;
    member: Member;
};

function MemberRow({
    projectId,
    ownerId,
    isProjectOwner,
    member,
}: MemberRowProps): JSX.Element {
    return (
        <div className="border-b py-3 flex items-center justify-between rounded-md hover:bg-gray-50 transition">
            {/* left side */}
            <div className="flex items-center gap-3">
                <UserAvatar
                    name={member.name}
                    avatar={member.avatar}
                />

                <div className='text-xs'>
                    <p>
                        {member.name}
                        {member.id == ownerId && (
                            <Badge variant="secondary" className="ml-2">
                                Owner
                            </Badge>
                        )}
                    </p>
                    <p className="text-gray-600">
                        {member.email}
                    </p>
                </div>
            </div>

            {/* right side */}
            <div className='text-end text-xs'>
                <p className="text-gray-600">
                    Joined: {formatDate(member.joined_at)}
                </p>

                {(isProjectOwner && ownerId != member.id) && (
                    <RemoveMember
                        projectId={projectId}
                        memberId={member.id}
                        memberName={member.name}
                    />
                )}
            </div>
        </div>
    );
}

export default MemberRow;