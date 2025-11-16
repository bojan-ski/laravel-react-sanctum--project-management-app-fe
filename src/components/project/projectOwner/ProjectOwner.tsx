import { type JSX } from 'react';
import ProjectOwnerDetails from './ProjectOwnerDetails';
import ChangeProjectStatus from './ChangeProjectStatus';
import ProjectOptions from './ProjectOptions';

type ProjectOwnerProps = {
    divCss?: string;
    ownerAvatar: string;
    ownerName: string;
    isProjectOWner: boolean;
    projectId: number;
    projectTitle: string;
    projectStatus: string;
    onRefresh?: () => void;
};

function ProjectOwner({
    divCss,
    ownerAvatar,
    ownerName,
    projectId,
    projectTitle,
    projectStatus,
    onRefresh
}: ProjectOwnerProps): JSX.Element {
    return (
        <div className={`flex items-center justify-between ${divCss}`}>
            {/* project owner details */}
            <ProjectOwnerDetails
                ownerAvatar={ownerAvatar}
                ownerName={ownerName}
            />

            {/* change project status */}
            {onRefresh && (
                <ChangeProjectStatus
                    projectId={projectId}
                    projectStatus={projectStatus}
                    onRefresh={onRefresh}
                />
            )}

            {/* edit & delete options */}
            <ProjectOptions
                projectId={projectId}
                projectTitle={projectTitle}
            />
        </div>
    );
}

export default ProjectOwner;