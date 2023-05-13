import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/LoginPage/Login";
import App from "../App";
import ErrorPage from "../components/container/404ErrorPage/ErrorPage";
import ForgotPassWord from "../pages/LoginPage/ForgotPassWord";
import ResetPassWord from "../pages/LoginPage/ResetPassWord";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/ForgotPassWord",
        element: <ForgotPassWord />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/ResetPassWord",
        element: <ResetPassWord />,
        errorElement: <ErrorPage />,
    }

]);

export default router;