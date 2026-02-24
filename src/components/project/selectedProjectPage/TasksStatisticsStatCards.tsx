import {  type JSX } from 'react';
import type { Task } from '../../../types/task';
import { getTasksByStatus } from '../../../utils/helpers';
import {
    CheckCircle2,
    Clock,
    AlertCircle,
    FileCheck
} from 'lucide-react';

function TasksStatisticsStatCards({ tasks }: { tasks: Task[]; }): JSX.Element {
    const tasksByStatus = getTasksByStatus(tasks);

    const stats = [
        {
            label: 'To Do',
            value: tasksByStatus.to_do.length,
            icon: Clock,
            color: 'text-gray-600'
        },
        {
            label: 'In Progress',
            value: tasksByStatus.in_progress.length,
            icon: AlertCircle,
            color: 'text-blue-600'
        },
        {
            label: 'Review',
            value: tasksByStatus.review.length,
            icon: FileCheck,
            color: 'text-yellow-600'
        },
        {
            label: 'Done',
            value: tasksByStatus.done.length,
            icon: CheckCircle2,
            color: 'text-green-600'
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.label}
                        className="bg-gray-50 p-3 rounded-md"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <Icon className={`h-4 w-4 ${stat.color}`} />
                            <span className="text-xs text-gray-600">{stat.label}</span>
                        </div>

                        <p className="text-2xl font-bold">
                            {stat.value}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

export default TasksStatisticsStatCards;