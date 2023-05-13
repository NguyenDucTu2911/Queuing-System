import React from 'react';
import Logo from "../../assets/image/Logoalta.png"
import LayoutForgot from '../../components/container/Layout/layoutForgot/layoutForgot';
import FormResetPassword from '../../components/form/formForgotPassWord/formResetPassword/formResetPassword';
interface ResetPassWordProps { }

const ResetPassWord: React.FC<ResetPassWordProps> = (props) => {
    return (
        <>
            <div className="Login">
                <div className="LoginLogo"
                    style={{ background: (`url(${Logo})`) }}
                />
                <FormResetPassword />
                <LayoutForgot />
            </div>
        </>
    );
};

export default ResetPassWord;
