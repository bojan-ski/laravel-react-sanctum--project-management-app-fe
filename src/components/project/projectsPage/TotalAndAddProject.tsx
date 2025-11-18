import { type JSX } from 'react';
import { Link } from 'react-router';
import { Button } from '../../ui/button';
import { Plus } from 'lucide-react';

function TotalAndAddProject({ total }: { total: number; }): JSX.Element {
    return (
        <section className='flex items-center justify-between mb-5'>
            <p className="font-semibold">
                Projects: {total} project{total !== 1 ? 's' : ''}
            </p>

            <Button
                asChild
                className='font-semibold text-white hover:text-white bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer'
                variant="outline"
            >
                <Link to={'/add_project'}>
                    <Plus/>
                    <span className='hidden md:block'>Project</span>
                </Link>
            </Button>
        </section>
    );
}

export default TotalAndAddProject;