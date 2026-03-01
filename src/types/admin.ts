import type { ApiResponse } from "./api";
import type { ProjectCard, ProjectsPagination } from "./project";

// USERS

// PROJECTS
export type AllProjectStats = {
    total: number;
    by_status: {
        pending: number;
        active: number;
        completed: number;
        closed: number;
    };
    created_this_month: number;
    created_this_week: number;
};

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

export type AllProjectStatsResponse = {
    data: AllProjectStats;
} & ApiResponse;

// project slice
export type AllProjectsState = {
    isLoading: boolean;
    stats: AllProjectStats;
    projects: ProjectCard[];
    search: string;
    pagination: ProjectsPagination;
    total: number;
};