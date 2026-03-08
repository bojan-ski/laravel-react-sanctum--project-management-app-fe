import { type JSX } from 'react';
import { Clock, Play, CheckCircle, Archive, CircleIcon } from 'lucide-react';
import type { ProjectStatus as ProjectStatusTypes } from '../../../types/project';

type ProjectStatusProps = {
    status: ProjectStatusTypes;
};

const statusMap: Record<ProjectStatusTypes, { icon: any; color: string; }> = {
    pending: { icon: Clock, color: 'text-amber-500' },
    active: { icon: Play, color: 'text-blue-500' },
    completed: { icon: CheckCircle, color: 'text-emerald-500' },
    closed: { icon: Archive, color: 'text-gray-400' },
};

function ProjectStatus({ status }: ProjectStatusProps): JSX.Element {
    const { icon: Icon, color } = statusMap[ status ] || { icon: CircleIcon, color: 'text-gray-500' };

    return (
        <div className='flex items-center justify-end text-xs md:text-sm font-semibold mb-2'>
            <Icon
                className={`h-4 w-4 mr-1.5 ${color}`}
                strokeWidth={2.5}
            />

            <span className='capitalize text-gray-700 dark:text-gray-200'>
                {status}
            </span>
        </div>
    );
}

export default ProjectStatus;