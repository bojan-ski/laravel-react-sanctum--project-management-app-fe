import { type JSX } from 'react';
import type { ProjectStatus } from '../../../types/project';
import ProjectOwnerDetails from './ProjectOwnerDetails';
import ChangeProjectStatus from './ChangeProjectStatus';
import ProjectOptions from './ProjectOptions';

type ProjectOwnerProps = {
    ownerAvatar: string;
    ownerName: string;
    isProjectOwner: boolean;
    projectId: number;
    projectTitle: string;
    projectStatus: ProjectStatus;
    setProjectStatus: (option: ProjectStatus) => void;
    divCss?: string;
};

function ProjectOwner({
    ownerAvatar,
    ownerName,
    isProjectOwner,
    projectId,
    projectTitle,
    projectStatus,
    setProjectStatus,
    divCss,
}: ProjectOwnerProps): JSX.Element {
    return (
        <div className={`flex items-center justify-between mb-4 ${divCss}`}>
            {!isProjectOwner ? (
                <ProjectOwnerDetails
                    ownerAvatar={ownerAvatar}
                    ownerName={ownerName}
                />
            ) : (
                <>
                    <ChangeProjectStatus
                        projectId={projectId}
                        projectStatus={projectStatus}
                        setProjectStatus={setProjectStatus}
                    />

                    {(projectStatus === 'active' || projectStatus === 'pending') && (
                        <ProjectOptions
                            projectId={projectId}
                            projectTitle={projectTitle}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default ProjectOwner;