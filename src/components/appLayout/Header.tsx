import { type JSX } from 'react';
import { useAppSelector } from '../../hooks/useRedux';
import type { UserState } from '../../types/types';
import Logo from '../global/Logo';
import Navbar from './header/Navbar';
import LogoutOption from './header/LogoutOption';
import NotificationBell from '../notification/notificationBell/NotificationBell';

function Header(): JSX.Element {
    const { user } = useAppSelector<UserState>(state => state.user);

    return (
        <header className="header bg-gray-800 text-gray-300 py-4">
            {user.name ? (
                <div className="container navbar mx-auto flex items-center justify-between">
                    {/* nav links */}
                    <Navbar role={user.role} />

                    {/* notification */}
                    <NotificationBell />

                    {/* logout option */}
                    <LogoutOption />
                </div>

            ) : (
                <div className='text-center'>
                    <Logo />
                </div>
            )}
        </header>
    );
}

export default Header;