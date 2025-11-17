import { type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch } from '../../../hooks/useRedux';
import { projectStatusSchema } from '../../../schemas/projectSchema';
import { getUserProjects, setFilterStatus } from '../../../features/regularUser/projectSlice';
import FormSelect from '../../form/FormSelect';
import toast from 'react-hot-toast';

type FilterByStatusProps = {
    filterStatus: string;
    filterOwnership: string;
};

function FilterByStatus({
    filterStatus,
    filterOwnership
}: FilterByStatusProps): JSX.Element {
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const handleFilterStatusChange = async (option: string): Promise<void> => {
        // zod validation
        const validation = projectStatusSchema.safeParse(option);

        if (!validation.success) {
            toast.error('Invalid filter option!');
            return;
        }

        // update slice
        dispatch(setFilterStatus(option));

        // api call
        const result = await dispatch(getUserProjects({ ownership: filterOwnership, status: option, page: 1 }));

        // api response
        if (result.meta.requestStatus == 'fulfilled') {
            navigate(`?ownership=${filterOwnership}&status=${option}&page=1`);
        }

        if (result.meta.requestStatus == 'rejected') {
            const errorMsg = result.payload || result?.meta.requestStatus;
            toast.error(errorMsg as string);
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