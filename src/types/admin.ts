import type { ApiResponse } from "./api";
import type { ProjectCard, ProjectsPagination } from "./project";
import type { User } from "./user";

// USERS
export type RegularUserDetails = {
    owned_projects_count: number;
    member_projects_count: number;
    total_projects: number;
    recent_projects: ProjectCard[];
} & ApiResponse;

// api response
export type GetUsersResponse = {
    data: {
        data: User[];
        current_page: number;
        last_page: number;
        total: number;
    };
} & ApiResponse;

export type AddNewUserErrors = {
    name?: string;
    email?: string;
    password?: string;
};

export type AddNewUserFormErrors = AddNewUserErrors & {
    random: string;
};

export type AddNewUserResponse = {
    data: User,
    errors?: AddNewUserFormErrors;
} & ApiResponse;

export type GetRegularUserDetailsResponse = {
    data: RegularUserDetails;
} & ApiResponse;

export type DeleteUserResponse = {
    data: {
        id: number,
    };
} & ApiResponse;

// users slice
export type UsersState = {
    isLoading: boolean;
    search: string;
    users: User[];
    pagination: ProjectsPagination;
    total: number;
};

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

// projects slice
export type AllProjectsState = {
    isLoading: boolean;
    stats: AllProjectStats;
    projects: ProjectCard[];
    search: string;
    pagination: ProjectsPagination;
    total: number;
};