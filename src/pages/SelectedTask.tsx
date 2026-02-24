import { type JSX } from 'react';
import { useLoaderData } from 'react-router';
import { getTaskDetails } from '../services/task';
import type { SelectedTaskDetailsResponse } from '../types/task';
import TaskDetailsHeader from '../components/task/selectedTaskPage/TaskDetailsHeader';
import TaskDetailsInfo from '../components/task/selectedTaskPage/TaskDetailsInfo';
import TaskActivityTimeline from '../components/task/selectedTaskPage/TaskActivityTimeline';
import UploadTaskDocument from '../components/task/selectedTaskPage/UploadTaskDocument';

export const loader = async ({ params }: { params: any; }): Promise<SelectedTaskDetailsResponse> => {
    const response: SelectedTaskDetailsResponse = await getTaskDetails(params.id);

    return response;
};

function SelectedTask(): JSX.Element {
    const { data: task } = useLoaderData();
    console.log(task);

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

                    <div className='p-4 border rounded-md'>
                        CHAT
                    </div>
                </section>
            </div>
        </div>
    );
}

export default SelectedTask;