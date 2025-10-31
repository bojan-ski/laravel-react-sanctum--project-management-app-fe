import { type JSX } from 'react';
import { useLoaderData, useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { updateUserProject } from '../features/regularUser/projectSlice';
import { getProjectDetails } from '../services/project';
import type { ProjectFormData, ProjectFormSubmit, ProjectState } from '../types/types';
import ProjectForm from '../components/project/ProjectForm';

// loader
export const loader = async ({ params }: { params: any; }): Promise<any> => {
    const projectDetails: any = await getProjectDetails(params.id);

    return projectDetails;
};

function EditProject(): JSX.Element {
    const { isLoading, filterOwnership, filterStatus, currentPage } = useAppSelector<ProjectState>(state => state.project);
    const dispatch = useAppDispatch();
    const { data } = useLoaderData();
    const navigate: NavigateFunction = useNavigate();

    const handleUpdateProject = async (formData: ProjectFormData): Promise<ProjectFormSubmit> => {
        const result = await dispatch(updateUserProject({
            projectId: data.id,
            updateProjectFormData: formData
        }));
        console.log(result);
        

        if (result.meta.requestStatus === 'fulfilled') {
            navigate(`/projects?ownership=${filterOwnership}&status=${filterStatus}&page=${currentPage}`);

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
            initialData={data}
            headerLabel="Edit project"
            submitLabel="Update project"
            onSubmit={handleUpdateProject}
            showExistingFile={!!data.document_path}
            projectId={data.id}
        />
    );
}

export default EditProject;