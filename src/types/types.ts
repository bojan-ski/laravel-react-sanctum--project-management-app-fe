// GLOBAL
export type User = {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    role: string;
    created_at: string;
    updated_at: string;
};

export type ProjectCard = {
    id: number;
    title: string;
    description: string;
    deadline: string;
    status: string;
    is_owner: boolean;
    owner: {
        avatar: string;
        name: string;
    };
    created_at: string;
    updated_at: string;
};

export type Member = {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    joined_at: string;
};

// REDUX SLICES
export type LaravelValidationErrors = Record<string, string[]>;

// user/userSlice
export type LoginFormData = {
    email: string;
    password: string;
};

export type UserStateErrors = {
    email?: string;
    password?: string;
    random?: string;
};

export type UserState = {
    isLoading: boolean;
    user: User;
    errors: UserStateErrors;
};

// regularUser/notificationSlice
export type Notification = {
    id: number;
    type: string;
    notifiable_id: number;
    notifiable_type: string;
    data: any;
    action_taken: string | null;
    is_invitation: boolean;
    is_pending: boolean;
    read_at: string | null;
    created_at: string;
};

export type NotificationState = {
    isLoading: boolean;
    notifications: Notification[];
    unreadCount: number;
    error: string;
};

// regularUser/projectSlice
export type ProjectState = {
    isLoading: boolean;
    userProjects: ProjectCard[];
    filterOwnership: string;
    filterStatus: string;
    currentPage: number;
    lastPage: number;
    total: number;
    error: string;
};

export type ProjectFormData = {
    title: string;
    description: string;
    deadline: string;
    document_path?: File | null;
};

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
    random?: string;
};

export type NewProjectState = {
    isLoading: boolean;
    formData: ProjectFormData;
    errors: ProjectFormDataErrors;
};

// regularUser/projectMemberSlice
export type ProjectMembersState = {
    isLoading: boolean;
    availableUsers: User[];
    error: string;
};

// regularUser/profileSlice
export type ChangePasswordFormData = {
    old_password: string;
    new_password: string;
    new_password_confirm: string;
};

export type ProfileStateErrors = {
    old_password?: string;
    new_password?: string;
    new_password_confirm?: string;
    random?: string;
};

export type ProfileState = {
    isLoading: boolean;
    changePasswordFormData: ChangePasswordFormData;
    errors: ProfileStateErrors;
};

// adminUser/createUserSlice
export type NewUserFormData = {
    name: string;
    email: string;
    password: string;
};

export type CreateNewUserErrors = {
    name?: string;
    email?: string;
    password?: string;
    random?: string;
};

export type NewUserState = {
    isLoading: boolean;
    formData: NewUserFormData;
    errors: CreateNewUserErrors;
};

// adminUser/usersSlice
export type UsersState = {
    isLoading: boolean;
    users: User[];
    search: string;
    currentPage: number;
    lastPage: number;
    total: number;
    error: string;
};