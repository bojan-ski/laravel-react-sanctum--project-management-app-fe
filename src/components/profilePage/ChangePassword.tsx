import { useState, type FormEvent, type JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { userChangePassword } from '../../features/regularUser/profileSlice';
import type { ProfileState } from '../../types/types';
import PageHeader from '../global/PageHeader';
import FormWrapper from '../form/FormWrapper';
import FormInput from '../form/FormInput';
import FormSubmitButton from '../form/FormSubmitButton';
import toast from 'react-hot-toast';

function ChangePassword(): JSX.Element {
    const { isLoading, errors } = useAppSelector<ProfileState>(state => state.profile);
    const dispatch = useAppDispatch();

    const [form, setForm] = useState<{
        old_password: string,
        new_password: string;
        new_password_confirm: string;
    }>({
        old_password: '',
        new_password: '',
        new_password_confirm: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleChangePasswordSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        const result = await dispatch(userChangePassword(form));

        if (result.meta.requestStatus == 'fulfilled') {
            toast.success(result?.payload.message);

            setForm({
                old_password: '',
                new_password: '',
                new_password_confirm: '',
            });
        }

        if (result.meta.requestStatus == 'rejected') {
            toast.error(result.payload.random || result?.meta.requestStatus);
        }
    };

    return (
        <div className='change-password-option p-5 border border-yellow-500 rounded-lg'>
            {/* Page header */}
            <PageHeader label='Change password' headerCss='mb-5 text-xl font-semibold' />

            <FormWrapper
                onSubmit={handleChangePasswordSubmit}
            >
                {/* old password */}
                <FormInput
                    name='old_password'
                    type='password'
                    label='Enter old password *'
                    minLength={6}
                    placeholder='min 6 characters'
                    required={true}
                    value={form.old_password}
                    onMutate={handleChange}
                    divCss='mb-3'
                    error={errors.old_password}
                />

                {/* new password */}
                <FormInput
                    name='new_password'
                    type='password'
                    label='Enter new password *'
                    minLength={6}
                    placeholder='min 6 characters'
                    required={true}
                    value={form.new_password}
                    onMutate={handleChange}
                    divCss='mb-3'
                    error={errors.new_password}
                />

                {/* new password confirm */}
                <FormInput
                    name='new_password_confirm'
                    type='password'
                    label='Confirm new password *'
                    minLength={6}
                    placeholder='min 6 characters'
                    required={true}
                    value={form.new_password_confirm}
                    onMutate={handleChange}
                    divCss='mb-3'
                    error={errors.new_password_confirm}
                />

                {/* submit */}
                <FormSubmitButton
                    loading={isLoading}
                    btnCss='border rounded-sm py-2 px-5 text-white bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer font-semibold'
                    btnLabel='Change password'
                />
            </FormWrapper>
        </div>
    );
}

export default ChangePassword;