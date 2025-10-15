import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { type NavigateFunction, useNavigate } from 'react-router';
import { createUser } from '../../../services/admin';
import FormInput from '../../form/FormInput';
import FormSubmitButton from '../../form/FormSubmitButton';
import FormWrapper from '../../form/FormWrapper';
import PageHeader from '../../global/PageHeader';

function AddUser() {
    const navigate: NavigateFunction = useNavigate();
    const [form, setForm] = useState<{
        name: string,
        email: string,
        password: string,
    }>({
        name: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        try {
            // api call
            const response = await createUser(
                form.name,
                form.email,
                form.password,
            );

            console.log(response);
            

            // display toast message
            toast.success(response?.message);

            // navigate user
            navigate('/users');
        } catch (error: any) {
            if (error.response?.status === 422) {
                const fieldErrors = error?.response?.data?.errors;
                const formattedErrors: Record<string, string> = {};

                Object.keys(fieldErrors).forEach((key) => {
                    formattedErrors[key] = fieldErrors[key][0];
                });

                setErrors(formattedErrors);
            } else {
                toast.error(error?.message || 'Error!');
            }
        }
    };

    return (
        <section className='add-user border'>
            {/* Page header */}
            <PageHeader label='Add User' headerCss='mb-5 text-center text-4xl font-semibold' />

            {/* Create account form */}
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
                    error={errors.name}
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
        </section>
    );
}

export default AddUser;