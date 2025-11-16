import { type JSX, type MouseEvent } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { acceptProjectInvitation, declineProjectInvitation } from '../../features/regularUser/notificationSlice';
import { getUserProjects } from '../../features/regularUser/projectSlice';
import type { NotificationState } from '../../types/types';
import { Button } from '../ui/button';
import { Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

type InvitationOptionsProps = {
    notificationId: number;
    onClose: () => void;
};

function InvitationOptions({ notificationId, onClose }: InvitationOptionsProps): JSX.Element {
    const { isLoading } = useAppSelector<NotificationState>(state => state.notifications);
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const handleAcceptInvitation = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.stopPropagation();

        const response = await dispatch(acceptProjectInvitation(notificationId));

        if (response.meta.requestStatus == 'fulfilled') {
            toast.success(response.payload.message);

            // get projects
            await dispatch(getUserProjects({}));

            // redirect user & close notifications dropdown
            setTimeout(() => {
                onClose();
                navigate(`/projects/${response.payload.data.notifiable_id}`);
            }, 1000);
        }

        if (response.meta.requestStatus == 'rejected') {
            toast.error(response.payload);
        }
    };

    const handleDeclineInvitation = async (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        const response = await dispatch(declineProjectInvitation(notificationId));

        if (response.meta.requestStatus == 'fulfilled') {
            toast.success(response.payload.message);
        }

        if (response.meta.requestStatus == 'rejected') {
            toast.error(response.payload);
        }
    };

    return (
        <div className="flex items-center justify-end gap-2">
            <Button
                size="sm"
                onClick={handleAcceptInvitation}
                disabled={isLoading}
                className="text-xs bg-green-500 hover:bg-green-600 cursor-pointer"
            >
                <Check/>
                <span className='hidden md:block'>Accept</span>
            </Button>

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
        </div>
    );
}

export default InvitationOptions;