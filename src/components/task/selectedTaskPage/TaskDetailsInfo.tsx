import { type JSX } from 'react';
import type { TaskDetails } from '../../../types/task';
import { formatDate } from '../../../utils/helpers';
import { Badge } from '../../ui/badge';
import UserAvatar from '../../global/UserAvatar';
import { Calendar, User, AlertCircle } from 'lucide-react';

function TaskDetailsInfo({ task }: { task: TaskDetails; }): JSX.Element {
    const overdue = task.is_overdue;

    return (
        <div>
            <div className='mb-5'>
                <h3 className='font-semibold mb-2'>
                    Description
                </h3>
                <p className='text-sm text-gray-700 whitespace-pre-wrap'>
                    {task.description}
                </p>
            </div>

            <div className='grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-md'>
                <div>
                    <div className='flex items-center gap-2 mb-1 text-gray-600'>
                        <User className='h-4 w-4' />
                        <span className='text-sm font-semibold'>Assigned to</span>
                    </div>
                    <div className='flex items-center gap-2 ml-6'>
                        <UserAvatar
                            avatarCss='h-8 w-8'
                            name={task.assignee.name}
                            avatar={task.assignee.avatar}
                        />
                        <div>
                            <p className='text-sm font-medium'>{task.assignee.name}</p>
                            <p className='text-xs text-gray-600'>{task.assignee.email}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex items-center gap-2 mb-1 text-gray-600'>
                        <Calendar className='h-4 w-4' />
                        <span className='text-sm font-semibold'>Due Date</span>
                    </div>
                    <div className='ml-6'>
                        <p className={`text-sm font-medium ${overdue ? 'text-red-600' : ''}`}>
                            {formatDate(task.due_date)}
                        </p>
                        {overdue && (
                            <div className='flex items-center gap-1 mt-1'>
                                <AlertCircle className='h-3 w-3 text-red-600' />
                                <Badge variant="destructive" className='text-xs'>
                                    Overdue
                                </Badge>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <span className='text-sm font-semibold text-gray-600'>Created</span>
                    <p className='text-sm ml-0 mt-1'>{formatDate(task.created_at)}</p>
                </div>

                <div>
                    <span className='text-sm font-semibold text-gray-600'>Last Updated</span>
                    <p className='text-sm ml-0 mt-1'>{formatDate(task.updated_at)}</p>
                </div>
            </div>
        </div>
    );
}

export default TaskDetailsInfo;