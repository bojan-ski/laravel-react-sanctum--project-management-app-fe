import { useState, type ChangeEvent, type FormEvent, type JSX } from 'react';
import { useThunk } from '../../../hooks/useThunk';
import { useZodValidation } from '../../../hooks/useZodValidation';
import { sendTaskMessage } from '../../../features/regularUser/messageSlice';
import { messageSchema, type TaskMessageFormData } from '../../../schemas/messageSchema';
import FormWrapper from '../../form/FormWrapper';
import FormInput from '../../form/FormInput';
import FormSubmitButton from '../../form/FormSubmitButton';
import toast from 'react-hot-toast';

type SendTaskMessageFormProps = {
    isLoading: boolean;
    taskId: number;
};

function SendTaskMessageForm({
    isLoading,
    taskId
}: SendTaskMessageFormProps): JSX.Element {
    const { run } = useThunk(sendTaskMessage);
    const { validate, errors, setErrors } = useZodValidation<TaskMessageFormData>();
    const [ messageText, setMessageText ] = useState<string>('');

    const handleSendMessageSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        const validation = validate(messageSchema, { message: messageText });
        if (!validation) return;

        const thunkCall = await run({ taskId, message: messageText.trim() });

        if (thunkCall.ok) {
            toast.success(thunkCall.data.message);

            setMessageText('');
            setErrors({});
        } else {
            toast.error(thunkCall.error.random || "Send Message Error");

            setErrors(thunkCall.error);
        }
    };

    return (
        <FormWrapper
            onSubmit={handleSendMessageSubmit}
            formCss='flex items-center gap-2'
        >
            <FormInput
                name='message'
                maxLength={255}
                placeholder='max 255 characters'
                required={true}
                value={messageText}
                onMutate={(e: ChangeEvent<HTMLInputElement>) => setMessageText(e.target.value)}
                error={errors.message}
                divCss='w-full'
            />

            <FormSubmitButton
                loading={isLoading}
                btnCss='border rounded-sm text-xs sm:text-sm rounded-sm py-1.5 md:py-2 px-4 md:px-5 text-white bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer font-semibold'
                btnLabel='Send'
            />
        </FormWrapper>
    );
}

export default SendTaskMessageForm;