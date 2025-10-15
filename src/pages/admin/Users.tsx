import { type JSX } from 'react';
import AddUser from '../../components/admin/usersPage/AddUser';

function Users(): JSX.Element {
    return (
        <div className='users-page container mx-auto mt-10'>

            <AddUser/>
            
        </div>
    );
}

export default Users;