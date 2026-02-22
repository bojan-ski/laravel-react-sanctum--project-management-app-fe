import { useEffect, type JSX } from 'react';
import { useNavigate, useSearchParams, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import {
    fetchUserTasks,
    setFilterUserTasksOwnership,
    setFilterUserTasksPriority,
    setFilterUserTasksStatus,
    setUserTasksPage
} from '../features/regularUser/taskSlice';
import type {
    TaskState,
    UserTasksFiltersOwner,
    UserTasksFiltersPriority,
    UserTasksFiltersStatus
} from '../types/task';
import Loading from '../components/global/Loading';
import TasksFilterOptions from '../components/task/userTasksPage/TasksFilterOptions';
import TasksList from '../components/task/TasksList';
import GlobalPagination from '../components/pagination/GlobalPagination';

function UserTasks(): JSX.Element {
    const [ searchParams ] = useSearchParams();
    const navigate: NavigateFunction = useNavigate();
    const {
        isLoading,
        userTasks,
        filters,
        pagination
    } = useAppSelector<TaskState>(state => state.tasks);
    const dispatch = useAppDispatch();

    useEffect((): void => {
        const urlOwnership = searchParams.get('ownership') as UserTasksFiltersOwner || 'all';
        const urlStatus = searchParams.get('status') as UserTasksFiltersStatus || 'all';
        const urlPriority = searchParams.get('priority') as UserTasksFiltersPriority || 'all';
        const urlPage = parseInt(searchParams.get('page') || '1', 10);

        if (urlOwnership !== filters.ownership) dispatch(setFilterUserTasksOwnership(urlOwnership));
        if (urlStatus !== filters.status) dispatch(setFilterUserTasksStatus(urlStatus));
        if (urlPriority !== filters.priority) dispatch(setFilterUserTasksPriority(urlStatus));
        if (urlPage !== pagination.currentPage) dispatch(setUserTasksPage(urlPage));

        if (userTasks.length == 0) {
            dispatch(fetchUserTasks({
                ownership: urlOwnership,
                status: urlStatus,
                priority: urlPriority,
                page: urlPage
            }));
        }
    }, []);

    const handleProjectsPageChange = (newPage: number): void => {
        dispatch(setUserTasksPage(newPage));
        dispatch(fetchUserTasks({
            ownership: filters.ownership,
            status: filters.status,
            priority: filters.priority,
            page: newPage
        }));

        navigate(`?ownership=${filters.ownership}&status=${filters.status}&priority=${filters.priority}&page=${newPage}`);
    };

    if (isLoading) return <Loading />;

    return (
        <div className='user-tasks-page mt-10'>
            <TasksFilterOptions />

            <TasksList
                tasks={userTasks}
                emptyMessage="There are no task"
            />

            {userTasks.length !== 0 && (
                <GlobalPagination
                    currentPage={pagination.currentPage}
                    lastPage={pagination.lastPage}
                    handlePageChange={handleProjectsPageChange}
                />
            )}
        </div>
    );
}

export default UserTasks;