import { type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch } from '../../../hooks/useRedux';
import { useThunk } from '../../../hooks/useThunk';
import { useZodValidation } from '../../../hooks/useZodValidation';
import { getUserProjects, setFilterStatus } from '../../../features/regularUser/projectSlice';
import { projectStatusSchema, type ProjectStatusFilter } from '../../../schemas/projectSchema';
import type { ProjectsFilters, ProjectsFiltersStatus } from '../../../types/project';
import FormSelect from '../../form/FormSelect';
import toast from 'react-hot-toast';

function FilterByStatus({ filters }: { filters: ProjectsFilters; }): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useAppDispatch();
    const { run } = useThunk(getUserProjects);
    const { validate, errors, setErrors } = useZodValidation<ProjectStatusFilter>();

    const options: ProjectsFiltersStatus[] = [ "all", "pending", "active", "completed", "closed" ];

    const handleFilterStatusChange = async (option: string): Promise<void> => {
        const validation = validate(projectStatusSchema, option);
        if (!validation) return;

        dispatch(setFilterStatus(option));

        const thunkCall = await run({
            ownership: filters.owner,
            status: option,
            page: 1
        });

        if (thunkCall.ok) {
            navigate(`?ownership=${filters.owner}&status=${option}&page=1`);

            setErrors({});
        } else {
            toast.error(thunkCall.error.random || "Validation error");

            setErrors(thunkCall.error);
        }
    };

    return (
        <FormSelect
            name="status"
            defaultValue={filters.status}
            disabledOptionLabel='select status'
            options={options}
            onMutate={handleFilterStatusChange}
            error={errors.status}
        />
    );
}

export default FilterByStatus;