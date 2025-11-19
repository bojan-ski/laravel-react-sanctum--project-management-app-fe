import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useAppSelector } from '../../hooks/useRedux';
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

function DeleteAccount() {
    const { isLoading } = useAppSelector(state => state.user);
    const { run } = useThunk(deleteUserAccount);
    const { validate } = useZodValidation<DeleteAccountFormData>();
    const navigate: NavigateFunction = useNavigate();
    const [password, setPassword] = useState<string>('');

    const handleDeleteAccountSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        if (confirm('Are you sure?')) {
            // zod validation
            const validation = validate(deleteAccountSchema, { password });        
            if (!validation) return;

            // run dispatch call
            const thunkCall = await run(password);

            // dispatch response
            if (thunkCall.ok) {
                toast.success(thunkCall.data.message);

                navigate('/');
            } else {
                toast.error(thunkCall.error.random);
            }
        }
    };

    return (
        <Dialog>
            <DialogTrigger className='font-semibold text-red-700 hover:text-red-900 cursor-pointer'>
                Delete account
            </DialogTrigger>

            <DialogContent
                className="bg-white border-0"
                aria-describedby={undefined}
            >
                <VisuallyHidden>
                    <DialogTitle>
                        Add User
                    </DialogTitle>
                </VisuallyHidden>

                <FormWrapper
                    onSubmit={handleDeleteAccountSubmit}
                >
                    {/* password */}
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

                    {/* submit */}
                    <FormSubmitButton
                        loading={isLoading}
                        btnCss='border rounded-sm py-2 px-5 text-white bg-red-700 hover:bg-red-900 transition cursor-pointer font-semibold'
                        btnLabel='Delete account'
                    />
                </FormWrapper>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteAccount;