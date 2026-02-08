import { useEffect, type JSX } from 'react';
import { useNavigate, useSearchParams, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { getUserProjects, setFilterOwnership, setFilterStatus, setUserProjectsPage } from '../features/regularUser/projectSlice';
import type { ProjectsFiltersOwner, ProjectsFiltersStatus, ProjectsState } from '../types/project';
import Loading from '../components/global/Loading';
import TotalAndAddProject from '../components/project/projectsPage/TotalAndAddProject';
import NoDataMessage from '../components/global/NoDataMessage';
import FilterOptions from '../components/project/projectsPage/FilterOptions';
import ProjectsList from '../components/project/ProjectsList';
import GlobalPagination from '../components/pagination/GlobalPagination';

function Projects(): JSX.Element {
    const [ searchParams ] = useSearchParams();
    const navigate: NavigateFunction = useNavigate();
    const {
        isLoading,
        projects,
        filters,
        pagination,
        total
    } = useAppSelector<ProjectsState>(state => state.project);
    const dispatch = useAppDispatch();

    useEffect((): void => {
        const urlOwnership = searchParams.get('ownership') as ProjectsFiltersOwner || 'all';
        const urlStatus = searchParams.get('status') as ProjectsFiltersStatus || 'all';
        const urlPage = parseInt(searchParams.get('page') || '1', 10);

        if (urlOwnership !== filters.owner) dispatch(setFilterOwnership(urlOwnership));
        if (urlStatus !== filters.status) dispatch(setFilterStatus(urlStatus));
        if (urlPage !== pagination.currentPage) dispatch(setUserProjectsPage(urlPage));

        if (projects.length == 0) {
            dispatch(getUserProjects({
                ownership: urlOwnership,
                status: urlStatus,
                page: urlPage
            }));
        }
    }, []);

    const handleProjectsPageChange = (newPage: number): void => {
        dispatch(setUserProjectsPage(newPage));
        dispatch(getUserProjects({ ownership: filters.owner, status: filters.status, page: newPage }));

        navigate(`?ownership=${filters.owner}&status=${filters.status}&page=${newPage}`);
    };

    if (isLoading) return <Loading />;

    return (
        <div className='projects-page mt-10'>
            <TotalAndAddProject total={total} />

            <FilterOptions />

            {projects.length == 0 ? (
                <NoDataMessage message="There are no projects" />
            ) : (
                <>
                    <ProjectsList projects={projects} />

                    <GlobalPagination
                        currentPage={pagination.currentPage}
                        lastPage={pagination.lastPage}
                        handlePageChange={handleProjectsPageChange}
                    />
                </>
            )}
        </div>
    );

    return <div></div>;
}

export default Projects;