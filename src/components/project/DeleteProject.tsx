import { type JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { deleteUserProject, getUserProjects } from '../../features/regularUser/projectSlice';
import type { ProjectState } from '../../types/types';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

type DeleteProjectProps = {
    projectId: string;
    projectTitle: string;
};

function DeleteProject({ projectId, projectTitle }: DeleteProjectProps): JSX.Element {
    const { isLoading, filterOwnership, filterStatus, currentPage } = useAppSelector<ProjectState>(state => state.project);
    const dispatch = useAppDispatch();

    const handleDelete = async (): Promise<void> => {
        if (confirm(`Delete project ${projectTitle}?`)) {
            const result = await dispatch(deleteUserProject(projectId));

            if (result.meta.requestStatus == 'fulfilled') {
                const successMsg = result.payload as { message: string; };
                toast.success(successMsg.message);

                dispatch(getUserProjects({
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
        <DropdownMenuItem
            onClick={handleDelete}
            className="text-red-600 focus:text-red-600 flex items-center gap-2"
            disabled={isLoading}
        >
            <Trash2 className="h-4 w-4" />
            Delete Project
        </DropdownMenuItem>
    );
}

export default DeleteProject;