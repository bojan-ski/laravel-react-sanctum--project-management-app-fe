import { type JSX } from 'react';
import { formatDate } from '../../utils/helpers';

type ProfileDetailsProps = {
    name: string;
    email: string;
    created: string;
};

function ProfileDetails({
    name,
    email,
    created
}: ProfileDetailsProps): JSX.Element {
    return (
        <div className="profile-details">
            <p className="mb-1">
                name: <span className='font-semibold'>{name}</span>
            </p>
            <p className="mb-1">
                email: <span className='font-semibold'>{email}</span>
            </p>
            <p className="">
                created: <span className='font-semibold'>{formatDate(created)}</span>
            </p>
        </div>
    );
}

export default ProfileDetails;