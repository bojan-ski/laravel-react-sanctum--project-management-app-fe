import { type JSX } from 'react';
import { FolderKanban, Users } from 'lucide-react';

type RegularUserStatsProps = {
    ownedProjectsCount: number;
    memberProjectsCount: number;
    totalProjectsCount: number;
};

function RegularUserStats({
    ownedProjectsCount,
    memberProjectsCount,
    totalProjectsCount
}: RegularUserStatsProps): JSX.Element {
    const stats = [
        {
            label: 'Owned Projects',
            value: ownedProjectsCount,
            icon: FolderKanban,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            label: 'Member Of',
            value: memberProjectsCount,
            icon: Users,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
        },
        {
            label: 'Total Projects',
            value: totalProjectsCount,
            icon: FolderKanban,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
        },
    ];
    return (
        <div className='mb-4 md:mb-0'>
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="bg-white border rounded-lg p-4 mb-4 last:mb-0"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">
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

export default RegularUserStats;