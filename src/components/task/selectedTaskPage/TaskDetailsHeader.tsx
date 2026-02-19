import { type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useThunk } from '../../../hooks/useThunk';
import { removeTask } from '../../../features/regularUser/taskSlice';
import type { TaskDetails } from '../../../types/task';
import { Card, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import ChangeTaskStatus from './ChangeTaskStatus';
import ChangeTaskPriority from './ChangeTaskPriority';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

function TaskDetailsHeader({ task }: { task: TaskDetails; }): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const { run } = useThunk(removeTask);

    const handleDelete = async (): Promise<void> => {
        if (confirm(`Delete task "${task.title}"?`)) {
            const thunkCall = await run(task.id);

            if (thunkCall.ok) {
                toast.success(thunkCall.data.message);
                navigate(`/projects/${task.project_id}`);
            } else {
                toast.error(thunkCall.error);
            }
        }
    };

    return (
        <Card className='mb-4'>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-xl mb-3">
                            {task.title}
                        </CardTitle>

                        <div className="flex items-center gap-3 flex-wrap">
                            <ChangeTaskStatus
                                taskId={task.id}
                                taskStatus={task.status}
                            />

                            <ChangeTaskPriority
                                taskId={task.id}
                                taskPriority={task.priority}
                            />
                        </div>
                    </div>

                    <Button
                        variant="default"
                        size="sm"
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
        </Card>
    );
}

export default TaskDetailsHeader;