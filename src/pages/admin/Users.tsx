import { useEffect, type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { getAllUsers, setPage, setSearch } from '../../features/adminUser/usersSlice';
import type { UsersState } from '../../types/types';
import NoDataMessage from '../../components/global/NoDataMessage';
import Loading from '../../components/global/Loading';
import UsersSearch from '../../components/admin/usersPage/UsersSearch';
import UsersTable from '../../components/admin/usersPage/UsersTable';
import UsersTablePagination from '../../components/admin/usersPage/UsersTablePagination';
import AddUser from '../../components/admin/usersPage/AddUser';

function Users(): JSX.Element {
    const { isLoading, users, search, currentPage, lastPage, total } = useAppSelector<UsersState>(state => state.users);
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    useEffect((): void => {
        console.log('useEffect - Users');
        if (users.length == 0) dispatch(getAllUsers({}));
    }, []);

    const handleSearch = (searchTerm: string): void => {
        dispatch(setSearch(searchTerm));
        dispatch(getAllUsers({ search: searchTerm, page: 1 }));

        navigate(`?search=${searchTerm}&page=1`);
    };

    const handlePageChange = (newPage: number): void => {
        dispatch(setPage(newPage));
        dispatch(getAllUsers({ search: search, page: newPage }));

        navigate(`?search=${search}$page=${newPage}`);
    };

    if (isLoading) return <Loading />;

    return (
        <div className='users-page mt-10'>
            {/* search & add new user */}
            <section className='flex items-center justify-between mb-5'>
                <UsersSearch
                    search={search}
                    handleSearch={handleSearch}
                />

                <AddUser
                    search={search}
                    currentPage={currentPage}
                />
            </section>

            {/* users container */}
            {users.length == 0 ? (
                <NoDataMessage message="There are no users" />
            ) : (
                <>
                    <UsersTable users={users} />

                    <UsersTablePagination
                        total={total}
                        currentPage={currentPage}
                        lastPage={lastPage}
                        handlePageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}

export default Users;