import { type JSX } from 'react';
import type { TaskDetails } from '../../../types/task';
import UpdateTaskOptions from './UpdateTaskOptions';
import DeleteTask from './DeleteTask';

function TaskDetailsHeader({ task }: { task: TaskDetails; }): JSX.Element {
    return (
        <div className="border rounded-md p-4 mb-4">
            <h2 className="text-xl font-semibold">
                {task.title}
            </h2>

            {task.is_creator && (
                <div className="flex items-end justify-between mt-4">
                    <UpdateTaskOptions task={task} />
                    <DeleteTask task={task} />
                </div>
            )}
        </div>
    );
}

export default TaskDetailsHeader;