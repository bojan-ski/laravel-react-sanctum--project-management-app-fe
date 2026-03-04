import { type JSX } from 'react';
import { formatDate } from '../../utils/helpers';
import { Calendar } from 'lucide-react';

type ProjectDeadlineProps = {
    deadline: string;
    isOverdue: boolean;
};

function ProjectDeadline({
    deadline,
    isOverdue
}: ProjectDeadlineProps): JSX.Element {
    return (
        <div className={`flex items-center font-semibold gap-2 text-xs md:text-sm ${isOverdue ? 'text-red-600' : ''}`}>
            <Calendar className="h-4 w-4" />

            <span>
                {isOverdue ? 'Overdue: ' : 'Due: '}
                {formatDate(deadline)}
            </span>
        </div>
    );
}

export default ProjectDeadline;