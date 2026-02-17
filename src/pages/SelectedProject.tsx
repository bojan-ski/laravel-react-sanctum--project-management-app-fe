import { useEffect, type JSX } from 'react';
import { useLoaderData } from 'react-router';
import { useAppDispatch } from '../hooks/useRedux';
import { getProjectDetails } from '../services/project';
import { setMembers } from '../features/regularUser/projectMemberSlice';
import { setTasks } from '../features/regularUser/taskSlice';
import ProjectOwner from '../components/project/projectOwner/ProjectOwner';
import ProjectData from '../components/project/selectedProjectPage/ProjectData';
import Members from '../components/project/members/Members';
import ProjectTasksHeader from '../components/project/tasks/ProjectTasksHeader';

// loader
export const loader = async ({ params }: { params: any; }): Promise<any> => {
    const projectDetails: any = await getProjectDetails(params.id);
    // console.log(projectDetails);

    return { ...projectDetails };
};

function SelectedProject(): JSX.Element {
    const { data } = useLoaderData();
    const dispatch = useAppDispatch();
    console.log(data);

    useEffect(() => {
        console.log('useEffect - SelectedProject');

        dispatch(setMembers({
            members: data.members,
            membersLimit: data.members_limit,
        }));

        dispatch(setTasks({
            tasks: data.tasks
        }));
    }, [ data.id, dispatch ]);

    return (
        <div className='selected-project-page my-10 grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <section className='grid gap-4'>
                <ProjectOwner
                    ownerAvatar={data.owner.avatar}
                    ownerName={data.owner.name}
                    isProjectOwner={data.is_owner}
                    projectId={data.id}
                    projectTitle={data.title}
                    projectStatus={data.status}
                    divCss='p-4 border rounded-md'
                />

                <ProjectData data={data} />
            </section>

            <section className='grid gap-4'>
                <Members
                    projectId={data.id}
                    isProjectOwner={data.is_owner}
                />

                {/* project statistics */}
                <div className='p-4 border rounded-md'>
                    Project statistics
                </div>
            </section>

            <section className='md:col-span-2 p-4 border rounded-md'>
                <ProjectTasksHeader
                    isProjectOwner={data.is_owner}
                    projectId={data.id}
                />

                {/* task list */}
            </section>
        </div>
    );
}

export default SelectedProject;