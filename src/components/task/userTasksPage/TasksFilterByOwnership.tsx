import { type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useThunk } from '../../../hooks/useThunk';
import { useAppDispatch } from '../../../hooks/useRedux';
import { useZodValidation } from '../../../hooks/useZodValidation';
import { fetchUserTasks, setFilterUserTasksOwnership } from '../../../features/regularUser/taskSlice';
import { filterTaskOwnershipSchema, type FilterTaskByOwnership } from '../../../schemas/taskSchema';
import type { UserTasksFilters, UserTasksFiltersOwner } from '../../../types/task';
import FormSelect from '../../form/FormSelect';
import toast from 'react-hot-toast';

function TasksFilterByOwnership({ filters }: { filters: UserTasksFilters; }): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useAppDispatch();
    const { run } = useThunk(fetchUserTasks);
    const { validate, errors, setErrors } = useZodValidation<FilterTaskByOwnership>();

    const options: UserTasksFiltersOwner[] = [ 'all', 'created', 'assigned' ];

    const handleFilterOwnershipChange = async (option: string): Promise<void> => {
        const validation = validate(filterTaskOwnershipSchema, option);
        if (!validation) return;

        dispatch(setFilterUserTasksOwnership(option));

        const thunkCall = await run({
            ownership: option,
            status: filters.status,
            priority: filters.priority,
            page: 1
        });

        if (thunkCall.ok) {
            setErrors({});

            navigate(`?ownership=${option}&status=${filters.status}&priority=${filters.priority}&page=1`);
        } else {
            toast.error(thunkCall.error.random || "TasksFilterByOwnership error");

            setErrors(thunkCall.error);
        }
    };

    return (
        <FormSelect
            label='Ownership:'
            name="ownership"
            defaultValue={filters.ownership}
            disabledOptionLabel='select ownership'
            options={options}
            onMutate={handleFilterOwnershipChange}
            error={errors.ownership}
        />
    );
}

export default TasksFilterByOwnership;