import { type JSX } from 'react';
import { useAppDispatch } from '../../../hooks/useRedux';
import { changeProjectStatus } from '../../../features/regularUser/projectSlice';
import { projectStatusSchema } from '../../../schemas/projectSchema';
import FormSelect from '../../form/FormSelect';
import toast from 'react-hot-toast';

type ChangeProjectStatusProps = {
    projectId: number;
    projectStatus: string;
    onRefresh: () => void;
};

function ChangeProjectStatus({
    projectId,
    projectStatus,
    onRefresh,
}: ChangeProjectStatusProps): JSX.Element {
    const dispatch = useAppDispatch();

    const handleProjectStatusChange = async (option: string): Promise<void> => {
        // zod validation
        const validation = projectStatusSchema.safeParse(option);

        if (!validation.success) {
            toast.error('Invalid project status!');
            return;
        }

        // api call
        const result = await dispatch(changeProjectStatus({
            projectId,
            newProjectStatus: option
        }));

        // response
        if (result.meta.requestStatus == 'fulfilled') {
            const successMsg = result.payload as { message: string; };
            toast.success(successMsg.message);

            onRefresh();
        }

        if (result.meta.requestStatus == 'rejected') {
            const errorMsg = result.payload || result?.meta.requestStatus;
            toast.error(errorMsg as string);
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