import React, { useState } from 'react';
import Logo from "../../../assets/image/Logoalta.png"
import { NavLink, useNavigate } from 'react-router-dom'
import "./navbar.css"
import { useAppDispatch } from '../../../redux/Hooks';
import { SingOut } from '../../../redux/slices/AuthSlice';
interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = (props) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const hendleClose = () => {
        dispatch(SingOut())
        navigate("/login")
    }

    return (
        <>
            <div className="menuapp">
                <div className="logoNav" style={{ backgroundImage: `url(${Logo})` }} />

                <div className="dashboard">
                    <NavLink to="/Dashboard"
                        className={({ isActive }) => (isActive ? "active item" : "item")}>
                        <i className="fa-solid fa-table-columns icon"></i>
                        <p className='navText'>Dashboard</p>
                    </NavLink>
                </div>
                <div className="device">

                    <NavLink to="/device"
                        className={({ isActive }) => (isActive ? "active item" : "item")}>
                        <i className="fa-solid fa-table-columns icon"></i>
                        <p className='navText'>Thiết bị</p>
                    </NavLink>

                </div>

                <div className="Service">
                    <NavLink to="/Service"
                        className={({ isActive }) => (isActive ? "active item" : "item")}>
                        <i className="fa-solid fa-table-columns icon"></i>
                        <p className='navText'>Dịch vụ</p>
                    </NavLink>
                </div>

                <div className="number">
                    <NavLink to="/Progression"
                        className={({ isActive }) => (isActive ? "active item" : "item")}>
                        <i className="fa-solid fa-table-columns icon"></i>
                        <p className='navText'>Cấp số</p>
                    </NavLink>
                </div>

                <div className="report">
                    <NavLink to="/report"
                        className={({ isActive }) => (isActive ? "active item" : "item")}>
                        <i className="fa-regular fa-file-contract"></i>

                        <p className='navText'>Báo cáo</p>
                    </NavLink>
                </div>

                <div className={`setting item'`}>
                    <div className="setting-item" onClick={toggleDropdown}>
                        <i className="fa-solid fa-gear"></i>
                        <p className="navText">Cài đặt hệ thống</p>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                    {showDropdown && (
                        <div className="dropdown-content">
                            {/* <div className="dropdown-content_item">
                                
                            </div> */}
                            <NavLink
                                to="/RoleManagement"
                                className={({ isActive }) => (isActive ? "active dropdown-a item" : "dropdown-a item")}
                            >
                                <p className="navText">Quản lý vai trò</p>
                            </NavLink>
                            <NavLink
                                to="/AccountManagement"
                                className={({ isActive }) => (isActive ? "active dropdown-a item" : "dropdown-a item")}
                            >
                                <p className="navText">Quản lý tài khoản</p>
                            </NavLink>
                            <NavLink
                                to="/ActivityLog"
                                className={({ isActive }) => (isActive ? "active dropdown-a item" : "dropdown-a item")}
                            >
                                <p className="navText">Nhật ký người dùng</p>
                            </NavLink>
                        </div>
                    )}
                </div>


                <div className="close" onClick={hendleClose}>
                    <div className="close-btn close-text">
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <div>Đăng xuất</div>
                    </div>
                </div>

            </div >
        </>
    );
};

export default Navbar;
