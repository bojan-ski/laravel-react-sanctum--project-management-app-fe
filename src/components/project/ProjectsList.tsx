import { type JSX } from 'react';
import type { ProjectCard as ProjectCardType } from '../../types/types';
import ProjectCard from './projectCard/ProjectCard';

function ProjectsList({ projects }: { projects: ProjectCardType[]; }): JSX.Element {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
            {projects.map((project: ProjectCardType) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                />
            ))}
        </section>
    );
}

export default ProjectsList;