import { useEffect, type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { getAllUsers, setPage } from '../../features/admin/usersSlice';
import type { UsersState } from '../../types/types';
import NoDataMessage from '../../components/global/NoDataMessage';
import Loading from '../../components/global/Loading';
import UsersTable from '../../components/admin/usersPage/UsersTable';
import UsersTablePagination from '../../components/admin/usersPage/UsersTablePagination';

function Users(): JSX.Element {
    const { users, currentPage, isLoading, lastPage, total } = useAppSelector<UsersState>(state => state.users);
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    useEffect((): void => {
        console.log('useEffect - Users');
        if (users.length == 0) dispatch(getAllUsers(1));
    }, []);

    const handlePageChange = (newPage: number): void => {
        dispatch(setPage(newPage));
        dispatch(getAllUsers(newPage));

        navigate(`?page=${newPage}`);
    };

    if (isLoading) return <Loading />;

    console.log(users);
    console.log(currentPage);

    return (
        <div className='users-page container mx-auto mt-10'>
            {users.length == 0 ? (
                <NoDataMessage message="There are no users" />
            ) : (
                <>
                    <UsersTable users={users} />

                    <UsersTablePagination
                        users={users}
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