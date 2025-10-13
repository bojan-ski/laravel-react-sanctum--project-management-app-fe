import type { JSX } from 'react';
import { Outlet, useNavigation, type Navigation } from 'react-router';
import Header from '../components/appLayout/Header';
import Footer from '../components/appLayout/Footer';
import Loading from '../components/global/Loading';
import { Toaster } from 'react-hot-toast';

function AppLayout(): JSX.Element {
    const navigation: Navigation = useNavigation()
    const isPageLoading: boolean = navigation.state === 'loading'

    return (
        <>
            <Header />

            <main className='container mx-auto'>
                {isPageLoading ? <Loading /> : <Outlet />}
            </main>

            <Footer />
            
            <Toaster />
        </>
    );
}

export default AppLayout;
