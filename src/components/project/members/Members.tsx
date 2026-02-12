import { type JSX } from 'react';
import { useAppSelector } from '../../../hooks/useRedux';
import type { Member, ProjectMembersState } from '../../../types/member';
import LeaveProject from './leave/LeaveProject';
import InviteMembersModal from './invite/InviteMembersModal';
import MemberRow from './MemberRow';

type MembersProps = {
    projectId: number;
    isProjectOwner: boolean;
};

function Members({
    projectId,
    isProjectOwner,
}: MembersProps): JSX.Element {
    const { members, membersLimit } = useAppSelector<ProjectMembersState>(state => state.projectMembers);

    return (
        <div className='p-4 border rounded-md'>
            <div className='flex items-center justify-between'>
                <div className='text-xs md:text-sm font-medium'>
                    Limit: <span>{members.length}</span>/<span>{membersLimit}</span>
                </div>

                {!isProjectOwner && <LeaveProject projectId={projectId} />}

                {(isProjectOwner && members.length < membersLimit) && (
                    <InviteMembersModal projectId={projectId} />
                )}
            </div>

            <div className="space-y-3">
                {members.map((member: Member) => (
                    <MemberRow
                        key={member.id}
                        projectId={projectId}
                        isProjectOwner={isProjectOwner}
                        member={member}
                    />
                ))}
            </div>
        </div>
    );
}

export default Members;