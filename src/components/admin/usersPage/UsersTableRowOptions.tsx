import { type JSX } from 'react';
import { Link } from 'react-router';
import { useAppSelector } from '../../../hooks/useRedux';
import { useThunk } from '../../../hooks/useThunk';
import { removeUser } from '../../../features/adminUser/usersSlice';
import type { User } from '../../../types/user';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '../../ui/dropdown-menu';
import { Button } from '../../ui/button';
import { MoreVertical } from 'lucide-react';
import toast from 'react-hot-toast';

function UsersTableRowOptions({ user }: { user: User; }): JSX.Element {
    const { isLoading } = useAppSelector(state => state.users);
    const { run } = useThunk(removeUser);

    const handleDelete = async (): Promise<void> => {
        if (confirm(`Delete user ${user.name}?`)) {

            const thunkCall = await run(user.id);

            if (thunkCall.ok) {
                toast.success(thunkCall.data.message);
            } else {
                toast.error(thunkCall.error.random || "Delete User Error");
            }
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className='cursor-pointer border hover:shadow-sm'>
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <Link to={`/admin/users/${user.id}`}>
                        View Details
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleDelete}
                    className="text-red-600 focus:text-red-600"
                    disabled={isLoading}
                >
                    Delete User
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UsersTableRowOptions;