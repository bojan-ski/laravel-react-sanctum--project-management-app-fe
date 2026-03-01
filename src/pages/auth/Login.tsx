import { useState, type FormEvent, type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useThunk } from '../../hooks/useThunk';
import { useZodValidation } from '../../hooks/useZodValidation';
import { loginUser } from '../../features/user/userSlice';
import { fetchUnreadCount } from '../../features/regularUser/notificationSlice';
import type { AuthState } from '../../types/auth';
import { loginSchema, type LoginFormData } from '../../schemas/authSchema';
import PageHeader from '../../components/global/PageHeader';
import FormWrapper from '../../components/form/FormWrapper';
import FormInput from '../../components/form/FormInput';
import FormSubmitButton from '../../components/form/FormSubmitButton';
import toast from 'react-hot-toast';

function Login(): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const { isLoading } = useAppSelector<AuthState>(state => state.user);
    const dispatch = useAppDispatch();
    const { run } = useThunk(loginUser);
    const { validate, errors, setErrors } = useZodValidation<LoginFormData>();
    const [ form, setForm ] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
        setForm({ ...form, [ e.target.name ]: e.target.value });

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        const validation = validate(loginSchema, form);
        if (!validation) return;

        const thunkCall = await run(form);

        if (thunkCall.ok) {
            toast.success(thunkCall.data.message);

            setForm({
                email: '',
                password: ''
            });
            setErrors({});

            dispatch(fetchUnreadCount());

            if (thunkCall.data.data[ 'is_admin' ]) {
                navigate('/admin/users');
            } else {
                navigate('/projects');
            }
        } else {
            toast.error(thunkCall.error.random || "LOGIN error");

            setErrors(thunkCall.error);
        }
    };

    return (
        <div className='login-page mt-20'>
            <PageHeader
                label='Login'
                headerCss='mb-5 text-center text-4xl font-semibold'
            />

            <FormWrapper
                onSubmit={handleSubmit}
                formCss={'mx-auto lg:w-1/2'}
            >
                <FormInput
                    name='email'
                    type='email'
                    label='Enter email *'
                    maxLength={64}
                    placeholder='your login email'
                    required={true}
                    value={form.email}
                    onMutate={handleChange}
                    divCss='mb-3'
                    error={errors.email}
                />

                <FormInput
                    name='password'
                    type='password'
                    label='Enter password *'
                    min={6}
                    placeholder='your login password'
                    required={true}
                    value={form.password}
                    onMutate={handleChange}
                    divCss='mb-3'
                    error={errors.password}
                />

                <FormSubmitButton
                    loading={isLoading}
                    btnCss='border rounded-sm py-2 px-5 text-white bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer font-semibold'
                    btnLabel='Login'
                />
            </FormWrapper>
        </div>
    );
}

export default Login;