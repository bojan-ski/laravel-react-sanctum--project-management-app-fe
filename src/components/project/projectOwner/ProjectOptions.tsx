import type { JSX } from 'react';
import { Link } from 'react-router';
import DeleteProject from './DeleteProject';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { Button } from '../../ui/button';
import { MoreVertical, Edit } from 'lucide-react';

type ProjectOptionsProps = {
    projectId: number;
    projectTitle: string;
};

function ProjectOptions({
    projectId,
    projectTitle
}: ProjectOptionsProps): JSX.Element {
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
                        to={`/projects/${projectId}/edit`}
                    >
                        <Edit className="h-4 w-4" />
                        Edit Project
                    </Link>
                </DropdownMenuItem>

                {/* delete */}
                <DeleteProject
                    projectId={projectId}
                    projectTitle={projectTitle}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ProjectOptions;