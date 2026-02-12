import { type JSX } from 'react';
import { useAppSelector } from '../../../../hooks/useRedux';
import { useThunk } from '../../../../hooks/useThunk';
import { removeSelectedMember } from '../../../../features/regularUser/projectMemberSlice';
import type { ProjectMembersState } from '../../../../types/member';
import toast from 'react-hot-toast';

type RemoveMemberProps = {
    projectId: number;
    memberId: number;
    memberName: string;
};

function RemoveMember({
    projectId,
    memberId,
    memberName,
}: RemoveMemberProps): JSX.Element {
    const { isLoading } = useAppSelector<ProjectMembersState>(state => state.projectMembers);
    const { run } = useThunk(removeSelectedMember);

    const handleRemoveMember = async (): Promise<void> => {
        if (confirm(`Remove member: ${memberName}?`)) {
            const thunkCall = await run({ projectId, memberId });            

            if (thunkCall.ok) {
                toast.success(thunkCall.data.message);
            } else {
                toast.error(thunkCall.error.random || "Remove Member Error");
            }
        }
    };

    return (
        <button
            type='button'
            className="text-red-500 hover:underline transition-all cursor-pointer"
            disabled={isLoading}
            onClick={handleRemoveMember}
        >
            {isLoading ? 'Wait...' : 'Remove'}
        </button>
    );
}

export default RemoveMember;