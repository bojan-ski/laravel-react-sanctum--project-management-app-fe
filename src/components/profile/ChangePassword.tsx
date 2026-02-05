import { useState, type FormEvent, type JSX } from 'react';
import { useAppSelector } from '../../hooks/useRedux';
import { useThunk } from '../../hooks/useThunk';
import { useZodValidation } from '../../hooks/useZodValidation';
import { userChangePassword } from '../../features/user/userSlice';
import type { UserState } from '../../types/user';
import { changePasswordSchema, type ChangePasswordFormData } from '../../schemas/profileSchema';
import PageHeader from '../global/PageHeader';
import FormWrapper from '../form/FormWrapper';
import FormInput from '../form/FormInput';
import FormSubmitButton from '../form/FormSubmitButton';
import toast from 'react-hot-toast';

function ChangePassword(): JSX.Element {
    const { isLoading } = useAppSelector<UserState>(state => state.user);
    const { run } = useThunk(userChangePassword);
    const { validate, errors, setErrors } = useZodValidation<ChangePasswordFormData>();
    const [form, setForm] = useState<ChangePasswordFormData>({
        old_password: '',
        new_password: '',
        new_password_confirm: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleChangePasswordSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        const validation = validate(changePasswordSchema, form);        
        if (!validation) return;

        const thunkCall = await run(form);

        if (thunkCall.ok) {
            toast.success(thunkCall.data.message);

            setForm({
                old_password: '',
                new_password: '',
                new_password_confirm: '',
            });
            setErrors({});
        } else {
            toast.error(thunkCall.error.random || "Validation error");

            setErrors(thunkCall.error);
        }
    };

    return (
        <div className='change-password-option p-5 border border-yellow-500 rounded-lg'>
            
            <PageHeader label='Change password' headerCss='mb-3 text-lg sm:text-xl font-semibold' />

            <FormWrapper
                onSubmit={handleChangePasswordSubmit}
            >
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

                <FormSubmitButton
                    loading={isLoading}
                    btnCss='border rounded-sm text-xs sm:text-sm rounded-sm py-1.5 md:py-2 px-4 md:px-5 text-white bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer font-semibold'
                    btnLabel='Change password'
                />
            </FormWrapper>
        </div>
    );
}

export default ChangePassword;