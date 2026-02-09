import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleAsyncThunkError } from "../../utils/reduxErrorHandler";
import { createProject, deleteProject, getProjects, statusChange, updateProject } from "../../services/project";
import type { ProjectFormData } from "../../schemas/projectSchema";
import type { ProjectFormDataErrors, ProjectsState, ProjectCard, GetProjectsResponseErrors } from "../../types/project";

const initialProjectState: ProjectsState = {
    isLoading: false,
    projects: [],
    filters: {
        owner: 'all',
        status: 'all'
    },
    pagination: {
        currentPage: 1,
        lastPage: 1,
    },
    total: 0
};

type GetUserProjectsProps = {
    ownership?: string;
    status?: string;
    page?: number;
};

export const getUserProjects = createAsyncThunk('projects/getUserProjects', async (
    { ownership, status, page }: GetUserProjectsProps,
    { rejectWithValue }
) => {
    console.log('getUserProjects');

    try {
        const apiCall = await getProjects(ownership, status, page);

        return apiCall.data;
    } catch (error: any) {
        return handleAsyncThunkError<GetProjectsResponseErrors>(error, rejectWithValue);
    }
});

export const createNewProject = createAsyncThunk('project/createNewProject', async (
    formData: ProjectFormData,
    { rejectWithValue }
) => {
    try {
        const apiCall = await createProject(formData);

        return apiCall;
    } catch (error: any) {
        return handleAsyncThunkError<ProjectFormDataErrors>(error, rejectWithValue);
    }
});

type UpdateUserProjectProps = {
    projectId: number;
    updateProjectFormData: ProjectFormData;
};

export const updateUserProject = createAsyncThunk('project/updateProject', async (
    { projectId, updateProjectFormData }: UpdateUserProjectProps,
    { rejectWithValue }
) => {
    try {
        const apiCall = await updateProject(projectId, updateProjectFormData);

        return apiCall;
    } catch (error: any) {
        return handleAsyncThunkError<ProjectFormDataErrors>(error, rejectWithValue);
    }
});

type ChangeProjectStatusProps = {
    projectId: number;
    newProjectStatus: string;
};

export const changeProjectStatus = createAsyncThunk('project/changeProjectStatus', async (
    { projectId, newProjectStatus }: ChangeProjectStatusProps,
    { rejectWithValue }
) => {
    try {
        const apiCall = await statusChange(projectId, newProjectStatus);
        console.log(apiCall);

        return apiCall;
    } catch (error: any) {
        console.log(error);
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const deleteUserProject = createAsyncThunk('project/deleteUserProject', async (
    projectId: number,
    { rejectWithValue }
) => {
    try {
        const apiCall = await deleteProject(projectId);
        console.log(apiCall);

        return { projectId, message: apiCall.message };
    } catch (error: any) {
        console.log(error);
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

const projectSlice = createSlice({
    name: 'project',
    initialState: initialProjectState,
    reducers: {
        setFilterOwnership: (state, { payload }): void => {
            state.filters.owner = payload;
            state.pagination.currentPage = 1;
        },
        setFilterStatus: (state, { payload }): void => {
            state.filters.status = payload;
            state.pagination.currentPage = 1;
        },
        setUserProjectsPage: (state, { payload }): void => {
            state.pagination.currentPage = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // get all projects
            .addCase(getUserProjects.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserProjects.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.projects = payload.data;
                state.pagination.currentPage = payload.current_page;
                state.pagination.lastPage = payload.last_page;
                state.total = payload.total;
            })
            .addCase(getUserProjects.rejected, (state) => {
                state.isLoading = false;
            })

            // create new project
            .addCase(createNewProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNewProject.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createNewProject.rejected, (state) => {
                state.isLoading = false;
            })

            // update existing project
            .addCase(updateUserProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserProject.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                const updatedProjectData = payload.data;
                const updatedProject = state.projects.find((project: ProjectCard) => project.id == updatedProjectData.id);

                if (updatedProject) {
                    updatedProject.title = updatedProjectData.title;
                    updatedProject.description = updatedProjectData.description;
                    updatedProject.deadline = updatedProjectData.deadline;
                }
            })
            .addCase(updateUserProject.rejected, (state) => {
                state.isLoading = false;
            })

            // change project status
            .addCase(changeProjectStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changeProjectStatus.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                const updatedProjectData = payload.data;
                const updatedProject = state.projects.find((project: ProjectCard) => project.id == updatedProjectData.id);

                if (updatedProject) {
                    updatedProject.status = updatedProjectData.status;
                }
            })
            .addCase(changeProjectStatus.rejected, (state) => {
                state.isLoading = false;
            })

            // delete project
            .addCase(deleteUserProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUserProject.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                console.log(state.projects);

                state.projects = state.projects.filter((project: ProjectCard) => project.id !== payload.projectId);
                state.total -= 1;
            })
            .addCase(deleteUserProject.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const {
    setFilterOwnership,
    setFilterStatus,
    setUserProjectsPage
} = projectSlice.actions;
export default projectSlice.reducer;