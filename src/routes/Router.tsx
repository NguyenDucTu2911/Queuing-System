import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/LoginPage/Login";
import App from "../App";
import ErrorPage from "../components/container/404ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
     
]);

export default router;