import { type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { getUserProjects, setFilterOwnership, setFilterStatus } from '../../features/regularUser/projectSlice';
import type { ProjectState } from '../../types/types';
import FormSelect from '../form/FormSelect';

function FilterOptions(): JSX.Element {
    const { filterOwnership, filterStatus } = useAppSelector<ProjectState>(state => state.project);
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const handleFilterOwnershipChange = (option: string): void => {
        dispatch(setFilterOwnership(option));
        dispatch(getUserProjects({ ownership: option, status: filterStatus, page: 1 }));

        navigate(`?ownership=${option}&status=${filterStatus}&page=1`);
    };

    const handleFilterStatusChange = (option: string): void => {
        dispatch(setFilterStatus(option));
        dispatch(getUserProjects({ ownership: filterOwnership, status: option, page: 1 }));

        navigate(`?ownership=${filterOwnership}&status=${option}&page=1`);
    };

    return (
        <section className='filter-options flex gap-4 mb-5'>
            {/* ownership */}
            <FormSelect
                name="ownership"
                defaultValue={filterOwnership}
                disabledOptionLabel='select ownership'
                options={["all", "owner", "member"]}
                onMutate={handleFilterOwnershipChange}
            />

            {/* status */}
            <FormSelect
                name="status"
                defaultValue={filterStatus}
                disabledOptionLabel='select status'
                options={["all", "pending", "active", "completed", "closed"]}
                onMutate={handleFilterStatusChange}
            />
        </section>
    );
}

export default FilterOptions;