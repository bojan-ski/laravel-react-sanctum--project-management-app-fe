import { type JSX } from 'react';

function TaskActivityTimeline({ activities }: { activities: any; }): JSX.Element {
    console.log(activities);
    
    return (
        <div className='p-4 border rounded-md'>
            TaskActivityTimeline
        </div>
    );
}

export default TaskActivityTimeline;