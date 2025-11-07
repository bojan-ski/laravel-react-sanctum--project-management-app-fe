import { type ChangeEvent, type FormEvent, type JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { getAllUsers } from '../../../features/adminUser/usersSlice';
import { addNewUser, setFormData } from '../../../features/adminUser/createUserSlice';
import type { NewUserState } from '../../../types/types';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "../../../components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from '../../ui/button';
import FormWrapper from '../../form/FormWrapper';
import FormInput from '../../form/FormInput';
import FormSubmitButton from '../../form/FormSubmitButton';
import toast from 'react-hot-toast';

type AddUserProps = {
    search: string;
    currentPage: number;
};

function AddUser({ search, currentPage }: AddUserProps): JSX.Element {
    const { isLoading, formData, errors } = useAppSelector<NewUserState>(state => state.newUser);
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        dispatch(setFormData({ ...formData, [e.target.name]: e.target.value }));
    };

    const handleAddUser = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        const result = await dispatch(addNewUser(formData));

        if (result.meta.requestStatus == 'fulfilled') {
            toast.success(result?.payload.message);

            dispatch(getAllUsers({ search: search, page: currentPage }));
        }

        if (result.meta.requestStatus == 'rejected') {
            toast.error(result.payload.random || result?.meta.requestStatus);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='cursor-pointer hover:text-yellow-500'>
                    +
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-white border-0" aria-describedby={undefined}>
                <VisuallyHidden>
                    <DialogTitle>
                        Add User
                    </DialogTitle>
                </VisuallyHidden>

                <FormWrapper
                    onSubmit={handleAddUser}
                >
                    {/* name */}
                    <FormInput
                        name='name'
                        label='Enter name *'
                        minLength={2}
                        maxLength={48}
                        placeholder='max 48 characters'
                        required={true}
                        value={formData.name}
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
                        value={formData.email}
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
                        value={formData.password}
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
            </DialogContent>
        </Dialog>
    );
}

export default AddUser;