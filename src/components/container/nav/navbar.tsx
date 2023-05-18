import React from 'react';
import Logo from "../../../assets/image/Logoalta.png"
import { NavLink, useNavigate } from 'react-router-dom'
import "./navbar.css"
import { useAppDispatch } from '../../../redux/hooks';
import { logout } from '../../../redux/Slices/authSlice';
interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = (props) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const hendleClose = () => {
        dispatch(logout())
        navigate("/")
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
                    <NavLink to="/capso"
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

                <div className="setting">

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
