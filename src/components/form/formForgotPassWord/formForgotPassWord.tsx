import React from 'react';
import { Button } from '../../container/Button/Button';
import { Input } from '../../container/Input/Input';
import "./formForgotPassWord.css"
import { useNavigate } from 'react-router-dom';

interface formForgotPassWord { }

const FormForgotPassWord: React.FC<formForgotPassWord> = (props) => {

    const navigate = useNavigate();

    const HandleExit = () => {
        navigate("/")
    }

    const HandleReset = () => {
        navigate("/ResetPassWord")

    }

    return (
        <>
            <form action="">
                <p className='ForgotPassWord-title'>Đặt lại mật khẩu</p>
                <div className="ForgotPassWord-Email">
                    <label htmlFor="Email" className='ForgotPassWord_LB'>Vui lòng nhập email để đặt lại mật khẩu của bạn *</label>
                    <Input className='ForgotPassWord_IP' name='Email' id='Emai' placeholder='Nhập emai' />
                </div>
                <Button className="btn-exit" onclick={HandleExit}>Hủy</Button>
                <Button type='submit' className="btn-done" onclick={HandleReset}>Tiếp Tục</Button>
            </form>

        </>
    );
};

export default FormForgotPassWord;
