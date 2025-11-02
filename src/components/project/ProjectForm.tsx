import { useState, type ChangeEvent, type FormEvent, type JSX } from 'react';
import type { ProjectFormData, ProjectFormSubmit } from '../../types/types';
import type z from 'zod';
import { projectSchema } from '../../schemas/projectSchema';
import PageHeader from '../global/PageHeader';
import FormWrapper from '../form/FormWrapper';
import FormInput from '../form/FormInput';
import FormTextarea from '../form/FormTextarea';
import DocumentOptions from '../document/DocumentOptions';
import FormSubmitButton from '../form/FormSubmitButton';
import toast from 'react-hot-toast';

type ProjectFormProps = {
    initialData?: {
        id: number;
        title: string;
        description: string;
        deadline: string;
        document_path?: string | null;
    };
    isLoading: boolean;
    onSubmit: (formData: ProjectFormData) => Promise<ProjectFormSubmit>;
    submitLabel: string;
    headerLabel: string;
    showExistingFile?: boolean;
};

export default function ProjectForm({
    initialData,
    isLoading,
    onSubmit,
    submitLabel,
    headerLabel,
    showExistingFile = false,
}: ProjectFormProps): JSX.Element {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        deadline: initialData?.deadline?.slice(0, 10) || '',
    });
    const [file, setFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showDocOptions, setShowDocOptions] = useState<boolean>(showExistingFile);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, type, files, value } = e.target;

        if (type === 'file') {
            setFile(files?.[0] || null);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        // zod validation
        const rawFormData = { ...formData, document_path: file };
        const validation = projectSchema.safeParse(rawFormData);

        if (!validation.success) {
            const zodErrors: Record<string, string> = {};

            validation.error.issues.forEach((err: z.ZodIssue) => {
                if (err.path[0]) zodErrors[err.path[0].toString()] = err.message;
            });

            setErrors(zodErrors);

            toast.error('Validation error!');

            return;
        }

        // run dispatch call
        const result = await onSubmit({ ...formData, document_path: file });

        // toast response
        if (result.status === 'fulfilled') {
            toast.success(result.message);

            setErrors({});
        }

        if (result.status === 'rejected') {
            toast.error(result.message);

            setErrors(result.errors);
        }
    };

    return (
        <div className="project-form my-10">
            {/* Page header */}
            <PageHeader
                label={headerLabel}
                headerCss='mb-7 text-center font-bold text-4xl'
            />

            {/* Form - form wrapper */}
            <div className="lg:w-1/2 mx-auto">
                <FormWrapper onSubmit={handleSubmit}>
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

                    {/* if document, show document options */}
                    {showDocOptions && initialData?.document_path && (
                        <DocumentOptions
                            documentPath={initialData?.document_path}
                            projectId={initialData.id}
                            setShowDocOptions={setShowDocOptions}
                        />
                    )}

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
                        btnCss="border rounded-sm py-2 px-5 text-white bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer font-semibold"
                        btnLabel={submitLabel}
                    />
                </FormWrapper>
            </div>
        </div>
    );
}
