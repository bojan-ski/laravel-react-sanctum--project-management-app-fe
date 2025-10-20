import { type JSX } from 'react';
import ProfileData from '../components/profilePage/ProfileData';
import ChangePassword from '../components/profilePage/ChangePassword';

function Profile(): JSX.Element {
    return (
        <div className='profile-page mt-10'>
            <section className='grid md:grid-cols-2 gap-4'>

                <ProfileData />
                
                <ChangePassword />
                
            </section>

            

        </div >
    );
}

export default Profile;