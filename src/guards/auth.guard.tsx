import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext, UserProps } from "../context/UserContext";
import { PublicRoutes } from "../models/routes";

export const AuthGuard = () => {
    const {user} = useContext<UserProps>(UserContext);
    return user ? <Outlet/> : <Navigate replace to={PublicRoutes.LOGIN}/>
}

export default AuthGuard;