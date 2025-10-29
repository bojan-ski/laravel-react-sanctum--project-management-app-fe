import type { JSX } from 'react';
import { Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { deleteUserProject, getAllUserProjects } from '../../../features/regularUser/userProjectsSlice';
import type { ProjectCard as ProjectCardType } from '../../../types/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { Button } from '../../ui/button';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

function ProjectOptions({ project }: { project: ProjectCardType; }): JSX.Element {
    const { isLoading, filterOwnership, filterStatus, currentPage } = useAppSelector(state => state.userProjects);
    const dispatch = useAppDispatch();

    const handleDelete = async (): Promise<void> => {
        if (confirm(`Delete project ${project.title}?`)) {
            const result = await dispatch(deleteUserProject(project.id));

            if (result.meta.requestStatus == 'fulfilled') {
                const successMsg = result.payload as { message: string; };
                toast.success(successMsg.message);

                dispatch(getAllUserProjects({
                    ownership: filterOwnership,
                    status: filterStatus,
                    page: currentPage
                }));
            }

            if (result.meta.requestStatus == 'rejected') {
                const errorMsg = result.payload || result?.meta.requestStatus;
                toast.error(errorMsg as string);
            }
        }
    };

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
                        to={`/projects/${project.id}`}
                    >
                        <Edit className="h-4 w-4" />
                        Edit Project
                    </Link>
                </DropdownMenuItem>

                {/* delete */}
                <DropdownMenuItem
                    onClick={handleDelete}
                    className="text-red-600 focus:text-red-600 flex items-center gap-2"
                    disabled={isLoading}
                >
                    <Trash2 className="h-4 w-4" />
                    Delete Project
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ProjectOptions;