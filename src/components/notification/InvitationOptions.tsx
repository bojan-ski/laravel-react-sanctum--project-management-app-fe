import { type JSX } from 'react';
import { useAppSelector } from '../../hooks/useRedux';
import type { NotificationState } from '../../types/notification';
import AcceptInvitation from './AcceptInvitation';
import DeclineInvitation from './DeclineInvitation';

type InvitationOptionsProps = {
    notificationId: number;
    onClose?: () => void;
};

function InvitationOptions({
    notificationId,
    onClose
}: InvitationOptionsProps): JSX.Element {
    const { isLoading } = useAppSelector<NotificationState>(state => state.notifications);

    return (
        <div className="flex items-center justify-end gap-2">
            <AcceptInvitation
                isLoading={isLoading}
                notificationId={notificationId}
                onClose={onClose}
            />
            <DeclineInvitation
                isLoading={isLoading}
                notificationId={notificationId}
            />
        </div>
    );
}

export default InvitationOptions;