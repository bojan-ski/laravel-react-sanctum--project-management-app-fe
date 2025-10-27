import { useEffect, type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { getAllUserProjects, setFilterOwnership, setUserProjectsPage } from '../features/regularUser/userProjectsSlice';
import Loading from '../components/global/Loading';
import ErrorMessage from '../components/global/ErrorMessage';
import AddProject from '../components/projectsPage/AddProject';
import NoDataMessage from '../components/global/NoDataMessage';
import ProjectsList from '../components/project/ProjectsList';
import GlobalPagination from '../components/pagination/GlobalPagination';
import FormSelect from '../components/form/FormSelect';

function Projects(): JSX.Element {
    const { isLoading, userProjects, filterOwnership, currentPage, lastPage, total, error } = useAppSelector(state => state.userProjects);
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    useEffect((): void => {
        console.log('useEffect - Users');
        if (userProjects.length == 0) dispatch(getAllUserProjects({}));
    }, []);

    const handleFilterOwnershipChange = (option: string): void => {
        console.log(option);

        dispatch(setFilterOwnership(option));
        dispatch(getAllUserProjects({ ownership: option, page: 1 }));

        navigate(`?ownership=${option}&page=1`);

    };

    const handlePageChange = (newPage: number): void => {
        dispatch(setUserProjectsPage(newPage));
        dispatch(getAllUserProjects({ ownership: filterOwnership, page: newPage }));

        navigate(`?page=${newPage}`);
        navigate(`?ownership=${filterOwnership}&page=1`);
    };

    if (isLoading) return <Loading />;

    if (error) return <ErrorMessage error={error} />;

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
            <section className='filter-options flex gap-4 mb-5'>
                {/* ownership */}
                <FormSelect
                    name="ownership"
                    defaultValue={filterOwnership}
                    disabledOptionLabel='select ownership'
                    options={["all", "owner", "member"]}
                    onMutate={handleFilterOwnershipChange}
                />

                {/* status */}
                <FormSelect
                    name="status"
                    // defaultValue={filterStatus}
                    disabledOptionLabel='select status'
                    options={["all", "pending", "active", "completed", "closed"]}
                // onMutate={handleFilterChange}
                />
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