import { type JSX } from 'react';
import { useAppSelector } from '../../../hooks/useRedux';
import type { ProjectsState } from '../../../types/project';
import FilterByOwnership from './FilterByOwnership';
import FilterByStatus from './FilterByStatus';

function FilterOptions(): JSX.Element {
    const { filters } = useAppSelector<ProjectsState>(state => state.project);

    return (
        <section className='filter-options flex gap-4 mb-5'>
            <FilterByOwnership filters={filters} />
            <FilterByStatus filters={filters} />
        </section>
    );
}

export default FilterOptions;