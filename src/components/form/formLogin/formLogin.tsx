import React from 'react';
import { Input } from '../../container/Input/Input';
import { Button } from '../../container/Button/Button';
import "./FormLogin.css"
interface FormLoginProps { }

const FormLogin: React.FC<FormLoginProps> = (props) => {
    return (
        <>
            <form action="">
                <div className="LoginName">
                    <label htmlFor="Name" className='LB'>Tên đăng nhập *</label>
                    <Input type='text' className='IP' placeholder='Tên Đăng Nhập' name='Name' id='Name' />
                </div>
                <div className="LoginPass">
                    <label htmlFor="Pass" className='LB'>Mật khẩu *</label>
                    <Input type='text' className='IP' placeholder='Mật Khẩu' name='Pass' id='Pass' />
                </div>
                <div className="ForgotPassWord">
                    Quên mật khẩu?
                </div>
                <Button type='submit' className='Button-Login'>Đăng nhập</Button>
            </form>
        </>
    );
};

export default FormLogin;
