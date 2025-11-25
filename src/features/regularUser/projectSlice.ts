import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ProjectFormDataErrors, LaravelValidationErrors, ProjectState, ProjectCard } from "../../types/types";
import { createProject, deleteProject, getProjects, statusChange, updateProject } from "../../services/project";
import type { ProjectFormData } from "../../schemas/projectSchema";

const initialProjectState: ProjectState = {
    isLoading: false,
    userProjects: [],
    filterOwnership: '',
    filterStatus: '',
    currentPage: 1,
    lastPage: 1,
    total: 0,
    error: '',
};

type getUserProjectsProps = {
    ownership?: string;
    status?: string;
    page?: number;
};

export const getUserProjects = createAsyncThunk('projects/getUserProjects', async (
    { ownership, status, page }: getUserProjectsProps,
    { rejectWithValue }
) => {
    console.log('getUserProjects');

    try {
        const apiCall = await getProjects(ownership, status, page);

        return apiCall.data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.statusText || 'Error - Fetch user projects');
    }
});

export const createNewProject = createAsyncThunk('project/createNewProject', async (
    newProjectFormData: ProjectFormData,
    { rejectWithValue }
) => {
    try {
        const apiCall = await createProject(newProjectFormData);

        return apiCall;
    } catch (error: any) {
        if (error.response?.status === 422) {
            const fieldErrors = error?.response?.data?.errors as LaravelValidationErrors;
            const formattedErrors: ProjectFormDataErrors = {};

            Object.keys(fieldErrors).forEach((key) => {
                formattedErrors[key as keyof ProjectFormDataErrors] = fieldErrors[key][0];
            });

            return rejectWithValue(formattedErrors);
        } else {
            return rejectWithValue({ random: error.response.statusText || "Error - Create new project" });
        }
    }
});

type updateUserProjectProps = {
    projectId: number;
    updateProjectFormData: ProjectFormData;
};

export const updateUserProject = createAsyncThunk('project/updateProject', async (
    { projectId, updateProjectFormData }: updateUserProjectProps,
    { rejectWithValue }
) => {
    try {
        const apiCall = await updateProject(projectId, updateProjectFormData);

        return apiCall;
    } catch (error: any) {
        if (error.response?.status === 422) {
            const fieldErrors = error?.response?.data?.errors as LaravelValidationErrors;
            const formattedErrors: ProjectFormDataErrors = {};

            Object.keys(fieldErrors).forEach((key) => {
                formattedErrors[key as keyof ProjectFormDataErrors] = fieldErrors[key][0];
            });

            return rejectWithValue(formattedErrors);
        } else {
            return rejectWithValue({ random: error.response.statusText || "Error - Update project" });
        }
    }
});

type changeProjectStatusProps = {
    projectId: number;
    newProjectStatus: string;
};

export const changeProjectStatus = createAsyncThunk('project/changeProjectStatus', async (
    { projectId, newProjectStatus }: changeProjectStatusProps,
    { rejectWithValue }
) => {
    try {
        const apiCall = await statusChange(projectId, newProjectStatus);

        return apiCall;
    } catch (error: any) {
        return rejectWithValue(error.response.statusText || "Error - Change project");
    }
});

export const deleteUserProject = createAsyncThunk('project/deleteUserProject', async (
    projectId: number,
    { rejectWithValue }
) => {
    try {
        const apiCall = await deleteProject(projectId);

        return { projectId, message: apiCall.message };
    } catch (error: any) {
        return rejectWithValue(error?.response?.statusText || 'Error - Delete project');
    }
});

const projectSlice = createSlice({
    name: 'project',
    initialState: initialProjectState,
    reducers: {
        setFilterOwnership: (state, { payload }): void => {
            state.filterOwnership = payload;
            state.currentPage = 1;
        },
        setFilterStatus: (state, { payload }): void => {
            state.filterStatus = payload;
            state.currentPage = 1;
        },
        setUserProjectsPage: (state, { payload }): void => {
            state.currentPage = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // get all projects
            .addCase(getUserProjects.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(getUserProjects.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.userProjects = payload.data;
                state.currentPage = payload.current_page;
                state.lastPage = payload.last_page;
                state.total = payload.total;
            })
            .addCase(getUserProjects.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload as string;
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
                const updatedProject = state.userProjects.find((project: ProjectCard) => project.id == updatedProjectData.id);

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
                const updatedProject = state.userProjects.find((project: ProjectCard) => project.id == updatedProjectData.id);

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
                state.error = '';
            })
            .addCase(deleteUserProject.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.userProjects = state.userProjects.filter((project: ProjectCard) => project.id !== payload.projectId);
                state.total -= 1;
            })
            .addCase(deleteUserProject.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload as string;
            });
    },
});

export const {
    setFilterOwnership,
    setFilterStatus,
    setUserProjectsPage
} = projectSlice.actions;
export default projectSlice.reducer;