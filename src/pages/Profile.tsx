import { type JSX } from 'react';
import { getProfile } from '../services/profile';
import type { ProfileResponse } from '../types/profile';
import ProfileData from '../components/profile/ProfileData';
import ChangePassword from '../components/profile/ChangePassword';

export const loader = async (): Promise<ProfileResponse> => {
    const data: ProfileResponse = await getProfile();

    return data;
};

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