import { type JSX } from 'react';
import { useAppSelector } from '../../../hooks/useRedux';
import type { ProjectState } from '../../../types/types';
import FilterByOwnership from './FilterByOwnership';
import FilterByStatus from './FilterByStatus';

function FilterOptions(): JSX.Element {
    const { filterOwnership, filterStatus } = useAppSelector<ProjectState>(state => state.project);

    return (
        <section className='filter-options flex gap-4 mb-5'>
            {/* ownership */}
            <FilterByOwnership
                filterStatus={filterStatus}
                filterOwnership={filterOwnership}
            />

            {/* status */}
            <FilterByStatus
                filterStatus={filterStatus}
                filterOwnership={filterOwnership}
            />
        </section>
    );
}

export default FilterOptions;