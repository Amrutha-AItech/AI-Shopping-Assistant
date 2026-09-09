import { Navigate } from "react-router-dom";

const isAuthenticated = () =>
    !!localStorage.getItem("access_token");

export default function PrivateRouter({ children, redirectTo = "/login" }) {
    return isAuthenticated()
        ? children
        : <Navigate to={redirectTo} replace />;
}