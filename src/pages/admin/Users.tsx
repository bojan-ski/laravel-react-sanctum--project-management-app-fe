import { useEffect, type JSX } from 'react';
import { useNavigate, useSearchParams, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { getAllUsers, setUsersPage, setUsersSearch } from '../../features/adminUser/usersSlice';
import type { UsersState } from '../../types/admin';
import NoDataMessage from '../../components/global/NoDataMessage';
import AddUser from '../../components/admin/usersPage/AddUser';
import UsersSearch from '../../components/admin/usersPage/UsersSearch';
import UsersTable from '../../components/admin/usersPage/UsersTable';
import GlobalPagination from '../../components/pagination/GlobalPagination';

function Users(): JSX.Element {
    const [ searchParams ] = useSearchParams();
    const navigate: NavigateFunction = useNavigate();
    const { users, search, pagination } = useAppSelector<UsersState>(state => state.users);
    const dispatch = useAppDispatch();

    useEffect((): void => {
        const urlSearch = searchParams.get('search') as string || '';
        const urlPage = parseInt(searchParams.get('page') || '1', 10);

        if (urlSearch !== search) dispatch(setUsersSearch(urlSearch));
        if (urlPage !== pagination.currentPage) dispatch(setUsersPage(urlPage));

        if (users.length == 0) {
            dispatch(getAllUsers({
                search: urlSearch,
                page: urlPage
            }));
        }
    }, []);

    const handleSearch = (searchTerm: string): void => {
        dispatch(setUsersSearch(searchTerm));
        dispatch(getAllUsers({
            search: searchTerm,
            page: 1
        }));

        navigate(`?search=${searchTerm}&page=1`);
    };

    const handleUsersPageChange = (newPage: number): void => {
        dispatch(setUsersPage(newPage));
        dispatch(getAllUsers({
            search: search,
            page: newPage
        }));

        navigate(`?search=${search}&page=${newPage}`);
    };

    return (
        <div className='admin-users-page mt-10'>
            <section className='flex flex-col md:flex-row md:items-center md:justify-between mb-5'>
                <UsersSearch
                    search={search}
                    handleSearch={handleSearch}
                />
                <AddUser />
            </section>

            {users.length == 0 ? (
                <NoDataMessage message="There are no users" />
            ) : (
                <>
                    <UsersTable users={users} />

                    <GlobalPagination
                        currentPage={pagination.currentPage}
                        lastPage={pagination.lastPage}
                        handlePageChange={handleUsersPageChange}
                    />
                </>
            )}
        </div>
    );
}

export default Users;