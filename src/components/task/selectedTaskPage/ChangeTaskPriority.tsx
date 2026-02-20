import { type JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { useThunk } from '../../../hooks/useThunk';
import { useZodValidation } from '../../../hooks/useZodValidation';
import { updateTaskPriority } from '../../../features/regularUser/taskSlice';
import { getUserProjects } from '../../../features/regularUser/projectSlice';
import { taskPrioritySchema, type TaskPriority } from '../../../schemas/taskSchema';
import type { TaskState } from '../../../types/task';
import type { ProjectsState } from '../../../types/project';
import FormSelect from '../../form/FormSelect';
import toast from 'react-hot-toast';

type ChangeTaskPriorityProps = {
    taskId: number;
    taskPriority: string;
};

function ChangeTaskPriority({
    taskId,
    taskPriority
}: ChangeTaskPriorityProps): JSX.Element {
    const { isLoading } = useAppSelector<TaskState>(state => state.tasks);
    const { filters, pagination } = useAppSelector<ProjectsState>(state => state.project);
    const dispatch = useAppDispatch();
    const { run } = useThunk(updateTaskPriority);
    const { validate, errors, setErrors } = useZodValidation<TaskPriority>();

    const options: TaskPriority[] = [ 'low', 'medium', 'high', 'critical' ];

    const handleTaskPriorityChange = async (option: string): Promise<void> => {
        const validation = validate(taskPrioritySchema, option);
        if (!validation) return;

        const thunkCall = await run({
            taskId,
            newTaskPriority: option
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
            toast.error(thunkCall.error.random || "Change Task Priority Error");

            setErrors(thunkCall.error);
        }
    };

    return (
        <FormSelect
            label='Priority:'
            name="priority"
            defaultValue={taskPriority}
            options={options}
            onMutate={handleTaskPriorityChange}
            selectCss='text-xs'
            disabled={isLoading}
            error={errors.status}
        />
    );
}

export default ChangeTaskPriority;