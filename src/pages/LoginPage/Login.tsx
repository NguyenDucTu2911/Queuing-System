import React from 'react';
import Logo from "../../assets/image/Logoalta.png"
import FormLogin from '../../components/form/formLogin/formLogin';
import LayoutLogin from '../../components/container/Layout/layoutLogin/LayoutLogin';
import "./Login.css"

const Login: React.FC = () => {
  return (
    <div className="Login">
      <div className="LoginLogo"
        style={{ background: (`url(${Logo})`) }}
      />
      <FormLogin/>
      <LayoutLogin />
    </div>
  );
};

export default Login;
