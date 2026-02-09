import type { JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { createNewProject, getUserProjects } from '../features/regularUser/projectSlice';
import { useThunk } from '../hooks/useThunk';
import type { ProjectFormData } from '../schemas/projectSchema';
import type { ProjectFormSubmitResult, ProjectsState } from '../types/project';
import ProjectForm from '../components/project/ProjectForm';

export default function AddProject(): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const { isLoading } = useAppSelector<ProjectsState>(state => state.project);
    const dispatch = useAppDispatch();
    const { run } = useThunk(createNewProject);

    const handleAddNewProject = async (formData: ProjectFormData): Promise<ProjectFormSubmitResult> => {
        const thunkCall = await run(formData);       

        if (thunkCall.ok) {
            dispatch(getUserProjects({}));
            navigate('/projects');

            return {
                status: 'success',
                message: thunkCall.data.message
            };
        };

        return {
            status: 'error',
            message: thunkCall.error.random,
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
