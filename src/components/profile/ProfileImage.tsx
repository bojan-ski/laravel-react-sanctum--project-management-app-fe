import { type JSX } from 'react';
import { User } from 'lucide-react';

type ProfileImageProps = {
    profileImage: string | null;
    imgCss?: string;
    iconCss?: string;
};

function ProfileImage({ profileImage, imgCss, iconCss }: ProfileImageProps): JSX.Element {
    return (
        <div className='user-profile-img mb-3'>
            {profileImage ? (
                <img src={profileImage} className={imgCss} />
            ) : (
                <User className={iconCss} />
            )}
        </div>
    );
}

export default ProfileImage;