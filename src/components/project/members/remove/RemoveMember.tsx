import { type JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { removeSelectedMember } from '../../../../features/regularUser/projectMemberSlice';
import { usePageRefresh } from '../../../../context/pageRefreshProvide';
import type { ProjectMembersState } from '../../../../types/types';
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
    const dispatch = useAppDispatch();
    const { pageRefresh } = usePageRefresh();

    const handleRemoveMember = async (): Promise<void> => {
        if (confirm(`Remove member: ${memberName}?`)) {
            const result = await dispatch(removeSelectedMember({ projectId, memberId }));

            if (result.meta.requestStatus == 'fulfilled') {
                const successMsg = result.payload as { message: string; };
                toast.success(successMsg.message);

                pageRefresh();
            }

            if (result.meta.requestStatus == 'rejected') {
                const errorMsg = result.payload || result?.meta.requestStatus;
                toast.error(errorMsg as string);
            }
        }
    };

    return (
        <button
            type='button'
            className="text-red-500 hover:underline cursor-pointer"
            disabled={isLoading}
            onClick={handleRemoveMember}
        >
            {isLoading ? 'Wait...' : 'Remove'}
        </button>
    );
}

export default RemoveMember;