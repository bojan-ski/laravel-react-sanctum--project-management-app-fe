import { useState, type ChangeEvent, type FormEvent, type JSX } from 'react';
import { useAppSelector } from '../../../hooks/useRedux';
import { useThunk } from '../../../hooks/useThunk';
import { useZodValidation } from '../../../hooks/useZodValidation';
import { addNewUser } from '../../../features/adminUser/usersSlice';
import { addUserSchema, type AddUserFormData } from '../../../schemas/admin/userSchema';
import type { UsersState } from '../../../types/admin';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "../../../components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import FormWrapper from '../../form/FormWrapper';
import FormInput from '../../form/FormInput';
import FormSubmitButton from '../../form/FormSubmitButton';
import { Button } from '../../ui/button';
import { UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

function AddUser(): JSX.Element {
    const { isLoading } = useAppSelector<UsersState>(state => state.users);
    const { run } = useThunk(addNewUser);
    const { validate, errors, setErrors } = useZodValidation<AddUserFormData>();
    const [ openModal, setModalOpen ] = useState<boolean>(false);
    const [ formData, setFormData ] = useState<AddUserFormData>({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setFormData({ ...formData, [ e.target.name ]: e.target.value });
    };

    const handleAddUser = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        const validation = validate(addUserSchema, formData);
        if (!validation) return;

        const thunkCall = await run(validation);

        if (thunkCall.ok) {
            toast.success(thunkCall.data.message);

            setFormData({
                name: '',
                email: '',
                password: ''
            });
            setErrors({});
            setModalOpen(false);
        } else {
            toast.error(thunkCall.error.random || "Add User Error");

            setErrors(thunkCall.error);
        }
    };

    return (
        <div className='text-end'>
            <Dialog open={openModal} onOpenChange={setModalOpen}>
                <DialogTrigger asChild>
                    <Button
                        className='bg-yellow-500 hover:bg-yellow-600 w-max text-xs sm:text-sm cursor-pointer'
                    >
                        <UserPlus />
                        <span>User</span>
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

                        <FormSubmitButton
                            loading={isLoading}
                            btnCss='border rounded-sm text-xs sm:text-sm rounded-sm py-1.5 md:py-2 px-4 md:px-5 text-white bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer font-semibold'
                            btnLabel='Add User'
                        />
                    </FormWrapper>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddUser;