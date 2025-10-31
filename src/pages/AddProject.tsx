import type { JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { createNewProject, getUserProjects } from '../features/regularUser/projectSlice';
import type { ProjectFormData, ProjectFormSubmit, ProjectState } from '../types/types';
import ProjectForm from '../components/project/ProjectForm';

export default function AddProject(): JSX.Element {
    const { isLoading } = useAppSelector<ProjectState>(state => state.project);
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const handleAddNewProject = async (formData: ProjectFormData): Promise<ProjectFormSubmit> => {
        const result = await dispatch(createNewProject(formData));

        if (result.meta.requestStatus === 'fulfilled') {
            dispatch(getUserProjects({}));
            navigate('/projects');

            return {
                status: 'fulfilled',
                message: result.payload.message
            };
        }

        return {
            status: 'rejected',
            message: result.payload.random || result?.meta.requestStatus,
            errors: result.payload
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
