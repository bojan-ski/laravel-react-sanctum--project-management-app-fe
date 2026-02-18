import { type JSX } from 'react';
import type { Task } from '../../../types/task';
import TasksStatisticsProgressBar from './TasksStatisticsProgressBar';
import TasksStatisticsStatCards from './TasksStatisticsStatCards';

type TasksStatisticsProps = {
    completionPercentage: number;
    tasks: Task[];
};

function TasksStatistics({
    completionPercentage,
    tasks
}: TasksStatisticsProps): JSX.Element {
    return (
        <div className='p-4 border rounded-md'>
            <h3 className="text-sm md:text-base font-semibold mb-4">
                Tasks Statistics
            </h3>

            <TasksStatisticsProgressBar completionPercentage={completionPercentage} />
            <TasksStatisticsStatCards tasks={tasks} />
        </div>
    );
}

export default TasksStatistics;