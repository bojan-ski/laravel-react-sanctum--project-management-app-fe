import { type JSX } from 'react';
import { Badge } from '../ui/badge';
import { getTaskPriorityColor } from '../../utils/helpers';

type TaskPriorityBadgeProps = {
    priority: string;
    className?: string;
};

function TaskPriorityBadge({ priority, className = '' }: TaskPriorityBadgeProps): JSX.Element {
    return (
        <Badge
            variant="outline"
            className={`${getTaskPriorityColor(priority)} text-xs capitalize ${className}`}
        >
            {priority}
        </Badge>
    );
}

export default TaskPriorityBadge;