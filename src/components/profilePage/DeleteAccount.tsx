import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useNavigate, type NavigateFunction } from 'react-router';
import { deleteUserAccount } from '../../features/user/userSlice';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "../ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import FormWrapper from '../form/FormWrapper';
import FormInput from '../form/FormInput';
import FormSubmitButton from '../form/FormSubmitButton';
import toast from 'react-hot-toast';

function DeleteAccount() {
    const { isLoading } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const [password, setPassword] = useState<string>('');

    const handleDeleteAccountSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        if (confirm('Are you sure?')) {
            const response = await dispatch(deleteUserAccount(password));        

            if (response.meta.requestStatus == 'fulfilled') {
                toast.success(response?.payload.message);

                navigate('/');
            }

            if (response.meta.requestStatus == 'rejected') {
                toast.error(response.payload.random || response?.meta.requestStatus);
            }
        }
    };

    return (
        <Dialog>
            <DialogTrigger className='font-semibold text-red-700 hover:text-red-900 cursor-pointer'>
                Delete account
            </DialogTrigger>

            <DialogContent className="bg-white border-0" aria-describedby={undefined}>
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