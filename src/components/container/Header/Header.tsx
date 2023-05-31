import React, { useEffect, useState } from 'react';
import "./Header.css"
import Logo from "../../../assets/image/Logoalta.png"
import avata from "../../../assets/image/avata.png"
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import useLocalStorage from '../../customHook/useLocalStorage';
import { SignInData } from '../../../redux/Slices/authSlice';
import { useLocation } from 'react-router-dom';
// import { Breadcrumb } from 'antd';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
interface HeaderProps { }

const Header: React.FC<HeaderProps> = (props) => {

    const userSelector = useAppSelector((state: RootState) => state.auth.data)
    const navigate = useNavigate();

    const [user, setUser] = useLocalStorage<Partial<SignInData>>("user", {})
    const location = useLocation()


    useEffect(() => {
        if (userSelector) {
            setUser(userSelector)
        }
    }, [userSelector])
    const handleInfo = () => {
        navigate("/profile")
    }



    return (
        <>
            <div className="Header">
                <nav aria-label="breadcrumb">
                    {/* <Breadcrumb
                        items={[
                            {
                                title: <a className='breadcrumb-item' href={location.pathname}>Dashboard</a>,
                            },
                        ]}
                    /> */}
                    <Breadcrumb />
                </nav>
                <div className="Header-info">
                    <div className="info-avata" style={{ backgroundImage: `url(${avata})` }}>

                    </div>
                    <div className="info-name" onClick={handleInfo}>
                        <div className="info_TopText">Xin Chào</div>
                        <div className="info_NameText">{user.name}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
