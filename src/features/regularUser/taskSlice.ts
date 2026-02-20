import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleAsyncThunkError } from "../../utils/reduxErrorHandler";
import { changeTaskPriority, changeTaskStatus, createTask, deleteTask } from "../../services/task";
import type { Task, TaskFormDataErrors, TaskState } from "../../types/task";
import type { TaskFormData } from "../../schemas/taskSchema";

const initialTaskState: TaskState = {
    isLoading: false,
    tasks: [],
};

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

const taskSlice = createSlice({
    name: 'task',
    initialState: initialTaskState,
    reducers: {
        setTasks(state, { payload }) {
            state.tasks = payload.tasks;
        },
    },
    extraReducers: (builder) => {
        builder
            // create new task
            .addCase(createNewTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNewTask.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                state.tasks.unshift(payload.data);
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
                const updatedTask = state.tasks.find(
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
                const updatedTask = state.tasks.find(
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
            });
    },
});

export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;