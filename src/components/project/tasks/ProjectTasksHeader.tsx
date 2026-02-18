import { type JSX } from 'react';
import CreateTaskModal from './CreateTaskModal';

type ProjectTasksHeaderProps = {
    isProjectOwner: boolean;
    projectId: number;
    tasksLength: number;
};

function ProjectTasksHeader({
    isProjectOwner,
    projectId,
    tasksLength
}: ProjectTasksHeaderProps): JSX.Element {   
    return (
        <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold">
                Tasks ({tasksLength})
            </h3>

            {isProjectOwner && <CreateTaskModal projectId={projectId} />}
        </div>
    );
}

export default ProjectTasksHeader;