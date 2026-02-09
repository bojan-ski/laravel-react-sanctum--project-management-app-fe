import { type JSX } from 'react';
import { useLoaderData, useNavigate, type NavigateFunction } from 'react-router';
import { useAppSelector } from '../hooks/useRedux';
import { updateUserProject } from '../features/regularUser/projectSlice';
import { getProjectData } from '../services/project';
import { useThunk } from '../hooks/useThunk';
import type { ProjectFormData } from '../schemas/projectSchema';
import type { ProjectFormSubmitResult, ProjectsState } from '../types/project';
import ProjectForm from '../components/project/ProjectForm';

export const loader = async ({ params }: { params: any; }): Promise<any> => {
    const projectData: any = await getProjectData(params.id);

    return projectData;
};

function EditProject(): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const { data: project } = useLoaderData();
    const { isLoading } = useAppSelector<ProjectsState>(state => state.project);
    const { run } = useThunk(updateUserProject);

    const handleUpdateProject = async (formData: ProjectFormData): Promise<ProjectFormSubmitResult> => {
        const thunkCall = await run({
            projectId: project.id,
            updateProjectFormData: formData
        });

        if (thunkCall.ok) {
            navigate(`/projects/${project.id}`);

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
            initialData={project}
            headerLabel="Edit project"
            submitLabel="Update project"
            onSubmit={handleUpdateProject}
            showExistingFile={!!project.document_path}
        />
    );
}

export default EditProject;