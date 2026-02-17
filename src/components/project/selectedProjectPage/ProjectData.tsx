import { type JSX } from 'react';
import type { ProjectDetails } from '../../../types/project';
import DownloadDocument from '../../document/DownloadDocument';
import ProjectDeadline from '../ProjectDeadline';

function ProjectData({ data }: { data: ProjectDetails; }): JSX.Element {
    return (
        <div className='p-4 border rounded-md'>
            <h2 className='font-semibold text-lg mb-3'>
                {data.title}
            </h2>

            <p className='mb-3 text-sm text-justify'>
                {data.description}
            </p>

            <div className='flex items-center justify-between'>
                {data.document && (
                    <div className='flex gap-2 text-sm'>
                        <p className="text-sm font-semibold">
                            Document:
                        </p>

                        <DownloadDocument document={data.document} />
                    </div>
                )}

                <ProjectDeadline deadline={data.deadline} />
            </div>
        </div>
    );
}

export default ProjectData;