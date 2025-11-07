import { useEffect, useState, type JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { getAllAvailableUsers, inviteSelectedUsers } from '../../../../features/regularUser/projectMemberSlice';
import type { Member, ProjectMembersState } from '../../../../types/types';
import SelectAllUsers from './SelectAllUsers';
import AvailableUsers from './AvailableUsers';
import WarningMsg from './WarningMsg';
import InviteActions from './InviteActions';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogDescription } from "../../../ui/dialog";
import { Button } from '../../../ui/button';
import toast from 'react-hot-toast';

type InviteMembersModalProps = {
    members: Member[];
    projectId: number;
    onRefresh: () => void;
};

function InviteMembersModal({
    members,
    projectId,
    onRefresh
}: InviteMembersModalProps): JSX.Element {
    const { isLoading, availableUsers } = useAppSelector<ProjectMembersState>(state => state.projectMembers);
    const dispatch = useAppDispatch();

    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

    useEffect(() => {
        console.log('useEffect - InviteMembersModal');

        dispatch(getAllAvailableUsers({ projectId }));
    }, [members, projectId]);

    const handleToggleUser = (userId: number) => {
        setSelectedUserIds((prevState: number[]) =>
            prevState.includes(userId)
                ? prevState.filter((id: number) => id !== userId)
                : [...prevState, userId]
        );
    };

    const handleSelectAll = () => {
        if (selectedUserIds.length === availableUsers.length) {
            setSelectedUserIds([]);
        } else {
            setSelectedUserIds(availableUsers.map(user => user.id));
        }
    };

    const handleInvite = async () => {
        const result = await dispatch(inviteSelectedUsers({ projectId, userIds: selectedUserIds }));

        if (result.meta.requestStatus == 'fulfilled') {
            toast.success(result?.payload.message);

            setSelectedUserIds([]);
            onRefresh();
        }

        if (result.meta.requestStatus == 'rejected') {
            toast.error(result.payload.random || result?.meta.requestStatus);
        }
    };

    const handleCancel = () => {
        setSelectedUserIds([]);
    };

    return (
        <div className='text-end'>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className='cursor-pointer bg-yellow-500 hover:bg-yellow-700 mb-5'
                    >
                        Invite
                    </Button>
                </DialogTrigger>

                <DialogContent aria-describedby={undefined}>
                    {availableUsers.length != 0 ? (
                        <>
                            <DialogHeader>
                                <DialogTitle>
                                    Invite Members
                                </DialogTitle>
                                <DialogDescription>
                                    Select users to invite to this project. They will receive an email notification.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                                {/* select all */}
                                <SelectAllUsers
                                    selectedUserIdsLength={selectedUserIds.length}
                                    availableUsersLength={availableUsers.length}
                                    onSelectAll={handleSelectAll}
                                />

                                {/* available users */}
                                <AvailableUsers
                                    selectedUserIds={selectedUserIds}
                                    availableUsers={availableUsers}
                                    onToggleUser={handleToggleUser}
                                />

                                {/* warning for large selections */}
                                {selectedUserIds.length > 20 && (
                                    <WarningMsg selectedUserIdsLength={selectedUserIds.length} />
                                )}
                            </div>

                            {/* actions */}
                            <InviteActions
                                isLoading={isLoading}
                                selectedUserIdsLength={selectedUserIds.length}
                                onInvite={handleInvite}
                                onCancel={handleCancel}
                            />
                        </>
                    ) : (
                        <DialogTitle className='text-center font-semibold py-4'>
                            There are no available users to invite
                        </DialogTitle>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default InviteMembersModal;