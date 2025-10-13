import { type JSX } from 'react';
import { NavLink } from 'react-router';

function Navbar(): JSX.Element {
    return (
        <nav className='flex items-center gap-2'>
            <NavLink
                to={'/projects'}
                className={({ isActive }) =>
                    `capitalize btn font-semibold text-sm border rounded-sm py-1.5 px-4 text-white hover:bg-yellow-500 transition cursor-pointer ${isActive ? 'bg-yellow-500' : 'bg-yellow-600'}`
                }
            >
                projects
            </NavLink>

            <NavLink
                to={'/profile'}
                className={({ isActive }) =>
                    `capitalize btn font-semibold text-sm border rounded-sm py-1.5 px-4 text-white hover:bg-yellow-500 transition cursor-pointer ${isActive ? 'bg-yellow-500' : 'bg-yellow-600'}`
                }
            >
                profile
            </NavLink>
        </nav>
    );
}

export default Navbar;