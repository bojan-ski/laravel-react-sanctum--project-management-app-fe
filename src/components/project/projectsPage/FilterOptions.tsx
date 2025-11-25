import { type JSX } from 'react';
import FilterByOwnership from './FilterByOwnership';
import FilterByStatus from './FilterByStatus';

function FilterOptions(): JSX.Element {
    return (
        <section className='filter-options flex gap-4 mb-5'>
            <FilterByOwnership/>
            <FilterByStatus/>
        </section>
    );
}

export default FilterOptions;