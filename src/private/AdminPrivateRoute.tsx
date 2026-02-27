import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../hooks/useRedux";
import type { AuthState } from "../types/auth";

const AdminPrivateRoute = () => {
    const { user } = useAppSelector<AuthState>(state => state.user);    

    return user.is_admin ? <Outlet /> : <Navigate to='/profile' replace />;
};

export default AdminPrivateRoute;