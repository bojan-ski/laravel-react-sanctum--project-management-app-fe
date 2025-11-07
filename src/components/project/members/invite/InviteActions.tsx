import { type JSX } from 'react';
import { Button } from '../../../ui/button';

type InviteActionsProps = {
    isLoading: boolean;
    selectedUserIdsLength: number;
    onInvite: () => void;
    onCancel: () => void;
};

function InviteActions({
    isLoading,
    selectedUserIdsLength,
    onInvite,
    onCancel
}: InviteActionsProps): JSX.Element {
    return (
        <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
                variant="outline"
                className='cursor-pointer'
                onClick={onCancel}
                disabled={isLoading}
            >
                Cancel
            </Button>

            <Button
                className='bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer'
                onClick={onInvite}
                disabled={isLoading || selectedUserIdsLength === 0}
            >
                Invite {selectedUserIdsLength > 0 ? `(${selectedUserIdsLength})` : ''}
            </Button>
        </div>
    );
}

export default InviteActions;