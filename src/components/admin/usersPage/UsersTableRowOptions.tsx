import { type JSX } from 'react';
import { Link } from 'react-router';
import type { User } from '../../../types/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '../../ui/dropdown-menu';
import { Button } from '../../ui/button';
import { MoreVertical } from 'lucide-react';

function UsersTableRowOptions({ user }: { user: User; }): JSX.Element {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className='cursor-pointer border hover:shadow-sm'>
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <Link to={`/users/${user.id}`}>
                        View Details
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    // onClick delete user
                    className="text-red-600 focus:text-red-600"
                >
                    Delete User
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UsersTableRowOptions;