import { useState, type ChangeEvent, type FormEvent, type JSX } from 'react';
import { useZodValidation } from '../../hooks/useZodValidation';
import { useThunk } from '../../hooks/useThunk';
import { uploadUserAvatar } from '../../features/user/userSlice';
import { imageSchema, type UploadAvatarFormData } from '../../schemas/profileSchema';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import FormWrapper from '../form/FormWrapper';
import FormImageInput from '../form/FormImageInput';
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

    const { run } = useThunk(uploadUserAvatar);
    const { validate, errors, setErrors } = useZodValidation<UploadAvatarFormData>();
    const [preview, setPreview] = useState<string | null>(
        profileImage && `${BASE_URL}/storage/${profileImage}`
    );
    const [avatar, setAvatar] = useState<File>();
    const displayedPreviewImage = preview || profileImage;

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];
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

        // zod validation
        const validation = validate(imageSchema, { avatar });
        if (!validation) return;

        // run dispatch call
        const thunkCall = await run({ avatar });

        // dispatch response
        if (thunkCall.ok) {
            toast.success(thunkCall.data.message);
        } else {
            toast.error(thunkCall.error.random || "Validation error");

            setErrors(thunkCall.error);
        }
    };

    return (
        <div className='user-profile-img mb-3'>
            <Dialog>
                <DialogTrigger className='font-semibold text-red-700 hover:text-red-900 cursor-pointer'>
                    {profileImage ? (
                        <img src={`${BASE_URL}/storage/${profileImage}`} className={'border-2 w-25 h-25 rounded-full object-cover'} />
                    ) : (
                        <User className={'border-2 w-25 h-25 rounded-full'} />
                    )}
                </DialogTrigger>

                <DialogContent
                    className="bg-white border-0"
                    aria-describedby={undefined}
                >
                    <DialogTitle className='text-center'>
                        Avatar must be less than 2MB
                    </DialogTitle>

                    <div className='mx-auto'>
                        {displayedPreviewImage ? (
                            <img
                                src={displayedPreviewImage}
                                className="border-2 w-50 h-50 rounded-full object-cover"
                            />
                        ) : (
                            <User className="border-2 w-50 h-50 rounded-full" />
                        )}
                    </div>

                    <FormWrapper
                        formCss='p-2 flex items-center gap-4'
                        onSubmit={handleUploadAvatarSubmit}
                    >
                        {/* avatar */}
                        <FormImageInput
                            name='avatar'
                            onMutate={handleChange}
                            required={true}
                            error={errors.avatar}
                        />

                        {/* submit */}
                        <FormSubmitButton
                            loading={isLoading}
                            btnCss='border rounded-sm py-2 px-5 text-white bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer font-semibold'
                            btnLabel='Upload avatar'
                        />
                    </FormWrapper>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ProfileImage;