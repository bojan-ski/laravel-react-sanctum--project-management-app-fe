import { useRef, useState, type ChangeEvent, type FormEvent, type JSX } from 'react';
import { useRevalidator } from 'react-router';
import { useZodValidation } from '../../hooks/useZodValidation';
import { useThunk } from '../../hooks/useThunk';
import { updateUserAvatar } from '../../features/user/userSlice';
import { imageSchema, type UploadAvatarFormData } from '../../schemas/profileSchema';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import FormWrapper from '../form/FormWrapper';
import FormSubmitButton from '../form/FormSubmitButton';
import { User } from 'lucide-react';
import toast from 'react-hot-toast';

type ProfileImageProps = {
    isLoading: boolean;
    profileImage: string | null;
};

function ProfileImage({
    isLoading,
    profileImage
}: ProfileImageProps): JSX.Element {
    const BASE_URL = import.meta.env.VITE_API_URL;

    const { run } = useThunk(updateUserAvatar);
    const { validate, errors, setErrors } = useZodValidation<UploadAvatarFormData>();
    const revalidator = useRevalidator();

    const [ preview, setPreview ] = useState<string | null>(
        profileImage && `${BASE_URL}/storage/${profileImage}`
    );
    const [ avatar, setAvatar ] = useState<File | null>(null);

    const displayedPreviewImage = preview || profileImage;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = (): void => {
        fileInputRef.current?.click();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[ 0 ];
        if (!file) return;

        setAvatar(file);

        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleUploadAvatarSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        if (!avatar) {
            toast.error("Image required");
            return;
        }

        const validation = validate(imageSchema, { avatar });
        if (!validation) return;

        const thunkCall = await run(avatar);

        if (thunkCall.ok) {
            toast.success(thunkCall.data.message);

            revalidator.revalidate();
        } else {
            toast.error(thunkCall.error.random || "AVATAR error");

            setErrors(thunkCall.error);
        }
    };

    return (
        <div className='user-profile-img mb-3'>
            <Dialog>
                <DialogTrigger className='font-semibold cursor-pointer'>
                    {profileImage ? (
                        <img src={`${BASE_URL}${profileImage}`} className={'border-2 w-30 md:w-40 h-30 md:h-40 rounded-full object-cover'} />
                    ) : (
                        <User className={'border-2 w-30 h-30 rounded-full'} />
                    )}
                </DialogTrigger>

                <DialogContent
                    className="bg-white border-0"
                    aria-describedby={undefined}
                >
                    <DialogTitle className='text-center text-base md:text-lg'>
                        Max size 2MB
                    </DialogTitle>

                    <div
                        className='mx-auto cursor-pointer group'
                        onClick={handleImageClick}
                    >
                        {displayedPreviewImage ? (
                            <img
                                src={displayedPreviewImage}
                                className="border-2 w-50 h-50 md:w-60 md:h-60 rounded-full object-cover group-hover:opacity-80 transition"
                            />
                        ) : (
                            <User className="border-2 w-50 h-50 md:w-60 md:h-60 rounded-full group-hover:opacity-80 transition" />
                        )}
                    </div>

                    {errors.avatar && (
                        <p className="text-red-500 text-xs md:text-sm text-center">{errors.avatar}</p>
                    )}

                    <FormWrapper
                        formCss='text-center'
                        onSubmit={handleUploadAvatarSubmit}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={handleChange}
                            className="hidden"
                        />

                        <FormSubmitButton
                            loading={isLoading}
                            btnCss='border text-xs sm:text-sm rounded-sm py-1.5 md:py-2 px-4 md:px-6 text-white bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer font-semibold'
                            btnLabel='Update'
                        />
                    </FormWrapper>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ProfileImage;