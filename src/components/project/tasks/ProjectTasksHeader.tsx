import { type JSX } from 'react';
import type { ProjectStatus } from '../../../types/project';
import CreateTaskModal from './CreateTaskModal';

type ProjectTasksHeaderProps = {
    isProjectOwner: boolean;
    projectId: number;
    tasksLength: number;
    projectStatus: ProjectStatus;
};

function ProjectTasksHeader({
    isProjectOwner,
    projectId,
    tasksLength,
    projectStatus
}: ProjectTasksHeaderProps): JSX.Element {
    return (
        <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold">
                Tasks ({tasksLength})
            </h3>

            {(projectStatus === 'active' || projectStatus === 'pending') && (
                <>
                    {isProjectOwner && <CreateTaskModal projectId={projectId} />}
                </>
            )}
        </div>
    );
}

export default ProjectTasksHeader;