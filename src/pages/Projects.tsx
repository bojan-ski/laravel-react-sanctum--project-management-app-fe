import { useEffect, type JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { getAllUserProjects } from '../features/regularUser/userProjectsSlice';
import type { ProjectCard as ProjectCardType } from '../types/types';
import AddProject from '../components/projectsPage/AddProject';
import Loading from '../components/global/Loading';
import NoDataMessage from '../components/global/NoDataMessage';
import ProjectCard from '../components/global/projectCard/ProjectCard';

function Projects(): JSX.Element {
    const { isLoading, userProjects, total } = useAppSelector(state => state.userProjects);
    const dispatch = useAppDispatch();

    useEffect((): void => {
        console.log('useEffect - Users');
        if (userProjects.length == 0) dispatch(getAllUserProjects());
    }, []);

    if (isLoading) return <Loading />;

    return (
        <div className='projects-page mt-10'>
            {/* total & add new project */}
            <section className='flex items-center justify-between mb-5'>
                <p className="font-semibold">
                    {total} project{total !== 1 ? 's' : ''} total
                </p>

                <AddProject />
            </section>

            {/* filter projects */}

            {/* projects container */}
            {userProjects.length == 0 ? (
                <NoDataMessage message="You have no projects" />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userProjects.map((project: ProjectCardType) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Projects;