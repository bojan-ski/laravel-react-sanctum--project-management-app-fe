import { type JSX } from 'react';
import type { AllProjectStats } from '../../../types/admin';
import { CheckCircle, Clock, Pause, XCircle } from 'lucide-react';

function AllProjectsStats({ stats }: { stats: AllProjectStats; }): JSX.Element {
    const statCards = [
        {
            label: 'Pending',
            value: stats.by_status.pending,
            icon: Pause,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
        },
        {
            label: 'Active',
            value: stats.by_status.active,
            icon: Clock,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            label: 'Completed',
            value: stats.by_status.completed,
            icon: CheckCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            label: 'Closed',
            value: stats.by_status.closed,
            icon: XCircle,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            {statCards.map((stat) => (
                <div
                    key={stat.label}
                    className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                {stat.label}
                            </p>
                            <p className="text-2xl font-bold text-gray-800">
                                {stat.value}
                            </p>
                        </div>
                        <div className={`p-2 rounded-full ${stat.bgColor}`}>
                            <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AllProjectsStats;