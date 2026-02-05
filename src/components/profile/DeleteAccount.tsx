import { useState, type ChangeEvent, type FormEvent, type JSX } from 'react';
import { useThunk } from '../../hooks/useThunk';
import { useZodValidation } from '../../hooks/useZodValidation';
import { useNavigate, type NavigateFunction } from 'react-router';
import { deleteUserAccount } from '../../features/user/userSlice';
import { deleteAccountSchema, type DeleteAccountFormData } from '../../schemas/profileSchema';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "../ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import FormWrapper from '../form/FormWrapper';
import FormInput from '../form/FormInput';
import FormSubmitButton from '../form/FormSubmitButton';
import toast from 'react-hot-toast';

function DeleteAccount({ isLoading }: { isLoading: boolean; }): JSX.Element {
    const { run } = useThunk(deleteUserAccount);
    const { validate } = useZodValidation<DeleteAccountFormData>();
    const navigate: NavigateFunction = useNavigate();
    const [ password, setPassword ] = useState<string>('');

    const handleDeleteAccountSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        if (confirm('Are you sure you want to delete your account?')) {
            const validation = validate(deleteAccountSchema, { password });
            if (!validation) return;

            const thunkCall = await run(password);

            if (thunkCall.ok) {
                toast.success(thunkCall.data.message);

                navigate('/');
            } else {
                toast.error(thunkCall.error.random);
            }
        }
    };

    return (
        <div className='text-end'>
            <Dialog>
                <DialogTrigger className='font-bold text-red-700 hover:text-red-900 cursor-pointer'>
                    Delete account
                </DialogTrigger>

                <DialogContent
                    className="bg-white border-0"
                    aria-describedby={undefined}
                >
                    <VisuallyHidden>
                        <DialogTitle>
                            Delete user account
                        </DialogTitle>
                    </VisuallyHidden>

                    <FormWrapper
                        onSubmit={handleDeleteAccountSubmit}
                    >
                        <FormInput
                            name='password'
                            type='password'
                            label='Enter password *'
                            minLength={6}
                            placeholder='min 6 characters'
                            required={true}
                            value={password}
                            onMutate={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            divCss='mb-3'
                        />

                        <FormSubmitButton
                            loading={isLoading}
                            btnCss='border text-xs sm:text-sm rounded-sm py-1.5 md:py-2 px-4 md:px-5 text-white bg-red-700 hover:bg-red-900 transition cursor-pointer font-semibold'
                            btnLabel='Delete account'
                        />
                    </FormWrapper>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default DeleteAccount;