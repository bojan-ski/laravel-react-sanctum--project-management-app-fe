import { useEffect, type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { getAllUserProjects, setUserProjectsPage } from '../features/regularUser/userProjectsSlice';
import Loading from '../components/global/Loading';
import ErrorMessage from '../components/global/ErrorMessage';
import AddProject from '../components/projectsPage/AddProject';
import NoDataMessage from '../components/global/NoDataMessage';
import ProjectsList from '../components/project/ProjectsList';
import GlobalPagination from '../components/pagination/GlobalPagination';

function Projects(): JSX.Element {
    const { isLoading, userProjects, currentPage, lastPage, total, error } = useAppSelector(state => state.userProjects);
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    useEffect((): void => {
        console.log('useEffect - Users');
        if (userProjects.length == 0) dispatch(getAllUserProjects({}));
    }, []);

    const handlePageChange = (newPage: number): void => {
        dispatch(setUserProjectsPage(newPage));
        dispatch(getAllUserProjects({ page: newPage }));

        navigate(`?page=${newPage}`);
    };

    if (isLoading) return <Loading />;

    if(error) return <ErrorMessage error={error}/>
 
    return (
        <div className='projects-page mt-10'>
            {/* total & add new project */}
            <section className='flex items-center justify-between mb-5'>
                <p className="font-semibold">
                    Projects: {total} project{total !== 1 ? 's' : ''} 
                </p>

                <AddProject />
            </section>

            {/* filter projects */}
            <section className='filter-options mb-5'>
                filter
            </section>

            {/* projects container */}
            {userProjects.length == 0 ? (
                <NoDataMessage message="You have no projects" />
            ) : (
                <>
                    <ProjectsList projects={userProjects} />

                    <GlobalPagination
                        currentPage={currentPage}
                        lastPage={lastPage}
                        handlePageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}

export default Projects;