import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../hooks/useRedux";
import type { AuthState } from "../types/auth";

const PublicOnlyRoute = () => {
    const { user } = useAppSelector<AuthState>(state => state.user);

    return user.is_authenticated ? <Navigate to='/profile' replace /> : <Outlet />;
};

export default PublicOnlyRoute;