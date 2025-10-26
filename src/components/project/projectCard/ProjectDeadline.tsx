import { type JSX } from 'react';
import { formatDate, isProjectOverdue } from '../../../utils/helpers';
import { Calendar } from 'lucide-react';

function ProjectDeadline({ deadline }: { deadline: string; }): JSX.Element {
    return (
        <div className={`flex items-center font-semibold gap-2 text-sm ${isProjectOverdue(deadline) ? 'text-red-900' : ''}`}>
            <Calendar className="h-4 w-4" />

            <span>
                {isProjectOverdue(deadline) ? 'Overdue: ' : 'Due: '}
                {formatDate(deadline)}
            </span>
        </div>
    );
}

export default ProjectDeadline;