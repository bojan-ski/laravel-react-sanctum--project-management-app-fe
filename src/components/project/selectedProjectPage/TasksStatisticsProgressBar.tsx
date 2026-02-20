import { type JSX } from 'react';

function TasksStatisticsProgressBar({ completionPercentage }: { completionPercentage: number; }): JSX.Element {
    return (
        <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-semibold">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                    className="bg-gray-800 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                ></div>
            </div>
        </div>
    );
}

export default TasksStatisticsProgressBar;