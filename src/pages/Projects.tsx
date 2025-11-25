import { useEffect, type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { getUserProjects, setUserProjectsPage } from '../features/regularUser/projectSlice';
import type { ProjectState } from '../types/types';
import Loading from '../components/global/Loading';
import TotalAndAddProject from '../components/project/projectsPage/TotalAndAddProject';
import NoDataMessage from '../components/global/NoDataMessage';
import FilterOptions from '../components/project/projectsPage/FilterOptions';
import ProjectsList from '../components/project/ProjectsList';
import GlobalPagination from '../components/pagination/GlobalPagination';

function Projects(): JSX.Element {
    const { isLoading, userProjects, filterOwnership, filterStatus, currentPage, lastPage, total } = useAppSelector<ProjectState>(state => state.project);
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    useEffect((): void => {
        console.log('useEffect - Projects');
        if (userProjects.length == 0) dispatch(getUserProjects({}));
    }, []);

    const handleProjectsPageChange = (newPage: number): void => {
        dispatch(setUserProjectsPage(newPage));
        dispatch(getUserProjects({ ownership: filterOwnership, status: filterStatus, page: newPage }));

        navigate(`?ownership=${filterOwnership}&status=${filterStatus}&page=${newPage}`);
    };

    if (isLoading) return <Loading />;

    return (
        <div className='projects-page mt-10'>
            <TotalAndAddProject total={total} />

            <FilterOptions />

            {userProjects.length == 0 ? (
                <NoDataMessage message="There are no projects" />
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