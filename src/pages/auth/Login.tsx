import { useState, type FormEvent, type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppSelector } from '../../hooks/useRedux';
import { useThunk } from '../../hooks/useThunk';
import { useZodValidation } from '../../hooks/useZodValidation';
import { loginUser } from '../../features/user/userSlice';
import type { UserState } from '../../types/types';
import { loginSchema, type LoginFormData } from '../../schemas/authSchema';
import PageHeader from '../../components/global/PageHeader';
import FormWrapper from '../../components/form/FormWrapper';
import FormInput from '../../components/form/FormInput';
import FormSubmitButton from '../../components/form/FormSubmitButton';
import toast from 'react-hot-toast';

function Login(): JSX.Element {
    const { isLoading } = useAppSelector<UserState>(state => state.user);
    const { run } = useThunk(loginUser);
    const { validate, errors, setErrors } = useZodValidation<LoginFormData>();
    const navigate: NavigateFunction = useNavigate();
    const [form, setForm] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        // zod validation
        const validation = validate(loginSchema, form);
        if (!validation) return;

        // run dispatch call
        const thunkCall = await run(form);

        // dispatch response
        if (thunkCall.ok) {
            toast.success(thunkCall.data.message);

            setForm({
                email: '',
                password: ''
            });
            setErrors({});

            // redirect user
            if (thunkCall.data.data.role == 'user') {
                navigate('/projects');
            } else {
                navigate('/users');
            }
        } else {
            toast.error(thunkCall.error.random || "Validation error");

            setErrors(thunkCall.error);
        }
    };

    return (
        <div className='login-page mt-20'>
            {/* Page header */}
            <PageHeader
                label='Login'
                headerCss='mb-5 text-center text-4xl font-semibold'
            />

            {/* Login form */}
            <FormWrapper
                onSubmit={handleSubmit}
                formCss={'mx-auto lg:w-1/2'}
            >
                {/* email */}
                <FormInput
                    name='email'
                    type='email'
                    label='Enter email *'
                    minLength={2}
                    maxLength={48}
                    placeholder='max 48 characters'
                    required={true}
                    value={form.email}
                    onMutate={handleChange}
                    divCss='mb-3'
                    error={errors.email}
                />

                {/* password */}
                <FormInput
                    name='password'
                    type='password'
                    label='Enter password *'
                    minLength={6}
                    placeholder='min 6 characters'
                    required={true}
                    value={form.password}
                    onMutate={handleChange}
                    divCss='mb-3'
                    error={errors.password}
                />

                {/* submit */}
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