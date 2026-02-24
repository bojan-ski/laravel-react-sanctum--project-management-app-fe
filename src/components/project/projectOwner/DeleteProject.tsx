import { type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { useThunk } from '../../../hooks/useThunk';
import { deleteUserProject, getUserProjects } from '../../../features/regularUser/projectSlice';
import type { ProjectsState } from '../../../types/project';
import { DropdownMenuItem } from '../../ui/dropdown-menu';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

type DeleteProjectProps = {
    projectId: number;
    projectTitle: string;
};

function DeleteProject({
    projectId,
    projectTitle
}: DeleteProjectProps): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const { isLoading, filters, pagination } = useAppSelector<ProjectsState>(state => state.projects);
    const { run } = useThunk(deleteUserProject);
    const dispatch = useAppDispatch();

    const handleDelete = async (): Promise<void> => {
        if (confirm(`Delete project - ${projectTitle}?`)) {
            const thunkCall = await run(projectId);

            if (thunkCall.ok) {
                toast.success(thunkCall.data.message);

                dispatch(getUserProjects({
                    ownership: filters.owner,
                    status: filters.status,
                    page: pagination.currentPage
                }));

                navigate(`/projects?ownership=${filters.owner}&status=${filters.status}&page=${pagination.currentPage}`);
            } else {
                toast.error(thunkCall.error.random || "Delete Project Error");
            }
        }
    };

    return (
        <DropdownMenuItem
            className="text-xs md:text-sm text-red-600 focus:text-red-600 flex items-center gap-2"
            onClick={handleDelete}
            disabled={isLoading}
        >
            <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
            {isLoading ? 'Deleting...' : 'Delete Project'}
        </DropdownMenuItem>
    );
}

export default DeleteProject;