import { type JSX } from 'react';
import AddProject from './AddProject';

function TotalAndAddProject({ total }: { total: number; }): JSX.Element {
    return (
        <section className='flex items-center justify-between mb-5'>
            <p className="font-semibold">
                Projects: {total} project{total !== 1 ? 's' : ''}
            </p>

            <AddProject />
        </section>
    );
}

export default TotalAndAddProject;