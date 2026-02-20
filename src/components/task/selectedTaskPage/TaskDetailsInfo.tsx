import { type JSX } from 'react';
import type { TaskDetails } from '../../../types/task';
import TaskDetailsInfoAssignee from './TaskDetailsInfoAssignee';
import TaskDetailsInfoDueDate from './TaskDetailsInfoDueDate';
import TaskDetailsInfoDateStamps from './TaskDetailsInfoDateStamps';

function TaskDetailsInfo({ task }: { task: TaskDetails; }): JSX.Element {
    return (
        <div>
            <div className='p-4 border rounded-md mb-4'>
                <h3 className='text-sm md:text-base font-semibold text-gray-600 mb-2'>
                    Description
                </h3>
                <p className='text-xs md:text-sm whitespace-pre-wrap'>
                    {task.description}
                </p>
            </div>

            <div className='grid sm:grid-cols-2 gap-4 p-4 border rounded-md'>
                <TaskDetailsInfoAssignee assigneeName={task.assignee.name}
                    assigneeEmail={task.assignee.email}
                    assigneeAvatar={task.assignee.avatar}
                />

                <TaskDetailsInfoDueDate
                    isOverdue={task.is_overdue}
                    dueDate={task.due_date}
                />

                <TaskDetailsInfoDateStamps
                    createdAt={task.created_at}
                    updatedAt={task.updated_at}
                />
            </div>
        </div>
    );
}

export default TaskDetailsInfo;