import { type JSX } from 'react';
import { useZodValidation } from '../../../hooks/useZodValidation';
import { useThunk } from '../../../hooks/useThunk';
import { changeProjectStatus } from '../../../features/regularUser/projectSlice';
import { usePageRefresh } from '../../../context/pageRefreshProvide';
import { projectStatusSchema, type ProjectStatusFilter } from '../../../schemas/projectSchema';
import FormSelect from '../../form/FormSelect';
import toast from 'react-hot-toast';

type ChangeProjectStatusProps = {
    projectId: number;
    projectStatus: string;
};

function ChangeProjectStatus({
    projectId,
    projectStatus,
}: ChangeProjectStatusProps): JSX.Element {
    const { run } = useThunk(changeProjectStatus);
    const { validate } = useZodValidation<ProjectStatusFilter>();
    const { pageRefresh } = usePageRefresh();

    const handleProjectStatusChange = async (option: string): Promise<void> => {
        const validation = validate(projectStatusSchema, option);
        if (!validation) return;

        const thunkCall = await run({
            projectId,
            newProjectStatus: option
        });

        if (thunkCall.ok) {
            toast.success(thunkCall.data.message);

            pageRefresh();
        } else {
            toast.error(thunkCall.error);
        }
    };

    return (
        <FormSelect
            name="status"
            defaultValue={projectStatus}
            options={["pending", "active", "completed", "closed"]}
            onMutate={handleProjectStatusChange}
        />
    );
}

export default ChangeProjectStatus;