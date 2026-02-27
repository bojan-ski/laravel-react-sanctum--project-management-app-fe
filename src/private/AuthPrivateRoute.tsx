import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../hooks/useRedux";
import type { AuthState } from "../types/auth";

const AuthPrivateRoute = () => {
    const { user } = useAppSelector<AuthState>(state => state.user);    

    return user.is_authenticated ? <Outlet /> : <Navigate to='/' replace />;
};

export default AuthPrivateRoute;