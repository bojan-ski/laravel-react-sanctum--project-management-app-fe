import {type JSX } from 'react';
import type { Member } from '../../../types/types';
import MemberRow from './MemberRow';
import InviteMembersModal from './invite/InviteMembersModal';

type MembersProps = {
    projectId: number;
    ownerId: number;
    members: Member[];
    onRefresh: () => void;
};

function Members({ projectId, ownerId, members, onRefresh }: MembersProps): JSX.Element {
    return (
        <div className='p-4 border rounded-md max-h-[400px] overflow-y-auto'>
            {/* invite members option */}
            <InviteMembersModal
                members={members}
                projectId={projectId}
                onRefresh={onRefresh}
            />

            {/* members list */}
            {members.length != 0 ? (
                // {data.members.length > 1 ? (
                <>
                    <div className="space-y-3">
                        {members.map((member: Member) => (
                            <MemberRow
                                key={member.id}
                                ownerId={ownerId}
                                member={member}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-center font-semibold py-4">
                    No members yet
                </p>
            )}
        </div>
    );
}

export default Members;