import { type JSX } from 'react';
import type { User } from '../../../types/types';
import { Table, TableBody, TableHead, TableHeader, TableRow, } from "../../../components/ui/table";
import UsersTableRow from '../../../components/admin/usersPage/UsersTableRow';

function UsersTable({ users }: { users: User[]; }): JSX.Element {
    return (
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
    );
}

export default UsersTable;