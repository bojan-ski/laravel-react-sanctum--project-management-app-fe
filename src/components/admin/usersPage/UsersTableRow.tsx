import { type JSX } from 'react';
import type { User } from '../../../types/types';
import { formatDate, userInitials } from '../../../utils/helpers';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { TableCell, TableRow, } from "../../ui/table";
import UsersTableRowOptions from './UsersTableRowOptions';

function UsersTableRow({ user }: { user: User }): JSX.Element {
    return (
        <TableRow key={user.id}>
            <TableCell>
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={user.avatar as string} alt={user.name} />
                        <AvatarFallback>
                            {userInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">
                        {user.name}
                    </span>
                </div>
            </TableCell>

            <TableCell>
                {user.email}
            </TableCell>

            <TableCell>
                {formatDate(user.created_at)}
            </TableCell>

            <TableCell>
                <UsersTableRowOptions user={user} />
            </TableCell>
        </TableRow>
    );
}

export default UsersTableRow;