import { useState, type ChangeEvent, type FormEvent, type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { createNewProject, getUserProjects } from '../../features/regularUser/projectSlice';
import type { ProjectState } from '../../types/types';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "../ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from '../ui/button';
import FormWrapper from '../form/FormWrapper';
import FormInput from '../form/FormInput';
import FormTextarea from '../form/FormTextarea';
import FormSubmitButton from '../form/FormSubmitButton';
import toast from 'react-hot-toast';

function AddProject(): JSX.Element {
    const { isLoading } = useAppSelector<ProjectState>(state => state.project);
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const [formData, setFormData] = useState<{
        title: string;
        description: string;
        deadline: string;
    }>({
        title: '',
        description: '',
        deadline: ''
    });
    const [file, setFile] = useState<File | null>(null);
    const [errors, setErrors] = useState({
        title: '',
        description: '',
        deadline: '',
        document_path: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, type, files, value } = e.target;

        if (type === 'file') {
            setFile(files?.[0] || null);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddNewProject = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        const result = await dispatch(createNewProject({ ...formData, document_path: file }));

        if (result.meta.requestStatus == 'fulfilled') {
            toast.success(result?.payload.message);

            setErrors({
                title: '',
                description: '',
                deadline: '',
                document_path: ''
            });

            dispatch(getUserProjects({}));
            navigate('/projects');
        }

        if (result.meta.requestStatus == 'rejected') {
            setErrors(result.payload);

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
                    onSubmit={handleAddNewProject}
                >
                    {/* title */}
                    <FormInput
                        name='title'
                        label='enter title *'
                        minLength={3}
                        maxLength={64}
                        placeholder='min 2, max 64 characters'
                        required={true}
                        value={formData.title}
                        onMutate={handleChange}
                        divCss='mb-3'
                        error={errors.title}
                    />

                    {/* description */}
                    <FormTextarea
                        name='description'
                        label='enter description *'
                        minLength={10}
                        maxLength={3000}
                        placeholder='min 10, max 3000 characters'
                        required={true}
                        value={formData.description}
                        onMutate={handleChange}
                        divCss='mb-3'
                        textareaCss='h-72'
                        error={errors.description}
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
                        error={errors.deadline}
                    />

                    {/* document */}
                    <FormInput
                        name='document_path'
                        type='file'
                        label='upload file'
                        required={false}
                        onMutate={handleChange}
                        divCss='mb-3'
                        error={errors.document_path}
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