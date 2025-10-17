import { useEffect, type JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { getAllUsers } from '../../features/admin/usersSlice';
import { Table, TableBody, TableHead, TableHeader, TableRow, } from "../../components/ui/table";
import UsersTableRow from '../../components/admin/usersPage/UsersTableRow';
import Loading from '../../components/global/Loading';

function Users(): JSX.Element {
    const { users, currentPage, isLoading, firstPage, lastPage, total } = useAppSelector(state => state.users);
    const dispatch = useAppDispatch();

    useEffect((): void => {
        console.log('useEffect - Users');
        if (users.length == 0) dispatch(getAllUsers());
    }, []);

    if (isLoading) return <Loading />;

    console.log(users);
    console.log(currentPage);
    console.log(firstPage);
    console.log(lastPage);
    console.log(total);

    return (
        <div className='users-page container mx-auto mt-10'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='font-semibold'>Name</TableHead>
                        <TableHead className='font-semibold'>Email</TableHead>
                        <TableHead className='font-semibold'>Created</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users.map(user => <UsersTableRow key={user.id} user={user} />)}
                </TableBody>
            </Table>
        </div>
    );
}

export default Users;