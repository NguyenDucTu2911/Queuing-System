import React from 'react';
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import './Breadcrumbs.scss';

const routes = [
    { path: "/Dashboard", breadcrumb: "Dashboard" },
    { path: "/device", breadcrumb: "Thiết Bị" },
    { path: "/device/:id", breadcrumb: "Chi Tiết Thiết Bị" },
    { path: "/device/add", breadcrumb: "Thêm Thiết Bị" },
    { path: "/device/Edit/:id", breadcrumb: "Cập Nhật Thiết Bị" },
    { path: "/Service", breadcrumb: "Danh sách dịch vụ" },
    { path: "/Service/Add", breadcrumb: "Thêm dịch vụ" },
    { path: "Service/:id", breadcrumb: "Chi Tiết" },
    { path: "/Service/edit/:id", breadcrumb: "Cập Nhật" },
    { path: "/Progression", breadcrumb: "Danh sách cấp số" },
    { path: "/Progression/ProgressionAdd", breadcrumb: "Cấp số mới" },
    { path: "/Progression/ProgressionDetail/:id", breadcrumb: "Chi Tiết" },
    { path: "/report", breadcrumb: "Lập báo cáo" },
    { path: "/RoleManagement", breadcrumb: "Quản lý vai trò" },
    { path: "/RoleManagement/RoleManagementUpdate/:id", breadcrumb: "Cập nhật vai trò" },
    { path: "/RoleManagementAdd", breadcrumb: "Thêm vai trò" },
    { path: "/AccountManagement", breadcrumb: "Quản lý tài khoản" },
    { path: "/AccountManagementAdd", breadcrumb: "Thêm tài khoản" },
    { path: "/AccountManagement/AccountManagementUpdate/:id", breadcrumb: "Cập nhật tài khoản" },
    { path: "/ActivityLog", breadcrumb: "Nhật ký hoạt động" },
];

const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs(routes);

    const filteredBreadcrumbs = breadcrumbs.filter(({ breadcrumb }) => breadcrumb !== 'Home');

    return (
        <div className="breadcrumb">
            {filteredBreadcrumbs.map(({ match, breadcrumb }, index) => (
                <React.Fragment key={match.pathname}>
                    {index > 0 && <span className="breadcrumb-arrow">{'>'}</span>}
                    <Link className="breadcrumb-item" to={match.pathname}>
                        {breadcrumb}
                    </Link>
                </React.Fragment>
            ))}
        </div>
    );
};

export default Breadcrumbs;
