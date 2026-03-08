import { type JSX } from 'react';
import type { User } from '../../../types/user';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from "../../../components/ui/table";
import UsersTableRow from '../../../components/admin/usersPage/UsersTableRow';

function UsersTable({ users }: { users: User[]; }): JSX.Element {
    return (
        <section className='users-table mb-5'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='font-semibold text-xs md:text-sm'>Name</TableHead>
                        <TableHead className='font-semibold text-xs md:text-sm hidden md:table-cell'>Email</TableHead>
                        <TableHead className='font-semibold text-xs md:text-sm hidden lg:table-cell'>Created</TableHead>
                        <TableHead className='font-semibold text-xs md:text-sm'>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users.map((user: User) => <UsersTableRow key={user.id} user={user} />)}
                </TableBody>
            </Table>
        </section>
    );
}

export default UsersTable;