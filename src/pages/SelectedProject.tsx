import { type JSX } from 'react';
import { useLoaderData, useRevalidator } from 'react-router';
import { getProjectDetails } from '../services/project';
import ProjectOwner from '../components/project/projectOwner/ProjectOwner';
import ProjectDeadline from '../components/project/ProjectDeadline';
import DownloadDocument from '../components/document/DownloadDocument';
import Members from '../components/project/members/Members';

// loader
export const loader = async ({ params }: { params: any; }): Promise<any> => {
    const projectDetails: any = await getProjectDetails(params.id);
    // console.log(projectDetails);

    return { ...projectDetails };
};

function SelectedProject(): JSX.Element {
    const { data } = useLoaderData();
    const revalidator = useRevalidator();
    console.log(data);

    return (
        <div className='selected-project-page my-10 grid lg:grid-cols-2 gap-4'>
            {/* Section One */}
            <section>
                {/* project owner features */}
                <ProjectOwner
                    divCss='p-4 border rounded-md mb-5'
                    ownerAvatar={data.owner.avatar}
                    ownerName={data.owner.name}
                    isProjectOWner={data.is_owner}
                    projectId={data.id}
                    projectTitle={data.title}
                    projectStatus={data.status}
                    onRefresh={() => revalidator.revalidate()}
                />

                {/* project data */}
                <div className='p-4 border rounded-md'>
                    <h2 className='font-semibold text-lg mb-3'>
                        {data.title}
                    </h2>

                    <p className='mb-3 text-sm text-justify'>
                        {data.description}
                    </p>

                    <div className='flex items-center justify-between'>
                        <div className='flex gap-2 text-sm'>
                            <p className="text-sm font-semibold">
                                Available file:
                            </p>

                            <DownloadDocument documentPath={data.document_path} />
                        </div>

                        <ProjectDeadline deadline={data.deadline} />
                    </div>
                </div>
            </section>

            {/* Section Two */}
            <section>
                {/* project statistics */}
                <div className='p-4 border rounded-md mb-5'>
                    Project statistics
                </div>

                {/* project members */}
                <Members
                    projectId={data.id}
                    ownerId={data.owner.id}
                    members={data.members}
                    onRefresh={() => revalidator.revalidate()}
                />
            </section>
        </div>
    );
}

export default SelectedProject;