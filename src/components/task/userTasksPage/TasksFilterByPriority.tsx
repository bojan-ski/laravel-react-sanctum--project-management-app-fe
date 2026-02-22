import { type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useThunk } from '../../../hooks/useThunk';
import { useAppDispatch } from '../../../hooks/useRedux';
import { useZodValidation } from '../../../hooks/useZodValidation';
import { fetchUserTasks, setFilterUserTasksPriority } from '../../../features/regularUser/taskSlice';
import { filterTaskPrioritySchema, type FilterTaskByPriority } from '../../../schemas/taskSchema';
import type { UserTasksFilters, UserTasksFiltersPriority } from '../../../types/task';
import FormSelect from '../../form/FormSelect';
import toast from 'react-hot-toast';

function TasksFilterByPriority({ filters }: { filters: UserTasksFilters; }): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useAppDispatch();
    const { run } = useThunk(fetchUserTasks);
    const { validate, errors, setErrors } = useZodValidation<FilterTaskByPriority>();

    const options: UserTasksFiltersPriority[] = [ 'all', 'low', 'medium', 'high', 'critical' ];

    const handleFilterPriorityChange = async (option: string): Promise<void> => {
        const validation = validate(filterTaskPrioritySchema, option);
        if (!validation) return;

        dispatch(setFilterUserTasksPriority(option));

        const thunkCall = await run({
            ownership: filters.ownership,
            status: filters.status,
            priority: option,
            page: 1
        });

        if (thunkCall.ok) {
            setErrors({});

            navigate(`?ownership=${filters.ownership}&status=${filters.status}&priority=${option}&page=1`);
        } else {
            toast.error(thunkCall.error.random || "Validation error");

            setErrors(thunkCall.error);
        }
    };

    return (
        <FormSelect
            label='Priority:'
            name="priority"
            defaultValue={filters.priority}
            disabledOptionLabel='select priority'
            options={options}
            onMutate={handleFilterPriorityChange}
            error={errors.priority}
        />
    );
}

export default TasksFilterByPriority;