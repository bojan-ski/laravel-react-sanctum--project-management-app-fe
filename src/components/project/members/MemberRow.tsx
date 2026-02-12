import { type JSX } from 'react';
import type { Member } from '../../../types/member';
import { formatDate } from '../../../utils/helpers';
import UserAvatar from '../../global/UserAvatar';
import RemoveMember from './remove/RemoveMember';
import { Badge } from '../../ui/badge';

type MemberRowProps = {
    projectId: number;
    isProjectOwner: boolean;
    member: Member;
};

function MemberRow({
    projectId,
    isProjectOwner,
    member,
}: MemberRowProps): JSX.Element {
    return (
        <div className="text-xs border-b last:border-0 py-3 flex items-center justify-between rounded-md hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
                <UserAvatar
                    name={member.name}
                    avatar={member.avatar}
                />

                <div>
                    <p>
                        {member.name}
                        {member.is_owner && (
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

            <div className='text-end'>
                <p className="text-gray-600">
                    Joined: {formatDate(member.joined_at)}
                </p>

                {(isProjectOwner && !member.is_owner) && (
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