import { useEffect, type JSX } from 'react';
import { useNavigate, useSearchParams, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import {
    fetchAllProjects,
    fetchAllProjectStats,
    setAllProjectsPage,
    setAllProjectsSearch
} from '../../features/adminUser/projectSlice';
import type { AllProjectsState } from '../../types/admin';
import Loading from '../../components/global/Loading';
import AllProjectsStats from '../../components/admin/allProjectsPage/AllProjectsStats';
import SearchProjects from '../../components/admin/allProjectsPage/SearchProjects';
import NoDataMessage from '../../components/global/NoDataMessage';
import ProjectsList from '../../components/project/ProjectsList';
import GlobalPagination from '../../components/pagination/GlobalPagination';

function AllProjects(): JSX.Element {
    const [ searchParams ] = useSearchParams();
    const navigate: NavigateFunction = useNavigate();
    const {
        isLoading,
        stats,
        projects,
        search,
        pagination
    } = useAppSelector<AllProjectsState>(state => state.allProjects);
    const dispatch = useAppDispatch();

    useEffect((): void => {
        const urlSearch = searchParams.get('search') as string || '';
        const urlPage = parseInt(searchParams.get('page') || '1', 10);

        if (urlSearch !== search) dispatch(setAllProjectsSearch(urlSearch));
        if (urlPage !== pagination.currentPage) dispatch(setAllProjectsPage(urlPage));

        if (projects.length == 0) {
            dispatch(fetchAllProjects({
                search: urlSearch,
                page: urlPage
            }));
        }

        dispatch(fetchAllProjectStats());
    }, []);

    const handleAllProjectsPageChange = (newPage: number): void => {
        dispatch(setAllProjectsPage(newPage));
        dispatch(fetchAllProjects({
            search: search,
            page: newPage
        }));

        navigate(`?search=${search}&page=${newPage}`);
    };

    if (isLoading) return <Loading />;

    return (
        <div className='admin-projects-page mt-10'>

            <AllProjectsStats stats={stats} />

            <SearchProjects
                isLoading={isLoading}
                search={search}
            />

            {projects.length == 0 ? (
                <NoDataMessage message="There are no projects" />
            ) : (
                <>
                    <ProjectsList projects={projects} />

                    <GlobalPagination
                        currentPage={pagination.currentPage}
                        lastPage={pagination.lastPage}
                        handlePageChange={handleAllProjectsPageChange}
                    />
                </>
            )}
        </div>
    );
}

export default AllProjects;