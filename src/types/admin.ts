import type { ApiResponse } from "./api";
import type { ProjectCard, ProjectsPagination } from "./project";

// USERS

// PROJECTS
// api response
export type GetAllProjectsResponse = {
    data: {
        data: ProjectCard[];
        current_page: number;
        last_page: number;
        total: number;
    };
} & ApiResponse;

export type SearchProjectsResponseErrors = {
    search?: string;
};

// project slice
export type AllProjectsState = {
    isLoading: boolean;
    projects: ProjectCard[];
    search: string;
    pagination: ProjectsPagination;
    total: number;
};