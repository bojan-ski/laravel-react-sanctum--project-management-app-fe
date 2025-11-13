import { type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import type { NotificationState } from '../../types/types';
import { Button } from '../ui/button';
import { Check, Loader2, X } from 'lucide-react';
import { acceptProjectInvitation } from '../../features/regularUser/notificationSlice';
import toast from 'react-hot-toast';

type InvitationOptionsProps = {
    notificationId: number;
    onClose: () => void;
};

function InvitationOptions({ notificationId, onClose }: InvitationOptionsProps): JSX.Element {
    const { isLoading } = useAppSelector<NotificationState>(state => state.notifications);
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const handleAcceptInvitation = async (e: any): Promise<void> => {
        e.stopPropagation();

        const response = await dispatch(acceptProjectInvitation(notificationId));

        if (response.meta.requestStatus == 'fulfilled') {
            toast.success(response.payload.message);

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

    

    return (
        <div className="flex gap-2">
            <Button
                size="sm"
                onClick={handleAcceptInvitation}
                disabled={isLoading}
                className="flex-1"
            >
                {isLoading ? (
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                ) : (
                    <Check className="h-3 w-3 mr-1" />
                )}
                Accept
            </Button>

            <Button
                size="sm"
                variant="outline"
                className="flex-1"
            >
                <X className="h-3 w-3 mr-1" />
                Decline
            </Button>
        </div>
    );
}

export default InvitationOptions;