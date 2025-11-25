import { type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { useThunk } from '../../../hooks/useThunk';
import { useZodValidation } from '../../../hooks/useZodValidation';
import { getUserProjects, setFilterStatus } from '../../../features/regularUser/projectSlice';
import { projectStatusSchema, type ProjectStatusFilter } from '../../../schemas/projectSchema';
import type { ProjectState } from '../../../types/types';
import FormSelect from '../../form/FormSelect';
import toast from 'react-hot-toast';

function FilterByStatus(): JSX.Element {
    const { filterOwnership, filterStatus } = useAppSelector<ProjectState>(state => state.project);
    const dispatch = useAppDispatch();
    const { run } = useThunk(getUserProjects);
    const { validate } = useZodValidation<ProjectStatusFilter>();
    const navigate: NavigateFunction = useNavigate();

    const handleFilterStatusChange = async (option: string): Promise<void> => {
        // zod validation
        const validation = validate(projectStatusSchema, option);
        if (!validation) return;

        // update slice
        dispatch(setFilterStatus(option));

        // run dispatch call
        const thunkCall = await run({ ownership: filterOwnership, status: option, page: 1 });

        // dispatch response
        if (thunkCall.ok) {
            navigate(`?ownership=${filterOwnership}&status=${option}&page=1`);
        } else {
            toast.error(thunkCall.error);
        }
    };

    return (
        <FormSelect
            name="status"
            defaultValue={filterStatus}
            disabledOptionLabel='select status'
            options={["all", "pending", "active", "completed", "closed"]}
            onMutate={handleFilterStatusChange}
        />
    );
}

export default FilterByStatus;