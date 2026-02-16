import { type JSX } from 'react';
import { Link } from 'react-router';
import type { ProjectCard as ProjectCardType } from '../../../types/project';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import ProjectOwnerDetails from '../projectOwner/ProjectOwnerDetails';
import ProjectStatistics from './ProjectStatistics';
import ProjectProgress from './ProjectProgress';
import ProjectDeadline from '../ProjectDeadline';
import ProjectStatus from './ProjectStatus';

function ProjectCard({ project }: { project: ProjectCardType; }): JSX.Element {
    console.log(project);
    
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
                <CardTitle className="mb-1">
                    {project.title}
                </CardTitle>
                <CardDescription>
                    {project.description}
                </CardDescription>
            </CardHeader>

            <CardContent>
                {!project.is_owner && (
                    <ProjectOwnerDetails
                        ownerAvatar={project.owner?.avatar}
                        ownerName={project.owner?.name}
                        divCss='mb-3'
                    />
                )}

                <ProjectStatistics
                    totalMembers={project.statistics?.total_members || 0}
                    completedTasks={project.statistics?.completed_tasks || 0}
                    totalTasks={project.statistics?.total_tasks || 0}
                />

                {project.statistics?.total_tasks > 0 && (
                    <ProjectProgress completionPercentage={project.statistics?.completion_percentage || 0} />
                )}

                <div className='flex items-center justify-between mb-3'>
                    <ProjectDeadline deadline={project.deadline} />
                    <ProjectStatus status={project.status} />
                </div>

                <div className='text-end'>
                    <Link to={`/projects/${project.id}`} className='text-blue-500 hover:text-blue-700 transition font-bold'>
                        Details
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProjectCard;