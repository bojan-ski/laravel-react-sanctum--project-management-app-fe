import { type JSX } from 'react';
import { useAppSelector } from '../../../hooks/useRedux';
import CreateTaskModal from './CreateTaskModal';

type ProjectTasksHeaderProps = {
    isProjectOwner: boolean;
    projectId: number;
};

function ProjectTasksHeader({
    isProjectOwner,
    projectId,
}: ProjectTasksHeaderProps): JSX.Element {
    const { tasks } = useAppSelector(state => state.tasks);

    return (
        <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold">
                Tasks ({tasks.length})
            </h3>

            {isProjectOwner && <CreateTaskModal projectId={projectId} />}
        </div>
    );
}

export default ProjectTasksHeader;