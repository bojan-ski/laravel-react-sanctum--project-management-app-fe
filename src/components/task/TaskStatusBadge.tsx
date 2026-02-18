import { type JSX } from 'react';
import { Badge } from '../ui/badge';
import { getTaskStatusColor, getTaskStatusLabel } from '../../utils/helpers';

type TaskStatusBadgeProps = {
    status: string;
    className?: string;
};

function TaskStatusBadge({ status, className = '' }: TaskStatusBadgeProps): JSX.Element {
    return (
        <Badge className={`${getTaskStatusColor(status)} text-white text-xs ${className}`}>
            {getTaskStatusLabel(status)}
        </Badge>
    );
}

export default TaskStatusBadge;