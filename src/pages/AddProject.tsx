import type { JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { createNewProject, getUserProjects } from '../features/regularUser/projectSlice';
import { useThunk } from '../hooks/useThunk';
import type { ProjectFormData } from '../schemas/projectSchema';
import type { ProjectFormSubmit, ProjectState } from '../types/types';
import ProjectForm from '../components/project/ProjectForm';

export default function AddProject(): JSX.Element {
    const { isLoading } = useAppSelector<ProjectState>(state => state.project);
    const { run } = useThunk(createNewProject);
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const handleAddNewProject = async (formData: ProjectFormData): Promise<ProjectFormSubmit> => {
        const thunkCall = await run(formData);

        if (thunkCall.ok) {
            dispatch(getUserProjects({}));
            navigate('/projects');

            return {
                status: 'fulfilled',
                message: thunkCall.data.message
            };
        };

        return {
            status: 'rejected',
            message: thunkCall.error.random || thunkCall?.error.requestStatus,
            errors: thunkCall.error
        };
    };

    return (
        <ProjectForm
            isLoading={isLoading}
            headerLabel="Add project"
            submitLabel="Add project"
            onSubmit={handleAddNewProject}
        />
    );
}
