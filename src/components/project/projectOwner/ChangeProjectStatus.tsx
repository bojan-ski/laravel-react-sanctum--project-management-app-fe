import { type JSX } from 'react';
import { useAppSelector } from '../../../hooks/useRedux';
import { useZodValidation } from '../../../hooks/useZodValidation';
import { useThunk } from '../../../hooks/useThunk';
import { changeProjectStatus } from '../../../features/regularUser/projectSlice';
import { projectStatusSchema, type ProjectStatusFilter } from '../../../schemas/projectSchema';
import type { ProjectsState, ProjectStatus } from '../../../types/project';
import FormSelect from '../../form/FormSelect';
import toast from 'react-hot-toast';

type ChangeProjectStatusProps = {
    projectId: number;
    projectStatus: ProjectStatus;
    setProjectStatus: (option: ProjectStatus) => void;
};

function ChangeProjectStatus({
    projectId,
    projectStatus,
    setProjectStatus
}: ChangeProjectStatusProps): JSX.Element {
    const { isLoading } = useAppSelector<ProjectsState>(state => state.project);
    const { run } = useThunk(changeProjectStatus);
    const { validate, errors, setErrors } = useZodValidation<ProjectStatusFilter>();

    const options: ProjectStatusFilter[] = [ "pending", "active", "completed", "closed" ];

    const handleProjectStatusChange = async (option: string): Promise<void> => {
        const validation = validate(projectStatusSchema, option);
        if (!validation) return;

        const thunkCall = await run({
            projectId,
            newProjectStatus: option
        });

        if (thunkCall.ok) {
            toast.success(thunkCall.data.message);

            setProjectStatus(option as ProjectStatus);
            setErrors({});
        } else {
            toast.error(thunkCall.error.random || "Validation error");

            setErrors(thunkCall.error);
        }
    };

    return (
        <FormSelect
            name="status"
            defaultValue={projectStatus}
            options={options}
            onMutate={handleProjectStatusChange}
            selectCss='text-xs'
            disabled={isLoading}
            error={errors.status}
        />
    );
}

export default ChangeProjectStatus;