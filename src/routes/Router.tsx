import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../pages/loginPage/Login";
import ErrorPage from "../components/container/404ErrorPage/ErrorPage";
import ForgotPassWord from "../pages/loginPage/ForgotPassWord";
import ResetPassWord from "../pages/loginPage/ResetPassWord";
import Dashboard from "../pages/dashboardPage/Dashboard";
import Device from "../pages/devicePage/device";
import Report from "../pages/reportPage/report";
import Service from "../pages/servicePage/Service";
import Info from "../components/container/layout/info/info";
import FormAddDevice from "../components/form/formdevice/formAddDevice";
import DeviceDetail from "../pages/devicePage/deviceDetail/deviceDetail";
import DeviceEdit from "../pages/devicePage/deviceEdit/deviceEdit";
import ServiceAdd from "../pages/servicePage/serviceAdd/ServiceAdd";
import ServiceDetail from "../pages/servicePage/serviceDetail/ServiceDetail";
import ServiceEdit from "../pages/servicePage/serviceEdit/ServiceEdit";
import Progression from "../pages/progression/progression";
import ProgressionAdd from "../pages/progression/progressionAdd/ProgressionAdd";
import ProgressionDetail from "../pages/progression/progressionDetail/ProgressionDetail";
import RoleManagement from "../pages/settingPage/rolemanagement/Rolemanagement";
import RoleManagementAdd from "../pages/settingPage/rolemanagement/roleManagementAdd/RoleManagementAdd";
import RoleManagementUpdate from "../pages/settingPage/rolemanagement/roleManagementUpdate/RoleManagementUpdate";
import AccountManagement from "../pages/settingPage/accountmanagement/AccountManagement";
import AccountManagementUpdate from "../pages/settingPage/accountmanagement/accountmanagementUpdate/AccountManagementUpdate";
import AccountManagementAdd from "../pages/settingPage/accountmanagement/accountManagementAdd/AccountManagementAdd";
import ActivityLog from "../pages/settingPage/activityLog/ActivityLog";
import AuthProvider from "../context/AuthProvider";

const AuthLayout = () => {
    return <AuthProvider><Outlet /></AuthProvider>
}


const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/login",
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
            },
            {
                path: "/RoleManagement",
                element: <RoleManagement />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/RoleManagementAdd",
                element: <RoleManagementAdd />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/RoleManagement/RoleManagementUpdate/:id",
                element: <RoleManagementUpdate />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/AccountManagement",
                element: <AccountManagement />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/AccountManagementAdd",
                element: <AccountManagementAdd />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/AccountManagement/AccountManagementUpdate/:id",
                element: <AccountManagementUpdate />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/ActivityLog",
                element: <ActivityLog />,
                errorElement: <ErrorPage />,

            }
        ]
    }

]);

export default router;