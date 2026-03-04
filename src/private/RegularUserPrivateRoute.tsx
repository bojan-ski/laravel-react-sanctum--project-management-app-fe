import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../hooks/useRedux";
import type { AuthState } from "../types/auth";

const RegularUserPrivateRoute = () => {
    const { user } = useAppSelector<AuthState>(state => state.user);        

    return user.is_admin ? <Navigate to='/profile' replace />: <Outlet />
};

export default RegularUserPrivateRoute;