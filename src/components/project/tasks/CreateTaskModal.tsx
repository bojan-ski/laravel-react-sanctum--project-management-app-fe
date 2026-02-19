import { useState, type ChangeEvent, type FormEvent, type JSX } from 'react';
import { useAppSelector } from '../../../hooks/useRedux';
import { useThunk } from '../../../hooks/useThunk';
import { useZodValidation } from '../../../hooks/useZodValidation';
import { createNewTask } from '../../../features/regularUser/taskSlice';
import { taskSchema, type TaskFormData, type TaskPriority } from '../../../schemas/taskSchema';
import type { TaskState } from '../../../types/task';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogHeader,
    DialogDescription
} from "../../ui/dialog";
import { Button } from '../../ui/button';
import FormWrapper from '../../form/FormWrapper';
import FormInput from '../../form/FormInput';
import FormTextarea from '../../form/FormTextarea';
import FormSelect from '../../form/FormSelect';
import FormSubmitButton from '../../form/FormSubmitButton';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

function CreateTaskModal({ projectId }: { projectId: number; }): JSX.Element {
    const { isLoading } = useAppSelector<TaskState>(state => state.tasks);
    const { members } = useAppSelector(state => state.projectMembers);
    const { run } = useThunk(createNewTask);
    const { validate, errors, setErrors } = useZodValidation<TaskFormData>();
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const [ formData, setFormData ] = useState<TaskFormData>({
        assigned_to: 0,
        title: '',
        description: '',
        priority: 'medium',
        due_date: '',
    });
    const priorityOptions: TaskPriority[] = [ 'low', 'medium', 'high', 'critical' ];
    const memberOptions = members.reduce((acc, member) => {
        if(!member.is_owner){
            acc[ member.id ] = `${member.name} (${member.email})`;    
        }

        return acc;
    }, {} as Record<number, string>) as any;

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setFormData({ ...formData, [ e.target.name ]: e.target.value });
    };

    const handleSelectChange = (name: string, value: string): void => {
        setFormData({ ...formData, [ name ]: value });
    };

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        const validationData = {
            ...formData,
            assigned_to: Number(formData.assigned_to)
        };

        const validation = validate(taskSchema, validationData);
        if (!validation) return;

        const thunkCall = await run({
            projectId,
            taskData: validationData
        });

        if (thunkCall.ok) {
            toast.success(thunkCall.data.message);

            setFormData({
                assigned_to: 0,
                title: '',
                description: '',
                priority: 'medium',
                due_date: '',
            });
            setErrors({});
            setIsOpen(false);
        } else {
            toast.error(thunkCall.error.random || "Create Task Error");

            setErrors(thunkCall.error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className='bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer'>
                    <Plus />
                    <span className='hidden sm:block'>New Task</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-white border-0 max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className='text-base md:text-lg'>
                        Create New Task
                    </DialogTitle>
                    <DialogDescription className='text-xs md:text-sm'>
                        Assign a new task to a project member
                    </DialogDescription>
                </DialogHeader>

                <FormWrapper onSubmit={handleSubmit}>
                    <FormSelect
                        name='assigned_to'
                        label='Assign to *'
                        defaultValue={String(formData.assigned_to)}
                        options={memberOptions}
                        disabledOptionLabel='Select a member'
                        required={true}
                        onMutate={(value) => handleSelectChange('assigned_to', value)}
                        divCss='mb-3'
                        error={errors.assigned_to}
                    />

                    <FormInput
                        name='title'
                        label='Task title *'
                        minLength={3}
                        maxLength={64}
                        placeholder='e.g., Design homepage mockup'
                        required={true}
                        value={formData.title}
                        onMutate={handleChange}
                        divCss='mb-3'
                        error={errors.title}
                    />

                    <FormTextarea
                        name='description'
                        label='Task description *'
                        minLength={200}
                        maxLength={1500}
                        placeholder='Describe the task in detail...'
                        required={true}
                        value={formData.description}
                        onMutate={handleChange}
                        divCss='mb-3'
                        textareaCss='h-32'
                        error={errors.description}
                    />

                    <FormSelect
                        name='priority'
                        label='Priority *'
                        defaultValue={formData.priority}
                        options={priorityOptions}
                        required={true}
                        onMutate={(value) => handleSelectChange('priority', value)}
                        divCss='mb-3'
                        error={errors.priority}
                    />

                    <FormInput
                        name='due_date'
                        type='date'
                        label='Due date *'
                        required={true}
                        value={formData.due_date}
                        onMutate={handleChange}
                        divCss='mb-3'
                        error={errors.due_date}
                    />

                    <div className="flex justify-end gap-3 mt-4">
                        <Button
                            type='button'
                            variant="outline"
                            className='text-xs sm:text-sm'
                            onClick={() => setIsOpen(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>

                        <FormSubmitButton
                            loading={isLoading}
                            btnCss="text-xs sm:text-sm bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer text-white"
                            btnLabel='Create Task'
                        />
                    </div>
                </FormWrapper>
            </DialogContent>
        </Dialog>
    );
}

export default CreateTaskModal;