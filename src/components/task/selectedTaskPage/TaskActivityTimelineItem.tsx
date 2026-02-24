import { type JSX } from 'react';
import type { TaskActivity } from '../../../types/task';
import { formatDateAdvance } from '../../../utils/helpers';
import UserAvatar from '../../global/UserAvatar';
import DownloadDocument from '../../document/DownloadDocument';

function TaskActivityTimelineItem({ activity }: { activity: TaskActivity; }): JSX.Element {
    const getActivityMessage = (): JSX.Element  => {
        const changes = activity.changes;
        const userName = activity.user?.name || 'System';

        switch (activity.action) {
            case 'status_changed':
                return (
                    <span>
                        <strong>{userName}</strong> changed status from{' '}
                        <strong className='capitalize'>{changes.from.replace('_', ' ')}</strong> to{' '}
                        <strong className='capitalize'>{changes.to.replace('_', ' ')}</strong>
                    </span>
                );

            case 'priority_changed':
                return (
                    <span>
                        <strong>{userName}</strong> changed priority from{' '}
                        <strong className='capitalize'>{changes.from}</strong> to{' '}
                        <strong className='capitalize'>{changes.to}</strong>
                    </span>
                );

            case 'document_uploaded':
                return (
                    <span>
                        <strong>{userName}</strong> uploaded a document
                    </span>
                );

            default:
                return <span><strong>{userName}</strong> performed an action</span>;
        }
    };

    return (
        <div className='hover:bg-gray-50 rounded-lg p-3 border-b last:border-0'>
            <div className='flex items-start gap-3'>
                {activity.user && (
                    <UserAvatar
                        avatarCss='h-6 w-6 border md:h-8 md:w-8'
                        name={activity.user.name}
                        avatar={activity.user.avatar}
                    />
                )}
                <div className='flex-1 text-xs md:text-sm'>
                    <div className='flex items-center justify-between'>
                        {getActivityMessage()}
                        {activity.document && <DownloadDocument document={activity.document} />}
                    </div>
                    <span className='text-gray-600'>
                        {formatDateAdvance(activity.created_at)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default TaskActivityTimelineItem;