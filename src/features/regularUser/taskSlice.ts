import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleAsyncThunkError } from "../../utils/reduxErrorHandler";
import { createTask } from "../../services/task";
import type { TaskFormDataErrors, TaskState } from "../../types/task";
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

const taskSlice = createSlice({
    name: 'tasks',
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
            });
    },
});

export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;