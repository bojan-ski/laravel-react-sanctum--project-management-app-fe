import { type JSX } from 'react';
import { useAppSelector } from '../../../hooks/useRedux';
import type { TaskState } from '../../../types/task';
import TasksFilterByOwnership from './TasksFilterByOwnership';
import TasksFilterByStatus from './TasksFilterByStatus';
import TasksFilterByPriority from './TasksFilterByPriority';

function TasksFilterOptions(): JSX.Element {
    const { filters } = useAppSelector<TaskState>(state => state.tasks);

    return (
        <div className='tasks-filter-options grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-4'>
            <TasksFilterByOwnership filters={filters} />
            <TasksFilterByStatus filters={filters} />
            <TasksFilterByPriority filters={filters} />
        </div>
    );
}

export default TasksFilterOptions;