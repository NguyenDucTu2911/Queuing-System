import React from 'react';
import Logo from "../../assets/image/Logoalta.png"
import FormForgotPassWord from '../../components/form/formForgotPassWord/formForgotPassWord';
import LayoutForgot from '../../components/container/layout/layoutForgot/layoutForgot';
interface ForgotPassWordProps { }

const ForgotPassWord: React.FC<ForgotPassWordProps> = (props) => {
    return (
        <>
            <div className="Login">
                <div className="LoginLogo"
                    style={{ background: (`url(${Logo})`) }}
                />
                <FormForgotPassWord />
                <LayoutForgot />
            </div>
        </>
    );
};

export default ForgotPassWord;
