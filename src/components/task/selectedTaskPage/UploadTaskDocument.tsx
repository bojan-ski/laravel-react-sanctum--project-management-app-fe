import { useState, type ChangeEvent, type FormEvent, type JSX } from 'react';
import { useAppSelector } from '../../../hooks/useRedux';
import { useThunk } from '../../../hooks/useThunk';
import { useZodValidation } from '../../../hooks/useZodValidation';
import { uploadTaskDocument } from '../../../features/regularUser/taskSlice';
import { taskDocumentSchema, type TaskDocumentFormData } from '../../../schemas/taskSchema';
import type { TaskState } from '../../../types/task';
import FormWrapper from '../../form/FormWrapper';
import FormInput from '../../form/FormInput';
import FormSubmitButton from '../../form/FormSubmitButton';
import toast from 'react-hot-toast';

function UploadTaskDocument({ taskId }: { taskId: number; }): JSX.Element {
    const { isLoading } = useAppSelector<TaskState>(state => state.tasks);
    const { run } = useThunk(uploadTaskDocument);
    const { validate, errors, setErrors } = useZodValidation<TaskDocumentFormData>();
    const [ file, setFile ] = useState<File | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => setFile(e.target.files?.[ 0 ] || null);

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        const validation = validate(taskDocumentSchema, { document: file });
        if (!validation) return;

        const thunkCall = await run({
            taskId: taskId,
            document: validation
        });

        if (thunkCall.ok) {
            toast.success("Document uploaded");

            setFile(null);
            setErrors({});
        } else {
            toast.error(thunkCall.error.random || "Upload Document Error");

            setErrors(thunkCall.error);
        }
    };

    return (
        <div className='p-4 border rounded-md mb-4'>
            <FormWrapper onSubmit={handleSubmit} formCss='flex items-top gap-4' >
                <FormInput
                    name='document_path'
                    type='file'
                    required={false}
                    onMutate={handleChange}
                    error={errors.document_path}
                />

                <FormSubmitButton
                    loading={isLoading}
                    btnCss="border rounded-sm text-xs sm:text-sm rounded-sm py-1.5 md:py-2 px-4 md:px-5 text-white bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer font-semibold"
                    btnLabel='Submit'
                />
            </FormWrapper>
        </div>
    );
}

export default UploadTaskDocument;