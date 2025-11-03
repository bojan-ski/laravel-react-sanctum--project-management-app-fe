import { type JSX } from 'react';
import type { Member } from '../../../types/types';
import MemberRow from './MemberRow';

type MembersProps = {
    ownerId: number;
    members: Member[];
};

function Members({ ownerId, members }: MembersProps): JSX.Element {
    return (
        <div className='p-4 border rounded-md'>
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