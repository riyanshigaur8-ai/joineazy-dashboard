import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const ProtectedRoute = ({ allowedRole }) => {
    const {currentUser, isAuthenticated} = useAuth();

    //check whether the user is logged in
    if(!isAuthenticated){
        return <Navigate to="/login" replace />;
    }

    //check whether the user has the required role
    if(allowedRole && currentUser.role !== allowedRole){
        return (
            <Navigate
            to={currentUser.role === "admin" ? "/admin" : "/student"}
            />
        );
    }
    return <Outlet />;
    };

export default ProtectedRoute;
    