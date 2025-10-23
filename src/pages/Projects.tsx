import { type JSX } from 'react';
import AddProject from '../components/projectsPage/AddProject';

function Projects(): JSX.Element {
    return (
        <div className='projects-page mt-10'>
            {/* filter & add new user */}
            <section className='flex items-center justify-between mb-5'>
                <div>
                    filter
                </div>

                <AddProject />
            </section>

            {/* projects container */}
            <section>

            </section>
        </div>
    );
}

export default Projects;