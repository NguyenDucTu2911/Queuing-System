import React from 'react';
import Logo from "../../../../assets/image/Logoalta.png"
import FormLogin from '../../../form/formLogin/formLogin';
import LayoutLoginRight from './LayoutLoginRight/LayoutLoginRight';
import "./LayoutLogin.css"
interface LayoutLoginProps { }

const LayoutLogin: React.FC<LayoutLoginProps> = (props) => {
    return (
        <>
            <div className="Login">
                <div className="LoginLogo"
                    style={{ background: (`url(${Logo})`) }}
                />
                <FormLogin />
                <LayoutLoginRight />
            </div>
        </>
    );
};

export default LayoutLogin;
