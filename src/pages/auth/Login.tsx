import { useState, type FormEvent, type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { login } from '../../services/auth';
import { useAppDispatch } from '../../hooks/useRedux';
import { setUserData } from '../../features/user/userSlice';
import PageHeader from '../../components/global/PageHeader';
import FormWrapper from '../../components/form/FormWrapper';
import FormInput from '../../components/form/FormInput';
import FormSubmitButton from '../../components/form/FormSubmitButton';
import toast from 'react-hot-toast';

function Login(): JSX.Element {
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const [form, setForm] = useState<{ email: string, password: string; }>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        try {
            // api call
            const response = await login(
                form.email,
                form.password,
            );

            // userSlice call
            dispatch(setUserData(response.data));

            // display toast message
            toast.success(response.message);

            // navigate user
            navigate('/projects');
        } catch (error: any) {
            if (error.response?.status === 422) {
                const fieldErrors = error?.response?.data?.errors;
                const formattedErrors: Record<string, string> = {};

                Object.keys(fieldErrors).forEach((key) => {
                    formattedErrors[key] = fieldErrors[key][0];
                });

                setErrors(formattedErrors);
            } else {
                toast.error(error?.response?.data?.message || 'Error!');
            }
        }
    };

    return (
        <div className='login-page mt-20'>

            {/* Page header */}
            <PageHeader label='Login' headerCss='mb-5 text-center text-4xl font-semibold' />

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
                    btnCss='border rounded-sm py-2 px-5 text-white bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer font-semibold'
                    btnLabel='Register'
                />
            </FormWrapper>
        </div>
    );
}

export default Login;