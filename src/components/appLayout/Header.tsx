import { type JSX } from 'react';
import { useAppSelector } from '../../hooks/useRedux';
import type { User } from '../../types/types';
import Navbar from './header/Navbar';
import LogoutOption from './header/LogoutOption';

function Header(): JSX.Element {
    const user: User = useAppSelector(state => state.user);
    console.log(user);

    return (
        <header className="header bg-gray-800 text-gray-300 py-4">
            <div className="container navbar mx-auto flex items-center justify-between">

                {/* nav links */}
                <Navbar />

                {/* auth option */}
                <LogoutOption />

            </div>
        </header>
    );
}

export default Header;