import { type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useThunk } from '../../../hooks/useThunk';
import { useAppDispatch } from '../../../hooks/useRedux';
import { useZodValidation } from '../../../hooks/useZodValidation';
import { fetchUserTasks, setFilterUserTasksStatus } from '../../../features/regularUser/taskSlice';
import { filterTaskStatusSchema, type FilterTaskByStatus } from '../../../schemas/taskSchema';
import type { UserTasksFilters, UserTasksFiltersStatus } from '../../../types/task';
import FormSelect from '../../form/FormSelect';
import toast from 'react-hot-toast';

function TasksFilterByStatus({ filters }: { filters: UserTasksFilters; }): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useAppDispatch();
    const { run } = useThunk(fetchUserTasks);
    const { validate, errors, setErrors } = useZodValidation<FilterTaskByStatus>();

    const options: UserTasksFiltersStatus[] = [ 'all', 'todo', 'in_progress', 'review', 'done' ];

    const handleFilterStatusChange = async (option: string): Promise<void> => {
        const validation = validate(filterTaskStatusSchema, option);
        if (!validation) return;

        dispatch(setFilterUserTasksStatus(option));

        const thunkCall = await run({
            ownership: filters.ownership,
            status: option,
            priority: filters.priority,
            page: 1
        });

        if (thunkCall.ok) {
            setErrors({});

            navigate(`?ownership=${filters.ownership}&status=${option}&priority=${filters.priority}&page=1`);
        } else {
            toast.error(thunkCall.error.random || "Validation error");

            setErrors(thunkCall.error);
        }
    };

    return (
        <FormSelect
            label='Status:'
            name="status"
            defaultValue={filters.status}
            disabledOptionLabel='select status'
            options={options}
            onMutate={handleFilterStatusChange}
            error={errors.status}
        />
    );
}

export default TasksFilterByStatus;