import { type JSX } from 'react';
import type { TaskActivity } from '../../../types/task';
import NoDataMessage from '../../global/NoDataMessage';
import TaskActivityTimelineItem from './TaskActivityTimelineItem';

type TaskActivityTimelineProps = {
    activitiesCount: number;
    activities: TaskActivity[];
};

function TaskActivityTimeline({
    activitiesCount,
    activities
}: TaskActivityTimelineProps): JSX.Element {
    if (activitiesCount === 0) {
        return <NoDataMessage message='No activities yet' />;
    }

    return (
        <div className='p-4 border rounded-md'>
            <h3 className="text-sm md:text-base font-semibold text-gray-600 mb-2">
                Activities ({activitiesCount})
            </h3>

            <div className='space-y-3 max-h-[400px] overflow-y-scroll'>
                {activities.map((activity: TaskActivity) => (
                    <TaskActivityTimelineItem
                        key={activity.id}
                        activity={activity}
                    />
                ))}
            </div>
        </div>
    );
}

export default TaskActivityTimeline;