import { type JSX } from 'react';
import { useLoaderData } from 'react-router';
import { useAppSelector } from '../../hooks/useRedux';
import ProfileImage from './ProfileImage';
import ProfileDetails from './ProfileDetails';
import DeleteAccount from './DeleteAccount';

function ProfileData(): JSX.Element {
    const { data: profileData } = useLoaderData();
    const { isLoading } = useAppSelector(state => state.user);

    return (
        <div className='user-profile-data h-max text-xs sm:text-sm p-5 border border-yellow-500 rounded-lg mb-5 md:mb-0'>
            <div className='sm:flex justify-between border-b pb-3 md:pb-0 mb-3'>
                <ProfileImage
                    isLoading={isLoading}
                    profileImage={profileData.avatar}
                />
                <ProfileDetails
                    name={profileData.name}
                    email={profileData.email}
                    created={profileData.created_at}
                />
            </div>

            <DeleteAccount isLoading={isLoading} />
        </div>
    );
}

export default ProfileData;