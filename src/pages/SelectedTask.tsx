import { useEffect, type JSX } from 'react';
import { useLoaderData } from 'react-router';
import { getTaskDetails } from '../services/task';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { useRealtimeMessages } from '../hooks/useRealtimeMessages';
import { getTaskMessages, markTaskMessagesAsRead } from '../features/regularUser/messageSlice';
import type { SelectedTaskDetailsResponse } from '../types/task';
import type { AuthState } from '../types/auth';
import TaskDetailsHeader from '../components/task/selectedTaskPage/TaskDetailsHeader';
import TaskDetailsInfo from '../components/task/selectedTaskPage/TaskDetailsInfo';
import TaskActivityTimeline from '../components/task/selectedTaskPage/TaskActivityTimeline';
import UploadTaskDocument from '../components/task/selectedTaskPage/UploadTaskDocument';
import TaskChatContainer from '../components/task/selectedTaskChat/TaskChatContainer';

export const loader = async ({ params }: { params: any; }): Promise<SelectedTaskDetailsResponse> => {
    const response: SelectedTaskDetailsResponse = await getTaskDetails(params.id);

    return response;
};

function SelectedTask(): JSX.Element {
    const { data: task } = useLoaderData();
    const { user } = useAppSelector<AuthState>(state => state.user);
    const dispatch = useAppDispatch();

    useRealtimeMessages({
        currentUserId: user.id,
        taskId: task.id
    });

    useEffect(() => {
        console.log('Fetching task messages');

        dispatch(getTaskMessages(task.id));
        dispatch(markTaskMessagesAsRead(task.id));
    }, [ task.id, dispatch ]);

    return (
        <div className='selected-task-page my-10 '>

            <TaskDetailsHeader task={task} />

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <section>
                    <TaskDetailsInfo task={task} />
                    <TaskActivityTimeline
                        activitiesCount={task.activities.length ?? 0}
                        activities={task.activities}
                    />
                </section>

                <section>
                    {(task.project.is_active && task.is_assignee && task.task_in_progress) && (
                        <UploadTaskDocument taskId={task.id} />
                    )}

                    <TaskChatContainer
                        userId={user.id}
                        taskId={task.id}
                    />
                </section>
            </div>
        </div>
    );
}

export default SelectedTask;