import { type JSX } from 'react';
import type { Member } from '../../../types/types';
import UserAvatar from '../../global/UserAvatar';
import RemoveMember from './remove/RemoveMember';
import { Badge } from '../../ui/badge';
import { formatDate } from '../../../utils/helpers';

type MemberRowProps = {
    projectId: number;
    ownerId: number;
    member: Member;
};

function MemberRow({
    projectId,
    ownerId,
    member,
}: MemberRowProps): JSX.Element {
    return (
        <div className="flex items-center justify-between p-4  p-4rounded-md hover:bg-gray-50 transition">
            {/* left side */}
            <div className="flex items-center gap-3">
                <UserAvatar
                    name={member.name}
                    avatar={member.avatar}
                />

                <div>
                    <p className="text-sm">
                        {member.name}
                        {member.id == ownerId && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                                Owner
                            </Badge>
                        )}
                    </p>
                    <p className="text-sm text-gray-600">
                        {member.email}
                    </p>
                </div>
            </div>

            {/* right side */}
            <div className='text-end text-sm'>
                <p className="text-gray-500">
                    Joined: {formatDate(member.joined_at)}
                </p>

                {ownerId != member.id && (
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