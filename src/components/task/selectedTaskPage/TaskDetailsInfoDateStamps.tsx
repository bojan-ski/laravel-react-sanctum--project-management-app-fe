import { type JSX } from 'react';
import { formatDate } from '../../../utils/helpers';
import { CalendarDays } from 'lucide-react';

type TaskDetailsInfoDateStampsProps = {
    createdAt: string;
    updatedAt: string;
};

function TaskDetailsInfoDateStamps({
    createdAt,
    updatedAt,
}: TaskDetailsInfoDateStampsProps): JSX.Element {
    return (
        <>
            <div className='text-xs md:text-sm'>
                <div className='flex items-center gap-2 text-gray-600 mb-1'>
                    <CalendarDays className='h-4 w-4' />
                    <span className='font-semibold'>Created</span>
                </div>
                <p className='font-medium'>
                    {formatDate(createdAt)}
                </p>
            </div>

            <div className='text-xs md:text-sm'>
                <div className='flex items-center gap-2 text-gray-600 mb-1'>
                    <CalendarDays className='h-4 w-4' />
                    <span className='font-semibold'>Last Updated</span>
                </div>
                <p className='font-medium'>
                    {formatDate(updatedAt)}
                </p>
            </div>
        </>
    );
}

export default TaskDetailsInfoDateStamps;