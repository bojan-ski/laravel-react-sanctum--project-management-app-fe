import { type JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { useThunk } from '../../../hooks/useThunk';
import { useZodValidation } from '../../../hooks/useZodValidation';
import { updateTaskStatus } from '../../../features/regularUser/taskSlice';
import { getUserProjects } from '../../../features/regularUser/projectSlice';
import type { TaskState } from '../../../types/task';
import type { ProjectsState } from '../../../types/project';
import { taskStatusSchema, type TaskStatus } from '../../../schemas/taskSchema';
import FormSelect from '../../form/FormSelect';
import toast from 'react-hot-toast';

type ChangeTaskStatusProps = {
    taskId: number;
    taskStatus: string;
};

function ChangeTaskStatus({
    taskId,
    taskStatus
}: ChangeTaskStatusProps): JSX.Element {
    const { isLoading } = useAppSelector<TaskState>(state => state.tasks);
    const { filters, pagination } = useAppSelector<ProjectsState>(state => state.project);
    const dispatch = useAppDispatch();
    const { run } = useThunk(updateTaskStatus);
    const { validate, errors, setErrors } = useZodValidation<TaskStatus>();

    const options = {
        'to_do': 'to do',
        'in_progress': "in progress",
        'review': 'review',
        'done': 'done'
    };

    const handleTaskStatusChange = async (option: string): Promise<void> => {
        const validation = validate(taskStatusSchema, option);
        if (!validation) return;

        const thunkCall = await run({
            taskId,
            newTaskStatus: option
        });        

        if (thunkCall.ok) {
            toast.success(thunkCall.data.message);

            setErrors({});

            dispatch(getUserProjects({
                ownership: filters.owner,
                status: filters.status,
                page: pagination.currentPage
            }));
        } else {
            toast.error(thunkCall.error.random || "Change Task Status Error");

            setErrors(thunkCall.error);
        }
    };

    return (
        <FormSelect
            label='Status:'
            name="status"
            defaultValue={taskStatus}
            options={options}
            onMutate={handleTaskStatusChange}
            selectCss='text-xs'
            disabled={isLoading}
            error={errors.status}
        />
    );
}

export default ChangeTaskStatus;