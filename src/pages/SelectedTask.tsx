import { type JSX } from 'react';
import { useLoaderData } from 'react-router';
import { getTaskDetails } from '../services/task';
import type { SelectedTaskDetailsResponse } from '../types/task';
import TaskDetailsHeader from '../components/task/selectedTaskPage/TaskDetailsHeader';
import TaskDetailsInfo from '../components/task/selectedTaskPage/TaskDetailsInfo';

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
                <section className='task-details'>
                    <TaskDetailsInfo task={task} />                    
                    {/* TaskActivityTimeline */}
                </section>

                <section className='chat p-4 border rounded-md'>
                    CHAT
                </section>
            </div>
        </div>
    );
}

export default SelectedTask;