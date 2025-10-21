import { type JSX } from 'react';
import { useAppSelector } from '../../hooks/useRedux';
import ProfileImage from './ProfileImage';
import ProfileDetails from './ProfileDetails';

function ProfileData(): JSX.Element {
    const { user } = useAppSelector(state => state.user);
    
    return (
        <div className='user-profile-data p-5 border border-yellow-500 rounded-lg mb-5 md:mb-0'>
            <ProfileImage
                profileImage={user.avatar}
                imgCss="border-2 w-25 h-25 rounded-full object-cover"
                iconCss="border-2 w-25 h-25 rounded-full"
            />

            <ProfileDetails
                name={user.name}
                email={user.email}
                created={user.created_at}
            />
        </div>
    );
}

export default ProfileData;