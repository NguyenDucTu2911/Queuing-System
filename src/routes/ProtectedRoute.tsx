import { Outlet, useNavigate } from "react-router-dom";
interface ProtectedRouteProps {
    children: React.ReactNode;
}


export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const navigate = useNavigate();

    if (!localStorage.getItem("accessToken")) {
        navigate("/login")
    }

    return (
        <Outlet />
    )
}