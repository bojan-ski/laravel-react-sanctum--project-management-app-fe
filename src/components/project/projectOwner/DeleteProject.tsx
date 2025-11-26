import { type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { useThunk } from '../../../hooks/useThunk';
import { deleteUserProject, getUserProjects } from '../../../features/regularUser/projectSlice';
import type { ProjectState } from '../../../types/types';
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
    const { isLoading, filterOwnership, filterStatus, currentPage } = useAppSelector<ProjectState>(state => state.project);
    const { run } = useThunk(deleteUserProject);
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const handleDelete = async (): Promise<void> => {
        if (confirm(`Delete project ${projectTitle}?`)) {
            const thunkCall = await run(projectId);

            if (thunkCall.ok) {
                toast.success(thunkCall.data.message);

                dispatch(getUserProjects({
                    ownership: filterOwnership,
                    status: filterStatus,
                    page: currentPage
                }));

                navigate(`/projects?ownership=${filterOwnership}&status=${filterStatus}&page=${currentPage}`);
            } else {
                toast.error(thunkCall.error);
            }
        }
    };

    return (
        <DropdownMenuItem
            className="text-red-600 focus:text-red-600 flex items-center gap-2"
            onClick={handleDelete}
            disabled={isLoading}
        >
            <Trash2 className="h-4 w-4" />
            {isLoading ? 'Deleting...' : 'Delete Project'}
        </DropdownMenuItem>
    );
}

export default DeleteProject;