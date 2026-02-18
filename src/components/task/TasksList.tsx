import { type JSX } from 'react';
import type { Task } from '../../types/task';
import NoDataMessage from '../global/NoDataMessage';
import TaskCard from './TaskCard';

type TasksListProps = {
    tasks: Task[];
    emptyMessage: string;
};

function TasksList({
    tasks,
    emptyMessage
}: TasksListProps): JSX.Element {
    if (tasks.length === 0) {
        return <NoDataMessage message={emptyMessage} />;
    }    

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task: Task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                />
            ))}
        </div>
    );
}

export default TasksList;