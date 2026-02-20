import { type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppSelector } from '../../../hooks/useRedux';
import { useThunk } from '../../../hooks/useThunk';
import { removeTask } from '../../../features/regularUser/taskSlice';
import type { TaskDetails, TaskState } from '../../../types/task';
import { Button } from '../../ui/button';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

function DeleteTask({ task }: { task: TaskDetails; }): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const { isLoading } = useAppSelector<TaskState>(state => state.tasks);
    const { run } = useThunk(removeTask);    

    const handleDelete = async (): Promise<void> => {
        if (confirm(`Delete task "${task.title}"?`)) {
            const thunkCall = await run(task.id);

            if (thunkCall.ok) {
                toast.success(thunkCall.data.message);

                navigate(`/projects/${task.project.id}`);
            } else {
                toast.error(thunkCall.error.random || "Delete Task Error");
            }
        }
    };

    return (
        <Button
            variant="default"
            size="sm"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white transition-colors cursor-pointer"
            disabled={isLoading}
        >
            <Trash2 />
            <span className='hidden sm:block'>Delete Task</span>
        </Button>
    );
}

export default DeleteTask;