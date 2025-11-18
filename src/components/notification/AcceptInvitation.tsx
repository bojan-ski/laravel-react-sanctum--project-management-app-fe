import { type JSX, type MouseEvent } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch } from '../../hooks/useRedux';
import { useThunk } from '../../hooks/useThunk';
import { acceptProjectInvitation } from '../../features/regularUser/notificationSlice';
import { getUserProjects } from '../../features/regularUser/projectSlice';
import { Button } from '../ui/button';
import { Check } from 'lucide-react';
import toast from 'react-hot-toast';

type AcceptInvitationProps = {
    isLoading: boolean;
    notificationId: number;
    onClose: () => void;
};

function AcceptInvitation({
    isLoading,
    notificationId,
    onClose
}: AcceptInvitationProps): JSX.Element {
    const dispatch = useAppDispatch();
    const { run } = useThunk(acceptProjectInvitation);
    const navigate: NavigateFunction = useNavigate();

    const handleAcceptInvitation = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.stopPropagation();

        const thunkCall = await run(notificationId);

        if (thunkCall.ok) {
            toast.success(thunkCall.data.message);

            // get projects
            await dispatch(getUserProjects({}));

            // redirect user & close notifications dropdown
            setTimeout(() => {
                onClose();
                navigate(`/projects/${thunkCall.data.data.notifiable_id}`);
            }, 1000);
        } else {
            toast.error(thunkCall.error);
        }
    };

    return (
        <Button
            size="sm"
            onClick={handleAcceptInvitation}
            disabled={isLoading}
            className="text-xs bg-green-500 hover:bg-green-600 cursor-pointer"
        >
            <Check />
            <span className='hidden md:block'>Accept</span>
        </Button>
    );
}

export default AcceptInvitation;