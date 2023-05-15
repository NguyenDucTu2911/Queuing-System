import React from 'react';
import "./Header.css"
import Logo from "../../../assets/image/Logoalta.png"
import avata from "../../../assets/image/avata.png"
import { NavLink, useNavigate } from 'react-router-dom'
interface HeaderProps { }

const Header: React.FC<HeaderProps> = (props) => {

    const navigate = useNavigate()

    const hendleClose = () => {
        navigate("/")
    }

    return (
        <>
            <div className="Header">
                <div className="Header-info">
                    <div className="info-avata" style={{ backgroundImage: `url(${avata})` }}>

                    </div>
                    <div className="info-name">
                        <div className="info_TopText">Xin Chào</div>
                        <div className="info_NameText">Lê Quỳnh Ái Vân</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
