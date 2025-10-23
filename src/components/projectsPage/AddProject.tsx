import { type ChangeEvent, type FormEvent, type JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { addNewProject, setNewProjectFormData } from '../../features/regularUser/createProjectSlice';
import type { NewProjectState } from '../../types/types';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "../ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from '../ui/button';
import FormWrapper from '../form/FormWrapper';
import FormInput from '../form/FormInput';
import FormTextarea from '../form/FormTextarea';
import FormSubmitButton from '../form/FormSubmitButton';
import toast from 'react-hot-toast';

function AddProject(): JSX.Element {
    const { isLoading, formData, errors } = useAppSelector<NewProjectState>(state => state.newProject);
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        dispatch(setNewProjectFormData({ ...formData, [e.target.name]: e.target.value }));
    };

    const handleAddUser = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        const result = await dispatch(addNewProject(formData));

        if (result.meta.requestStatus == 'fulfilled') {
            toast.success(result?.payload.message);

            // get all projects
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
                        Add Project
                    </DialogTitle>
                </VisuallyHidden>

                <FormWrapper
                    onSubmit={handleAddUser}
                >
                    {/* title */}
                    <FormInput
                        name='title'
                        label='enter title *'
                        minLength={3}
                        maxLength={64}
                        placeholder='max 64 characters'
                        required={true}
                        value={formData.title}
                        onMutate={handleChange}
                        divCss='mb-3'
                        error={errors?.title}
                    />

                    {/* description */}
                    <FormTextarea
                        name='description'
                        label='enter description *'
                        minLength={255}
                        maxLength={3000}
                        placeholder='max 3000 characters'
                        required={true}
                        value={formData.description}
                        onMutate={handleChange}
                        divCss='mb-3'
                        textareaCss='h-72'
                        error={errors?.description}
                    />

                    {/* deadline */}
                    <FormInput
                        name='deadline'
                        type='date'
                        label='select deadline *'
                        required={true}
                        value={formData.deadline}
                        onMutate={handleChange}
                        divCss='mb-3'
                        error={errors?.deadline}
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

export default AddProject;