import { type JSX } from 'react';
import UserAvatar from '../../global/UserAvatar';
import { User } from 'lucide-react';

type TaskDetailsInfoAssigneeProps = {
    assigneeName: string;
    assigneeEmail: string;
    assigneeAvatar: string | null;
};

function TaskDetailsInfoAssignee({
    assigneeName,
    assigneeEmail,
    assigneeAvatar,
}: TaskDetailsInfoAssigneeProps): JSX.Element {
    return (
        <div>
            <div className='flex items-center gap-2 mb-1 text-gray-600'>
                <User className='h-4 w-4' />
                <span className='text-xs md:text-sm font-semibold'>Assigned to</span>
            </div>
            <div className='flex items-center gap-2'>
                <UserAvatar
                    avatarCss='h-8 w-8'
                    name={assigneeName}
                    avatar={assigneeAvatar}
                />
                <div>
                    <p className='text-xs md:text-sm font-medium'>
                        {assigneeName}
                    </p>
                    <p className='text-xs text-gray-600'>
                        {assigneeEmail}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TaskDetailsInfoAssignee;