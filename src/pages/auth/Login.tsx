import { useState, type FormEvent, type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { loginUser } from '../../features/user/userSlice';
import PageHeader from '../../components/global/PageHeader';
import FormWrapper from '../../components/form/FormWrapper';
import FormInput from '../../components/form/FormInput';
import FormSubmitButton from '../../components/form/FormSubmitButton';
import toast from 'react-hot-toast';

function Login(): JSX.Element {
    const { isLoading, errors } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const [form, setForm] = useState<{ email: string, password: string; }>({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        const result = await dispatch(loginUser(form));      

        if (result.meta.requestStatus == 'fulfilled') {
            toast.success(result?.payload.message);

            navigate('/projects');
        }

        if (result.meta.requestStatus == 'rejected') {
            toast.error(result.payload.random || result?.meta.requestStatus);
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
                    // type='email'
                    label='Enter email *'
                    // minLength={2}
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
                    // minLength={6}
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
                    btnLabel='Register'
                />
            </FormWrapper>
        </div>
    );
}

export default Login;