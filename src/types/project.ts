import type { Member } from "./member";
import type { Document } from "./document";

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

export type ProjectCard = {
    owner: ProjectOwner;
    is_owner: boolean;
} & Project;

export type ProjectData = {
    document: Document;
} & Project;

export type ProjectDetails = {
    owner: ProjectOwner;
    is_owner: boolean;
    members: Member[];
} & ProjectData;

// api response
export type GetProjectsResponse = {
    status: 'success';
    message: string;
    data: ProjectCard[];
};

export type SelectedProjectDataResponse = {
    status: 'success';
    message: string;
    data: ProjectData;
};

export type SelectedProjectDetailsResponse = {
    status: 'success';
    message: string;
    data: ProjectDetails;
};

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