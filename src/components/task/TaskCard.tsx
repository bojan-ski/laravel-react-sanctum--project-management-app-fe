import { type JSX } from 'react';
import { Link } from 'react-router';
import type { Task } from '../../types/task';
import { formatDate } from '../../utils/helpers';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '../ui/card';
import { Badge } from '../ui/badge';
import UserAvatar from '../global/UserAvatar';
import TaskStatusBadge from './TaskStatusBadge';
import TaskPriorityBadge from './TaskPriorityBadge ';
import { Calendar } from 'lucide-react';

function TaskCard({ task }: { task: Task; }): JSX.Element {
    const overdue = task.is_overdue;

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <CardTitle className="text-sm md:text-base line-clamp-2 mb-3">
                            {task.title}
                        </CardTitle>

                        <div className="flex items-center gap-2">
                            <TaskStatusBadge status={task.status} />
                            <TaskPriorityBadge priority={task.priority} />
                        </div>
                    </div>
                </div>

                <CardDescription className="text-xs md:text-sm line-clamp-3">
                    {task.description}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="flex items-center gap-2 mb-3">
                    <UserAvatar
                        avatarCss='h-6 w-6'
                        name={task.assignee.name}
                        avatar={task.assignee.avatar}
                    />
                    <span className="text-xs md:text-sm text-gray-600">
                        {task.assignee.name}
                    </span>
                </div>

                <div className={`text-xs md:text-sm flex items-center gap-1 mb-3 ${overdue ? 'text-red-600 font-semibold' : 'text-black'}`}>
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(task.due_date)}</span>
                    {overdue && <Badge variant="destructive" className="ml-1 text-xs">Overdue</Badge>}
                </div>

                {task.can_view_task && (
                    <Link
                        to={`/tasks/${task.id}`}
                        className='block text-blue-500 hover:text-blue-700 transition font-semibold text-sm text-right'
                    >
                        View Details →
                    </Link>
                )}
            </CardContent>
        </Card>
    );
}

export default TaskCard;