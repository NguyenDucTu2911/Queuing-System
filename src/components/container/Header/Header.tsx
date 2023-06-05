import React, { useEffect, useState } from 'react';
import "./Header.css"
import Logo from "../../../assets/image/Logoalta.png"
import avata from "../../../assets/image/avata.png"
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import useLocalStorage from '../../customHook/useLocalStorage';
import { SignInData } from '../../../redux/Slices/authSlice';
import { useLocation } from 'react-router-dom';
// import { Breadcrumb } from 'antd';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { ActivityLogs, fetchActivityLog } from '../../../redux/Slices/accountSlice';
import useSessionStorage from '../../customHook/useSessionStorage';
interface HeaderProps { }

const Header: React.FC<HeaderProps> = (props) => {
    const userSelector = useAppSelector((state: RootState) => state.auth.data)
    const ActivityLogData = useAppSelector((state: RootState) => state.account.Account)
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const [user, setUser] = useLocalStorage<Partial<SignInData>>("user", {})
    const [ActivityLog, setActivityLog] = useSessionStorage<ActivityLogs[]>("ActivityLog", [])
    const [isOpen, SetIsOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        dispatch(fetchActivityLog())
        if (userSelector) {
            setUser(userSelector)
        }
    }, [userSelector])

    useEffect(() => {
        dispatch(fetchActivityLog())
        if (ActivityLogData) {
            setActivityLog(ActivityLogData)
        }
    }, [])

    const handleInfo = () => {
        navigate("/profile")
    }

    const handeleOpen = () => {
        SetIsOpen(!isOpen)
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
                    <Breadcrumb/>
                </nav>
                <div className={`Header-announcement ${isOpen ? 'active' : ''}`} onClick={handeleOpen}>
                    <i className="fa-solid fa-bell icon-bell"></i>
                    <div className={isOpen ? "popUpActive" : "popUp"}>
                        <header className="Header-popUp">
                            <p className='Header-popUp_announcement'>Thông Báo</p>
                        </header>
                        <body className='body-popUp'>
                            {
                                !ActivityLog ? (
                                    <div className="body-popUp_item">
                                        <p className='body-popUp-name'>Không có Thông báo</p>
                                        <i className="fa-solid fa-exclamation"></i>
                                    </div>
                                ) :
                                    (
                                        ActivityLog && ActivityLog.map((item) => (
                                            <div className="body-popUp_item">
                                                <p className='body-popUp-name'>Người dùng: {item.Name}</p>
                                                <p className='body-popUp-des'>Thời gian nhận số: 12h20 ngày 30/11/2021</p>
                                            </div>
                                        ))
                                    )

                            }
                        </body>
                    </div>
                </div>

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
