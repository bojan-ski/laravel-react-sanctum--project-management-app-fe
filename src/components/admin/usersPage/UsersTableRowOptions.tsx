import { type JSX } from 'react';
import { Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { getAllUsers, removeUser } from '../../../features/admin/usersSlice';
import type { User } from '../../../types/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '../../ui/dropdown-menu';
import { Button } from '../../ui/button';
import { MoreVertical } from 'lucide-react';
import toast from 'react-hot-toast';

function UsersTableRowOptions({ user }: { user: User; }): JSX.Element {
    const { isLoading, search, currentPage } = useAppSelector(state => state.users);
    const dispatch = useAppDispatch();

    const handleDelete = async (): Promise<void> => {
        if (confirm(`Delete user ${user.name}?`)) {
            const result = await dispatch(removeUser(user.id));           

            if (result.meta.requestStatus == 'fulfilled') {
                const successMsg = result.payload as { message: string; };
                toast.success(successMsg.message);

                dispatch(getAllUsers({ search: search, page: currentPage }));
            }

            if (result.meta.requestStatus == 'rejected') {
                const errorMsg = result.payload || result?.meta.requestStatus;
                toast.error(errorMsg as string);
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
                    <Link to={`/users/${user.id}`}>
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