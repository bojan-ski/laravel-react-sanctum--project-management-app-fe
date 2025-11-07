import { type JSX } from 'react';
import type { User } from '../../../../types/types';
import AvailableUserRow from './AvailableUserRow';

type AvailableUsersProps = {
    selectedUserIds: number[];
    availableUsers: User[];
    onToggleUser: (id: number) => void;
};

function AvailableUsers({
    selectedUserIds,
    availableUsers,
    onToggleUser
}: AvailableUsersProps): JSX.Element {
    return (
        <div className="border rounded-md max-h-[400px] overflow-y-auto">
            <div className="divide-y">
                {availableUsers && availableUsers.map((user: User) => {
                    const isSelected: boolean = selectedUserIds.includes(user.id);

                    return (
                        <AvailableUserRow
                            key={user.id}
                            isSelected={isSelected}
                            userId={user.id}
                            userName={user.name}
                            userEmail={user.email}
                            userAvatar={user.avatar}
                            onToggleUser={onToggleUser}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default AvailableUsers;