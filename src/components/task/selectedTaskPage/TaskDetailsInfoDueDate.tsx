import { type JSX } from 'react';
import { formatDate } from '../../../utils/helpers';
import { Badge } from '../../ui/badge';
import { AlertCircle, Calendar } from 'lucide-react';

type TaskDetailsInfoDueDateProps = {
    isOverdue: boolean;
    dueDate: string;
};

function TaskDetailsInfoDueDate({
    isOverdue,
    dueDate
}: TaskDetailsInfoDueDateProps): JSX.Element {
    const overdue = isOverdue;

    return (
        <div className='text-xs md:text-sm'>
            <div className='flex items-center gap-2 mb-1 text-gray-600'>
                <Calendar className='h-4 w-4' />
                <span className='font-semibold'>Due Date</span>
            </div>

            <div className='flex items-center gap-2'>
                <p className={`font-medium ${overdue ? 'text-red-600' : ''}`}>
                    {formatDate(dueDate)}
                </p>
                {overdue && (
                    <div className='flex items-center gap-1'>
                        <AlertCircle className='h-3 w-3 text-red-600' />
                        <Badge variant="destructive" className='text-xs'>
                            Overdue
                        </Badge>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaskDetailsInfoDueDate;