import { type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch } from '../../../hooks/useRedux';
import { useZodValidation } from '../../../hooks/useZodValidation';
import { useThunk } from '../../../hooks/useThunk';
import { getUserProjects, setFilterOwnership } from '../../../features/regularUser/projectSlice';
import { filterProjectsByOwnershipSchema, type FilterProjectsByOwnership } from '../../../schemas/projectSchema';
import type { ProjectsFilters, ProjectsFiltersOwner } from '../../../types/project';
import FormSelect from '../../form/FormSelect';
import toast from 'react-hot-toast';

function FilterByOwnership({ filters }: { filters: ProjectsFilters; }): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useAppDispatch();
    const { run } = useThunk(getUserProjects);
    const { validate, errors, setErrors } = useZodValidation<FilterProjectsByOwnership>();

    const options: ProjectsFiltersOwner[] = [ "all", "owner", "member" ];

    const handleFilterOwnershipChange = async (option: string): Promise<void> => {
        const validation = validate(filterProjectsByOwnershipSchema, option);
        if (!validation) return;

        dispatch(setFilterOwnership(option));

        const thunkCall = await run({
            ownership: option,
            status: filters.status,
            page: 1
        });

        if (thunkCall.ok) {
            navigate(`?ownership=${option}&status=${filters.status}&page=1`);

            setErrors({});
        } else {
            toast.error(thunkCall.error.random || "Validation error");

            setErrors(thunkCall.error);
        }
    };

    return (
        <FormSelect
            name="ownership"
            defaultValue={filters.owner}
            disabledOptionLabel='select ownership'
            options={options}
            onMutate={handleFilterOwnershipChange}
            error={errors.ownership}
        />
    );
}

export default FilterByOwnership;