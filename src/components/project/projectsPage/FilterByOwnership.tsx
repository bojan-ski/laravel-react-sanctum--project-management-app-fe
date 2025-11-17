import { type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch } from '../../../hooks/useRedux';
import { getUserProjects, setFilterOwnership } from '../../../features/regularUser/projectSlice';
import { projectOwnershipSchema } from '../../../schemas/projectSchema';
import FormSelect from '../../form/FormSelect';
import toast from 'react-hot-toast';

type FilterByOwnershipProps = {
    filterStatus: string;
    filterOwnership: string;
};

function FilterByOwnership({
    filterStatus,
    filterOwnership
}: FilterByOwnershipProps): JSX.Element {
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const handleFilterOwnershipChange = async (option: string): Promise<void> => {
        // zod validation
        const validation = projectOwnershipSchema.safeParse(option);

        if (!validation.success) {
            toast.error('Invalid filter option!');
            return;
        }

        // update slice
        dispatch(setFilterOwnership(option));

        // api call
        const result = await dispatch(getUserProjects({ ownership: option, status: filterStatus, page: 1 }));

        // api response
        if (result.meta.requestStatus == 'fulfilled') {
            navigate(`?ownership=${option}&status=${filterStatus}&page=1`);
        }

        if (result.meta.requestStatus == 'rejected') {
            const errorMsg = result.payload || result?.meta.requestStatus;
            toast.error(errorMsg as string);
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