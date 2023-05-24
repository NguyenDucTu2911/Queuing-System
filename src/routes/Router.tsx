import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/LoginPage/Login";
import ErrorPage from "../components/container/404ErrorPage/ErrorPage";
import ForgotPassWord from "../pages/LoginPage/ForgotPassWord";
import ResetPassWord from "../pages/LoginPage/ResetPassWord";
import Dashboard from "../pages/DashboardPage/Dashboard";
import Device from "../pages/DevicePage/device";
import Report from "../pages/ReportPage/report";
import Service from "../pages/ServicePage/Service";
import Info from "../components/container/Layout/info/info";
import FormAddDevice from "../components/form/formdevice/formAddDevice";
import DeviceDetail from "../pages/DevicePage/deviceDetail/deviceDetail";
import DeviceEdit from "../pages/DevicePage/deviceEdit/deviceEdit";
import ServiceAdd from "../pages/ServicePage/ServiceAdd/ServiceAdd";
import ServiceDetail from "../pages/ServicePage/ServiceDetail/ServiceDetail";
import ServiceEdit from "../pages/ServicePage/ServiceEdit/ServiceEdit";
import Progression from "../pages/progression/progression";
import ProgressionAdd from "../pages/progression/ProgressionAdd/ProgressionAdd";
import ProgressionDetail from "../pages/progression/ProgressionDetail/ProgressionDetail";

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
    },
    {
        path: "/Dashboard",
        element: <Dashboard />,
        errorElement: <ErrorPage />,


    },
    {
        path: "/device",
        element: <Device />,
        errorElement: <ErrorPage />,
        // children: [
        //     {
        //         path: "/device/add",
        //         element: <FormAddDevice />,
        //         errorElement: <ErrorPage />,
        //         children: [
        //             {
        //                 path: ":id",
        //                 element: <FormAddDevice />,
        //                 errorElement: <ErrorPage />,
        //             }
        //         ]

        //     },
        // ],
    },
    {
        path: "/Progression",
        element: <Progression />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/report",
        element: <Report />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/Service",
        element: <Service />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/profile",
        element: <Info />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/device/add",
        element: <FormAddDevice />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/device/:id",
        element: <DeviceDetail />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/device/Edit/:id",
        element: <DeviceEdit />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/Service/Add",
        element: <ServiceAdd />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/Service/:id",
        element: <ServiceDetail />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/Service/edit/:id",
        element: <ServiceEdit />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/Progression/ProgressionDetail/:id",
        element: <ProgressionDetail />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/Progression/ProgressionAdd",
        element: <ProgressionAdd />,
        errorElement: <ErrorPage />,
    }

]);

export default router;