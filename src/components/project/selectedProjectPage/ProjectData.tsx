import { type JSX } from 'react';
import type { ProjectDetails } from '../../../types/project';
import DownloadDocument from '../../document/DownloadDocument';
import ProjectDeadline from '../ProjectDeadline';

function ProjectData({ project }: { project: ProjectDetails; }): JSX.Element {
    return (
        <div className='p-4 border rounded-md'>
            <h2 className='font-semibold text-lg mb-3'>
                {project.title}
            </h2>

            <p className='mb-3 text-sm text-justify'>
                {project.description}
            </p>

            <div className='flex items-center justify-between'>
                {project.document && (
                    <div className='flex gap-2 text-sm'>
                        <p className="text-sm font-semibold">
                            Document:
                        </p>

                        <DownloadDocument document={project.document} />
                    </div>
                )}

                <ProjectDeadline deadline={project.deadline} />
            </div>
        </div>
    );
}

export default ProjectData;