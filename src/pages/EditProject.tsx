import { type JSX } from 'react';
import { useLoaderData, useNavigate, type NavigateFunction } from 'react-router';
import { useAppSelector } from '../hooks/useRedux';
import { updateUserProject } from '../features/regularUser/projectSlice';
import { getProjectData } from '../services/project';
import { useThunk } from '../hooks/useThunk';
import type { ProjectFormData } from '../schemas/projectSchema';
import type { ProjectFormSubmit, ProjectState } from '../types/project';
import ProjectForm from '../components/project/ProjectForm';

export const loader = async ({ params }: { params: any; }): Promise<any> => {
    const projectData: any = await getProjectData(params.id);

    return projectData;
};

function EditProject(): JSX.Element {
    const { data } = useLoaderData();
    const { isLoading, filterOwnership, filterStatus, currentPage } = useAppSelector<ProjectState>(state => state.project);
    const { run } = useThunk(updateUserProject);
    const navigate: NavigateFunction = useNavigate();

    const handleUpdateProject = async (formData: ProjectFormData): Promise<ProjectFormSubmit> => {
        const thunkCall = await run({
            projectId: data.id,
            updateProjectFormData: formData
        });

        if (thunkCall.ok) {
            navigate(`/projects?ownership=${filterOwnership}&status=${filterStatus}&page=${currentPage}`);

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
            initialData={data}
            headerLabel="Edit project"
            submitLabel="Update project"
            onSubmit={handleUpdateProject}
            showExistingFile={!!data.document_path}
        />
    );
}

export default EditProject;