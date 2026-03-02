import { type JSX } from 'react';
import type { User } from '../../../types/user';
import { formatDate } from '../../../utils/helpers';
import { TableCell, TableRow, } from "../../ui/table";
import UsersTableRowOptions from './UsersTableRowOptions';
import UserAvatar from '../../global/UserAvatar';

function UsersTableRow({ user }: { user: User }): JSX.Element {
    return (
        <TableRow>
            <TableCell>
                <div className="flex items-center gap-3">
                    <UserAvatar
                        name={user.name}
                        avatar={user.avatar}
                    />
                    <span className="font-medium text-xs md:text-sm">
                        {user.name}
                    </span>
                </div>
            </TableCell>

            <TableCell className='text-xs md:text-sm hidden md:table-cell'>
                {user.email}
            </TableCell>

            <TableCell className='text-xs md:text-sm hidden lg:table-cell'>
                {formatDate(user.created_at)}
            </TableCell>

            <TableCell>
                <UsersTableRowOptions user={user} />
            </TableCell>
        </TableRow>
    );
}

export default UsersTableRow;