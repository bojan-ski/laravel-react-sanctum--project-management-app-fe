import { type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { useZodValidation } from '../../../hooks/useZodValidation';
import { useThunk } from '../../../hooks/useThunk';
import { getUserProjects, setFilterOwnership } from '../../../features/regularUser/projectSlice';
import { projectOwnershipSchema, type ProjectOwnershipFilter } from '../../../schemas/projectSchema';
import type { ProjectState } from '../../../types/types';
import FormSelect from '../../form/FormSelect';
import toast from 'react-hot-toast';

function FilterByOwnership(): JSX.Element {
    const { filterOwnership, filterStatus } = useAppSelector<ProjectState>(state => state.project);
    const dispatch = useAppDispatch();
    const { run } = useThunk(getUserProjects);
    const { validate } = useZodValidation<ProjectOwnershipFilter>();
    const navigate: NavigateFunction = useNavigate();

    const handleFilterOwnershipChange = async (option: string): Promise<void> => {
        // zod validation
        const validation = validate(projectOwnershipSchema, option);
        if (!validation) return;

        // update slice
        dispatch(setFilterOwnership(option));

        // run dispatch call
        const thunkCall = await run({ ownership: option, status: filterStatus, page: 1 });

        // dispatch response
        if (thunkCall.ok) {
            navigate(`?ownership=${option}&status=${filterStatus}&page=1`);
        } else {
            toast.error(thunkCall.error);
        }
    };

    return (
        <FormSelect
            name="ownership"
            defaultValue={filterOwnership}
            disabledOptionLabel='select ownership'
            options={["all", "owner", "member"]}
            onMutate={handleFilterOwnershipChange}
        />
    );
}

export default FilterByOwnership;