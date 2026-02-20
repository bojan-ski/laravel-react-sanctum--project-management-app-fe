import { type JSX } from 'react';
import type { TaskDetails } from '../../../types/task';
import ChangeTaskStatus from './ChangeTaskStatus';
import ChangeTaskPriority from './ChangeTaskPriority';

function UpdateTaskOptions({ task }: { task: TaskDetails; }): JSX.Element {
    return (
        <div className='flex items-center gap-3'>
            <ChangeTaskStatus
                taskId={task.id}
                taskStatus={task.status}
            />

            <ChangeTaskPriority
                taskId={task.id}
                taskPriority={task.priority}
            />
        </div>
    );
}

export default UpdateTaskOptions;