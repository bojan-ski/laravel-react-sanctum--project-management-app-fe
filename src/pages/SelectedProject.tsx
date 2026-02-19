import { useEffect, type JSX } from 'react';
import { useLoaderData } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { getProjectDetails } from '../services/project';
import { setMembers } from '../features/regularUser/projectMemberSlice';
import { setTasks } from '../features/regularUser/taskSlice';
import type { SelectedProjectDetailsResponse } from '../types/project';
import ProjectOwner from '../components/project/projectOwner/ProjectOwner';
import ProjectData from '../components/project/selectedProjectPage/ProjectData';
import Members from '../components/project/members/Members';
import TasksStatistics from '../components/project/selectedProjectPage/TasksStatistics';
import ProjectTasksHeader from '../components/project/tasks/ProjectTasksHeader';
import TasksList from '../components/task/TasksList';

export const loader = async ({ params }: { params: any; }): Promise<SelectedProjectDetailsResponse> => {
    const response: SelectedProjectDetailsResponse = await getProjectDetails(params.id);

    return response;
};

function SelectedProject(): JSX.Element {
    const { data: project } = useLoaderData();
    const { tasks } = useAppSelector(state => state.tasks);
    const dispatch = useAppDispatch();    

    useEffect(() => {
        console.log('useEffect - SelectedProject');

        dispatch(setMembers({
            members: project.members,
            membersLimit: project.members_limit,
        }));

        dispatch(setTasks({
            tasks: project.tasks
        }));
    }, [ project.id, dispatch ]);

    return (
        <div className='selected-project-page my-10 grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <section>
                <ProjectOwner
                    ownerAvatar={project.owner.avatar}
                    ownerName={project.owner.name}
                    isProjectOwner={project.is_owner}
                    projectId={project.id}
                    projectTitle={project.title}
                    projectStatus={project.status}
                    divCss='p-4 border rounded-md'
                />

                <ProjectData project={project} />
            </section>

            <section className='grid gap-4'>
                <Members
                    projectId={project.id}
                    isProjectOwner={project.is_owner}
                />

                <TasksStatistics
                    completionPercentage={project.statistics?.completion_percentage || 0}
                    tasks={tasks}
                />
            </section>

            <section className='md:col-span-2 p-4 border rounded-md'>
                <ProjectTasksHeader
                    isProjectOwner={project.is_owner}
                    projectId={project.id}
                    tasksLength={tasks.length}
                />

                <TasksList
                    tasks={tasks}
                    emptyMessage="No tasks in this project"
                />
            </section>
        </div>
    );
}

export default SelectedProject;