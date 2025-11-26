import { type JSX } from 'react';
import ProjectOwnerDetails from './ProjectOwnerDetails';
import ChangeProjectStatus from './ChangeProjectStatus';
import ProjectOptions from './ProjectOptions';

type ProjectOwnerProps = {
    ownerAvatar: string;
    ownerName: string;
    isProjectOwner: boolean;
    projectId: number;
    projectTitle: string;
    projectStatus: string;
    divCss?: string;
};

function ProjectOwner({
    ownerAvatar,
    ownerName,
    isProjectOwner,
    projectId,
    projectTitle,
    projectStatus,
    divCss,
}: ProjectOwnerProps): JSX.Element {
    return (
        <div className={`flex items-center justify-between ${divCss}`}>
            {/* project owner details */}
            {!isProjectOwner ? (
                <ProjectOwnerDetails
                    ownerAvatar={ownerAvatar}
                    ownerName={ownerName}
                />
            ) : (
                <>
                    {/* change project status */}
                    <ChangeProjectStatus
                        projectId={projectId}
                        projectStatus={projectStatus}
                    />

                    {/* edit & delete options */}
                    <ProjectOptions
                        projectId={projectId}
                        projectTitle={projectTitle}
                    />
                </>
            )}
        </div>
    );
}

export default ProjectOwner;