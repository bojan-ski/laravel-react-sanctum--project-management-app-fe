import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleAsyncThunkError } from "../../utils/reduxErrorHandler";
import {
    changeTaskPriority,
    changeTaskStatus,
    createTask,
    deleteTask,
    getUserTasks,
    uploadDocument
} from "../../services/task";
import type { TaskDocumentFormData, TaskFormData } from "../../schemas/taskSchema";
import type {
    GetUserTasksResponseErrors,
    Task, TaskFormDataErrors,
    TaskState
} from "../../types/task";

const initialTaskState: TaskState = {
    isLoading: false,
    projectTasks: [],
    userTasks: [],
    filters: {
        ownership: 'all',
        status: 'all',
        priority: 'all'
    },
    pagination: {
        currentPage: 1,
        lastPage: 1,
    },
};

type FetchUserTasksProps = {
    ownership?: string;
    status?: string;
    priority?: string;
    page?: number;
};

export const fetchUserTasks = createAsyncThunk('tasks/fetchUserTasks', async (
    { ownership, status, priority, page }: FetchUserTasksProps,
    { rejectWithValue }
) => {
    try {
        const apiCall = await getUserTasks(ownership, status, priority, page);

        return apiCall.data;
    } catch (error: any) {
        return handleAsyncThunkError<GetUserTasksResponseErrors>(error, rejectWithValue);
    }
});

type CreateNewTaskProps = {
    projectId: number;
    taskData: TaskFormData;
};

export const createNewTask = createAsyncThunk('tasks/createNewTask', async (
    { projectId, taskData }: CreateNewTaskProps,
    { rejectWithValue }
) => {
    try {
        const apiCall = await createTask(projectId, taskData);

        return apiCall;
    } catch (error: any) {
        return handleAsyncThunkError<TaskFormDataErrors>(error, rejectWithValue);
    }
});

type UpdateTaskStatusProps = {
    taskId: number;
    newTaskStatus: string;
};

export const updateTaskStatus = createAsyncThunk('tasks/updateTaskStatus', async (
    { taskId, newTaskStatus }: UpdateTaskStatusProps,
    { rejectWithValue }
) => {
    try {
        const apiCall = await changeTaskStatus(taskId, newTaskStatus);

        return apiCall;
    } catch (error: any) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

type UpdateTaskPriorityProps = {
    taskId: number;
    newTaskPriority: string;
};

export const updateTaskPriority = createAsyncThunk('tasks/updateTaskPriority', async (
    { taskId, newTaskPriority }: UpdateTaskPriorityProps,
    { rejectWithValue }
) => {
    try {
        const apiCall = await changeTaskPriority(taskId, newTaskPriority);

        return apiCall;
    } catch (error: any) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

export const removeTask = createAsyncThunk('tasks/removeTask', async (
    taskId: number,
    { rejectWithValue }
) => {
    try {
        const apiCall = await deleteTask(taskId);

        return apiCall;
    } catch (error: any) {
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

type UploadTaskDocumentProps = {
    taskId: number;
    document: TaskDocumentFormData;
};

export const uploadTaskDocument = createAsyncThunk('tasks/uploadTaskDocument', async (
    { taskId, document }: UploadTaskDocumentProps,
    { rejectWithValue }
) => {
    try {
        const apiCall = await uploadDocument(taskId, document);       

        return apiCall;
    } catch (error: any) {        
        return handleAsyncThunkError(error, rejectWithValue);
    }
});

const taskSlice = createSlice({
    name: 'task',
    initialState: initialTaskState,
    reducers: {
        setProjectTasks(state, { payload }): void {
            state.projectTasks = payload.tasks;
        },
        setFilterUserTasksOwnership: (state, { payload }): void => {
            state.filters.ownership = payload;
            state.pagination.currentPage = 1;
        },
        setFilterUserTasksStatus: (state, { payload }): void => {
            state.filters.status = payload;
            state.pagination.currentPage = 1;
        },
        setFilterUserTasksPriority: (state, { payload }): void => {
            state.filters.priority = payload;
            state.pagination.currentPage = 1;
        },
        setUserTasksPage: (state, { payload }): void => {
            state.pagination.currentPage = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch user tasks
            .addCase(fetchUserTasks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserTasks.fulfilled, (state, { payload }) => {                
                state.isLoading = false;

                state.userTasks = payload.data;
                state.pagination.currentPage = payload.current_page;
                state.pagination.lastPage = payload.last_page;
            })
            .addCase(fetchUserTasks.rejected, (state) => {
                state.isLoading = false;
            })

            // create new task
            .addCase(createNewTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNewTask.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                state.projectTasks.unshift(payload.data);
            })
            .addCase(createNewTask.rejected, (state) => {
                state.isLoading = false;
            })

            // update task status
            .addCase(updateTaskStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTaskStatus.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                const updatedTaskData = payload.data;
                const updatedTask = state.projectTasks.find(
                    (task: Task) => task.id === updatedTaskData.id
                );

                if (updatedTask) {
                    updatedTask.status = updatedTaskData.status;
                }
            })
            .addCase(updateTaskStatus.rejected, (state) => {
                state.isLoading = false;
            })

            // update task priority
            .addCase(updateTaskPriority.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTaskPriority.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                const updatedTaskData = payload.data;
                const updatedTask = state.projectTasks.find(
                    (task: Task) => task.id === updatedTaskData.id
                );

                if (updatedTask) {
                    updatedTask.priority = updatedTaskData.priority;
                }
            })
            .addCase(updateTaskPriority.rejected, (state) => {
                state.isLoading = false;
            })

            // delete task
            .addCase(removeTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeTask.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(removeTask.rejected, (state) => {
                state.isLoading = false;
            })

            // assignee upload task document
            .addCase(uploadTaskDocument.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadTaskDocument.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(uploadTaskDocument.rejected, (state) => {
                state.isLoading = false;
            })
    },
});

export const {
    setProjectTasks,
    setFilterUserTasksOwnership,
    setFilterUserTasksStatus,
    setFilterUserTasksPriority,
    setUserTasksPage
} = taskSlice.actions;
export default taskSlice.reducer;