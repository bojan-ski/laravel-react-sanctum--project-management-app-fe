import type { ApiResponse } from "./api";
import type { Member } from "./member";
import type { Document } from "./document";
import type { Task } from "./task";

export type ProjectStatus = 'pending' | 'active' | 'completed' | 'closed';

export type Project = {
    id: number;
    title: string;
    description: string;
    status: ProjectStatus;
    deadline: string;
    created_at: string;
    updated_at: string;
};

export type ProjectOwner = {
    avatar: string;
    name: string;
};

export type ProjectStatistics = {
    total_tasks: number;
    completed_tasks: number;
    pending_tasks: number;
    completion_percentage: number;
    total_members: number;
};

export type ProjectCard = {
    owner: ProjectOwner;
    is_owner: boolean;
    statistics: ProjectStatistics;
} & Project;

export type ProjectData = {
    document: Document;
} & Project;

export type ProjectDetails = {
    owner: ProjectOwner;
    is_owner: boolean;
    statistics: ProjectStatistics;
    members: Member[];
    is_member: boolean;
    members_limit: number;
    tasks: Task[];
} & ProjectData;

// api response
export type GetProjectsResponse = {
    data: {
        data: ProjectCard[];
        current_page: number;
        last_page: number;
        total: number;
    };
} & ApiResponse;

export type SelectedProjectDataResponse = {
    data: ProjectData;
} & ApiResponse;

export type SelectedProjectDetailsResponse = {
    data: ProjectDetails;
} & ApiResponse;

export type GetProjectsResponseErrors = {
    ownership?: string;
    status?: string;
};

export type ProjectFormDataErrors = {
    title?: string;
    description?: string;
    deadline?: string;
    document_path?: string;
};

// project slice
export type ProjectsFiltersOwner = 'all' | 'owner' | 'member';
export type ProjectsFiltersStatus = 'all' | 'pending' | 'active' | 'completed' | 'closed';

export type ProjectsFilters = {
    owner: ProjectsFiltersOwner;
    status: ProjectsFiltersStatus;
};

export type ProjectsPagination = {
    currentPage: number;
    lastPage: number;
};

export type ProjectsState = {
    isLoading: boolean;
    projects: ProjectCard[];
    filters: ProjectsFilters;
    pagination: ProjectsPagination;
    total: number;
};

// create/update project
export type ProjectFormSubmitStatus = 'success' | 'error';
export type ProjectFormErrors = ProjectFormDataErrors & {
    random: string;
};

export type ProjectFormSubmitResult = {
    status: ProjectFormSubmitStatus;
    message: string;
    errors?: {
        random: string;
    } & ProjectFormDataErrors;
};