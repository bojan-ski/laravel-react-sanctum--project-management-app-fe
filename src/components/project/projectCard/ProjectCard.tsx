import { type JSX } from 'react';
import { Link } from 'react-router';
import type { ProjectCard as ProjectCardType } from '../../../types/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import ProjectOwnerDetails from '../projectOwner/ProjectOwnerDetails';
import ProjectStatistics from './ProjectStatistics';
import ProjectProgress from './ProjectProgress';
import ProjectDeadline from '../ProjectDeadline';

function ProjectCard({ project }: { project: ProjectCardType; }): JSX.Element {
    // console.log(project);

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
                <CardTitle className="mb-1">
                    {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-5">
                    {project.description}
                </CardDescription>
            </CardHeader>

            <CardContent>
                {/* project owner */}
                {!project.is_owner && (
                    <ProjectOwnerDetails
                        ownerAvatar={project.owner?.avatar}
                        ownerName={project.owner?.name}
                        divCss='mb-3'
                    />
                )}

                {/* statistics */}
                <ProjectStatistics />

                {/* progress bar */}
                <ProjectProgress />

                <div className='flex items-center justify-between'>
                    {/* deadline */}
                    <ProjectDeadline deadline={project.deadline} />

                    {/* project details link */}
                    <Link to={`/projects/${project.id}`} className='text-blue-500 hover:text-blue-700 transition font-bold'>
                        Details
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProjectCard;