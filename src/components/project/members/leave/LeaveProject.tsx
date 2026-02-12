import { type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useThunk } from '../../../../hooks/useThunk';
import { useAppSelector } from '../../../../hooks/useRedux';
import { memberLeaveProject } from '../../../../features/regularUser/projectSlice';
import type { ProjectsState } from '../../../../types/project';
import { Button } from '../../../ui/button';
import { FileOutput } from 'lucide-react';
import toast from 'react-hot-toast';

function LeaveProject({ projectId }: { projectId: number; }): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const { isLoading } = useAppSelector<ProjectsState>(state => state.project);
    const { run } = useThunk(memberLeaveProject);

    const handleLeaveProject = async (): Promise<void> => {
        if (confirm(`Leave project?`)) {
            const thunkCall = await run(projectId);
            console.log(thunkCall);

            if (thunkCall.ok) {
                toast.success(thunkCall.data.message);

                navigate('/projects');
            } else {
                toast.error(thunkCall.error.random || "Leave Project Error");
            }
        }
    };

    return (
        <Button
            type='button'
            size={'sm'}
            onClick={handleLeaveProject}
            className='cursor-pointer bg-red-500 hover:bg-red-600 text-xs md:text-sm border'
            disabled={isLoading}
        >
            <FileOutput />
            <span className='hidden sm:block'>
                {isLoading ? 'Leaving...' : 'Leave'}
            </span>
        </Button>
    );
}

export default LeaveProject;