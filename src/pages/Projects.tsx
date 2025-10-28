import { useEffect, type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { getAllUserProjects, setUserProjectsPage } from '../features/regularUser/userProjectsSlice';
import type { UserProjectsState } from '../types/types';
import Loading from '../components/global/Loading';
import ErrorMessage from '../components/global/ErrorMessage';
import TotalAndAddProject from '../components/projectsPage/TotalAndAddProject';
import NoDataMessage from '../components/global/NoDataMessage';
import FilterOptions from '../components/projectsPage/FilterOptions';
import ProjectsList from '../components/project/ProjectsList';
import GlobalPagination from '../components/pagination/GlobalPagination';

function Projects(): JSX.Element {
    const { isLoading, userProjects, filterOwnership, filterStatus, currentPage, lastPage, total, error } = useAppSelector<UserProjectsState>(state => state.userProjects);
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    useEffect((): void => {
        console.log('useEffect - Users');
        if (userProjects.length == 0) dispatch(getAllUserProjects({}));
    }, []);

    const handleProjectsPageChange = (newPage: number): void => {
        dispatch(setUserProjectsPage(newPage));
        dispatch(getAllUserProjects({ ownership: filterOwnership, status: filterStatus, page: newPage }));

        navigate(`?ownership=${filterOwnership}&status=${filterStatus}&page=${newPage}`);
    };

    if (isLoading) return <Loading />;

    if (error) return <ErrorMessage error={error} />;

    return (
        <div className='projects-page mt-10'>
            {/* total & add new project */}
            <TotalAndAddProject total={total} />

            {/* filter projects */}
            <FilterOptions />

            {/* projects container */}
            {userProjects.length == 0 ? (
                <NoDataMessage message="You have no projects" />
            ) : (
                <>
                    <ProjectsList projects={userProjects} />

                    <GlobalPagination
                        currentPage={currentPage}
                        lastPage={lastPage}
                        handlePageChange={handleProjectsPageChange}
                    />
                </>
            )}
        </div>
    );
}

export default Projects;