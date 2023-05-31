import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import "./Breadcrumbs.scss"
const routes = [
    { path: "/Dashboard", breadcrumb: "Dashboard" },
    { path: "/device", breadcrumb: "Thiết Bị" },
    { path: "/device/:id", breadcrumb: "Chi Tiết Thiết Bị" },
    { path: "/device/Edit/:id", Breadcrumb: "Cập Nhật Thiết Bị" }
];

// map & render your breadcrumb components however you want.
const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs(routes);

    return (
        <div className="breadcrumb">
            {breadcrumbs.map(({ match, breadcrumb }) => (
                <Link className="breadcrumb-item" key={match.pathname} to={match.pathname}>
                    {breadcrumb}
                </Link>
            ))}
        </div>
    );
};
export default Breadcrumbs;
