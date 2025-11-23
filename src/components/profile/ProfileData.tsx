import { type JSX } from 'react';
import { useAppSelector } from '../../hooks/useRedux';
import ProfileImage from './ProfileImage';
import ProfileDetails from './ProfileDetails';
import DeleteAccount from './DeleteAccount';

function ProfileData(): JSX.Element {
    const { isLoading, user } = useAppSelector(state => state.user);

    return (
        <div className='user-profile-data text-sm p-5 border border-yellow-500 rounded-lg mb-5 md:mb-0'>
            <div className='md:flex justify-between border-b pb-3 md:pb-0 mb-3'>
                {/* avatar */}
                <ProfileImage
                    isLoading={isLoading}
                    profileImage={user.avatar}
                />

                {/* details */}
                <ProfileDetails
                    name={user.name}
                    email={user.email}
                    created={user.created_at}
                />
            </div>

            {/* delete account option */}
            <DeleteAccount />
        </div>
    );
}

export default ProfileData;