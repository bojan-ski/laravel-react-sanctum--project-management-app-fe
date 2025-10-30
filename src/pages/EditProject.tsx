import { useState, type ChangeEvent, type FormEvent, type JSX } from 'react';
import { useLoaderData, useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { updateUserProject } from '../features/regularUser/projectSlice';
import { deleteProjectDocument, getProjectDetails } from '../services/project';
import type { ProjectState } from '../types/types';
import PageHeader from '../components/global/PageHeader';
import FormWrapper from '../components/form/FormWrapper';
import FormInput from '../components/form/FormInput';
import FormTextarea from '../components/form/FormTextarea';
import FormSubmitButton from '../components/form/FormSubmitButton';
import toast from 'react-hot-toast';

// loader
export const loader = async ({ params }: { params: any; }): Promise<any> => {
    const projectDetails: any = await getProjectDetails(params.id);

    return projectDetails;
};

function EditProject(): JSX.Element {
    const { isLoading, filterOwnership, filterStatus, currentPage } = useAppSelector<ProjectState>(state => state.project);
    const dispatch = useAppDispatch();
    const { data } = useLoaderData();
    const navigate: NavigateFunction = useNavigate();

    const [formData, setFormData] = useState<{
        title: string,
        description: string,
        deadline: string;
    }>({
        title: data.title,
        description: data.description,
        deadline: data.deadline
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

    const handleUpdateProject = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        const result = await dispatch(updateUserProject({ projectId: data.id, updateProjectFormData: { ...formData, document_path: file } }));

        if (result.meta.requestStatus == 'fulfilled') {
            toast.success(result?.payload.message);

            setErrors({
                title: '',
                description: '',
                deadline: '',
                document_path: ''
            });

            navigate(`/projects?ownership=${filterOwnership}&status=${filterStatus}&page=${currentPage}`);
        }

        if (result.meta.requestStatus == 'rejected') {
            setErrors(result.payload);

            toast.error(result.payload.random || result?.meta.requestStatus);
        }
    };

    return (
        <div className='edit-project-page my-10'>

            <PageHeader
                label='Edit project'
                headerCss='mb-7 text-center font-bold text-4xl'
            />

            <div className='lg:w-1/2 mx-auto'>
                <FormWrapper
                    onSubmit={handleUpdateProject}
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
                        error={errors?.title}
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
                        error={errors?.description}
                    />

                    {/* deadline */}
                    <FormInput
                        name='deadline'
                        type='date'
                        label='select deadline *'
                        required={true}
                        value={formData.deadline.slice(0, 10)}
                        onMutate={handleChange}
                        divCss='mb-3'
                        error={errors?.deadline}
                    />

                    {data.document_path && (
                        <div className='mb-3 text-end'>
                            <p className="text-sm font-semibold">
                                Available documentation:
                            </p>

                            <div className='flex items-center justify-end gap-4 text-sm font-semibold'>
                                <button
                                    type='button'
                                    className="text-blue-500 hover:underline"
                                    onClick={async () => {
                                        try {
                                            const response = await fetch(data.document_path);
                                            const blob = await response.blob();
                                            const url = window.URL.createObjectURL(blob);
                                            const a = document.createElement("a");
                                            a.href = url;
                                            a.download = data.document_path.split("/").pop();
                                            a.click();
                                            window.URL.revokeObjectURL(url);
                                        } catch (error) {
                                            console.error("Error downloading file:", error);
                                        }
                                    }}
                                >
                                    Download
                                </button>

                                <button
                                    type='button'
                                    className="text-red-500 hover:underline"
                                    onClick={async () => {
                                        try {
                                            const response = await deleteProjectDocument(data.id);
                                            console.log(response);

                                        } catch (error) {
                                            console.error(error);
                                        }
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}

                    {/* document */}
                    <FormInput
                        name='document_path'
                        type='file'
                        label='upload file'
                        required={false}
                        onMutate={handleChange}
                        divCss='mb-3'
                        error={errors?.document_path}
                    />

                    {/* submit */}
                    <FormSubmitButton
                        loading={isLoading}
                        btnCss='border rounded-sm py-2 px-5 text-white bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer font-semibold'
                        btnLabel='Update Project'
                    />
                </FormWrapper>
            </div>
        </div>
    );
}

export default EditProject;