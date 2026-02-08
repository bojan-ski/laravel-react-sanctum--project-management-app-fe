export type ProjectStatus = 'pending' | 'active' | 'completed' | 'closed';

export type ProjectOwner = {
    avatar: string;
    name: string;
};

export type ProjectCard = {
    id: number;
    title: string;
    description: string;
    deadline: string;
    status: ProjectStatus;
    is_owner: boolean;
    owner: ProjectOwner;
    created_at: string;
    updated_at: string;
};

// api response
export type GetProjectsResponse = {
    status: 'success';
    message: string;
    data: ProjectCard[];
};

export type GetProjectsResponseErrors = {
    ownership?: string;
    status?: string;
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
export type ProjectFormSubmit = {
    status: 'fulfilled' | 'rejected';
    message: string;
    errors?: any;
};

export type ProjectFormDataErrors = {
    title?: string;
    description?: string;
    deadline?: string;
    document_path?: string;
};