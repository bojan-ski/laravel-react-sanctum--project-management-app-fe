import { useState, type ChangeEvent, type FormEvent, type JSX } from 'react';
import { useZodValidation } from '../../hooks/useZodValidation';
import { projectSchema, type ProjectFormData } from '../../schemas/projectSchema';
import type { ProjectFormSubmitResult } from '../../types/project';
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
    onSubmit: (formData: ProjectFormData) => Promise<ProjectFormSubmitResult>;
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
    const { validate, errors, setErrors } = useZodValidation<ProjectFormData>();
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        deadline: initialData?.deadline?.slice(0, 10) || '',
    });
    const [file, setFile] = useState<File | null>(null);
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

        const rawFormData = { ...formData, document_path: file };
        const validation = validate(projectSchema, rawFormData);
        if (!validation) return;

        const result = await onSubmit({ ...formData, document_path: file });               

        if (result.status === 'success') {
            toast.success(result.message);

            setErrors({});
        }

        if (result.status === 'error') {
            toast.error(result.message || "Validation error");

            setErrors(result.errors ?? {});
        }
    };

    return (
        <div className="project-form my-10">
            <PageHeader
                label={headerLabel}
                headerCss='mb-7 text-center font-bold text-3xl md:text-4xl'
            />

            <div className="lg:w-1/2 mx-auto">
                <FormWrapper onSubmit={handleSubmit}>
                    <FormInput
                        name='title'
                        label='enter title *'
                        maxLength={64}
                        placeholder='max 64 characters'
                        required={true}
                        value={formData.title}
                        onMutate={handleChange}
                        divCss='mb-3'
                        error={errors.title}
                    />

                    <FormTextarea
                        name='description'
                        label='enter description *'
                        maxLength={3000}
                        placeholder='max 3000 characters'
                        required={true}
                        value={formData.description}
                        onMutate={handleChange}
                        divCss='mb-3'
                        textareaCss='h-72'
                        error={errors.description}
                    />

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

                    {showDocOptions && initialData?.document_path && (
                        <DocumentOptions
                            documentPath={initialData?.document_path}
                            projectId={initialData.id}
                            setShowDocOptions={setShowDocOptions}
                        />
                    )}

                    <FormInput
                        name='document_path'
                        type='file'
                        label='upload file'
                        required={false}
                        onMutate={handleChange}
                        divCss='mb-3'
                        error={errors.document_path}
                    />

                    <FormSubmitButton
                        loading={isLoading}
                        btnCss="border rounded-sm text-xs sm:text-sm rounded-sm py-1.5 md:py-2 px-4 md:px-5 text-white bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer font-semibold"
                        btnLabel={submitLabel}
                    />
                </FormWrapper>
            </div>
        </div>
    );
}
