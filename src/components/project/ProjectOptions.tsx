import type { JSX } from 'react';
import { Link } from 'react-router';
import type { ProjectCard as ProjectCardType } from '../../types/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import DeleteProject from './DeleteProject';
import { MoreVertical, Edit } from 'lucide-react';

function ProjectOptions({ project }: { project: ProjectCardType; }): JSX.Element {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                {/* edit */}
                <DropdownMenuItem>
                    <Link 
                        className='flex items-center gap-2'
                        to={`/projects/${project.id}/edit`}
                    >
                        <Edit className="h-4 w-4" />
                        Edit Project
                    </Link>
                </DropdownMenuItem>

                {/* delete */}
                <DeleteProject
                    projectId={project.id}
                    projectTitle={project.title}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ProjectOptions;