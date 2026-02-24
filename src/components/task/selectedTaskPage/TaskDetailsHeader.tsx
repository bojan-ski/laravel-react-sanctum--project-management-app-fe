import { type JSX } from 'react';
import type { TaskDetails } from '../../../types/task';
import UpdateTaskOptions from './UpdateTaskOptions';
import DeleteTask from './DeleteTask';
import TaskStatusBadge from '../TaskStatusBadge';
import TaskPriorityBadge from '../TaskPriorityBadge ';

function TaskDetailsHeader({ task }: { task: TaskDetails; }): JSX.Element {
    return (
        <div className="border rounded-md p-4 mb-4">
            <h2 className="text-lg md:text-xl font-semibold">
                {task.title}
            </h2>

            {(task.is_creator && task.project.is_active) ? (
                <div className="flex items-end justify-between mt-4">
                    <UpdateTaskOptions task={task} />
                    <DeleteTask task={task} />
                </div>
            ) : (
                <div className="flex items-center gap-2 mt-4">
                    <TaskStatusBadge status={task.status} />
                    <TaskPriorityBadge priority={task.priority} />
                </div>
            )}
        </div>
    );
}

export default TaskDetailsHeader;