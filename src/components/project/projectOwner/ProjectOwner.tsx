import { type JSX } from 'react';
import ProjectOwnerDetails from './ProjectOwnerDetails';
import ProjectOptions from './ProjectOptions';

type ProjectOwnerProps = {
    divCss?: string;
    ownerAvatar: string;
    ownerName: string;
    isProjectOWner: boolean;
    projectId: number;
    projectTitle: string;
};

function ProjectOwner({ divCss, ownerAvatar, ownerName, isProjectOWner, projectId, projectTitle }: ProjectOwnerProps): JSX.Element {
    return (
        <div className={`flex items-center justify-between ${divCss}`}>
            {/* project owner */}
            <ProjectOwnerDetails
                ownerAvatar={ownerAvatar}
                ownerName={ownerName}
            />

            {/* if project owner - edit & delete options */}
            {isProjectOWner && <ProjectOptions projectId={projectId} projectTitle={projectTitle} />}
        </div>
    );
}

export default ProjectOwner;