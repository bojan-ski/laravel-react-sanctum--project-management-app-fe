import { type JSX, type MouseEvent } from 'react';
import { useThunk } from '../../hooks/useThunk';
import { declineProjectInvitation } from '../../features/regularUser/notificationSlice';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

type DeclineInvitationProps = {
    isLoading: boolean;
    notificationId: number;
};

function DeclineInvitation({
    isLoading,
    notificationId,
}: DeclineInvitationProps): JSX.Element {
    const { run } = useThunk(declineProjectInvitation);

    const handleDeclineInvitation = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.stopPropagation();

        const thunkCall = await run(notificationId);

        if (thunkCall.ok) {
            toast.success(thunkCall.data.message);
        } else {
            toast.error(thunkCall.error);
        }
    };

    return (
        <Button
            size="sm"
            variant="outline"
            onClick={handleDeclineInvitation}
            disabled={isLoading}
            className="text-xs text-white bg-red-500 hover:bg-red-700 hover:text-white cursor-pointer"
        >
            <X />
            <span className='hidden md:block'>Decline</span>
        </Button>
    );
}

export default DeclineInvitation;