import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { addUser } from '../../features/admin/usersSlice';
import type { NewUserFormData } from '../../types/types';
import FormInput from '../../components/form/FormInput';
import FormSubmitButton from '../../components/form/FormSubmitButton';
import FormWrapper from '../../components/form/FormWrapper';
import PageHeader from '../../components/global/PageHeader';
import toast from 'react-hot-toast';

function AddUser() {
    const { isLoading, errors } = useAppSelector(state => state.users);
    const dispatch = useAppDispatch();
    const [form, setForm] = useState<NewUserFormData>({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        const response = await dispatch(addUser(form));

        if (response.meta.requestStatus == 'fulfilled') {
            toast.success(response?.payload.message);
        }

        if (response.meta.requestStatus == 'rejected') {
            toast.error(response?.meta.requestStatus);
        }
    };

    return (
        <div className='add-user-page mt-20'>
            {/* Page header */}
            <PageHeader label='Add User' headerCss='mb-5 text-center text-4xl font-semibold' />

            {/* Create new user form */}
            <FormWrapper
                onSubmit={handleSubmit}
                formCss={'mx-auto lg:w-1/2'}
            >
                {/* name */}
                <FormInput
                    name='name'
                    label='Enter name *'
                    minLength={2}
                    maxLength={48}
                    placeholder='max 48 characters'
                    required={true}
                    value={form.name}
                    onMutate={handleChange}
                    divCss='mb-3'
                    error={errors?.name}
                />

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
                    error={errors?.email}
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
                    error={errors?.password}
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

export default AddUser;