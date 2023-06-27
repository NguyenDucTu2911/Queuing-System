import React, { useState } from 'react';
import { Button } from '../../container/button/Button';
import { Input } from '../../container/Input/Input';
import "./formForgotPassWord.css"
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/Hooks';
import { sendPassword, SendMaillPass } from '../../../redux/slices/AuthSlice';

interface formForgotPassWord { }

const FormForgotPassWord: React.FC<formForgotPassWord> = (props) => {

    const [email, setEmail] = useState<SendMaillPass>()
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const HandleExit = () => {
        navigate("/login")
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setEmail({ ...email, email: value });
    };

    const HandleReset = () => {
        if (email) {
            dispatch(sendPassword(email))
            navigate("/ResetPassWord")
        }
    }

    return (
        <>
            <form action="">
                <p className='ForgotPassWord-title'>Đặt lại mật khẩu</p>
                <div className="ForgotPassWord-Email">
                    <label htmlFor="Email" className='ForgotPassWord_LB'>Vui lòng nhập email để đặt lại mật khẩu của bạn *</label>
                    <Input className='ForgotPassWord_IP' name='Email' id='Emai' placeholder='Nhập emai'
                        handleChange={handleInputChange}
                    />
                </div>
                <Button className="btn-exit" onclick={HandleExit}>Hủy</Button>
                <Button type='submit' className="btn-done" onclick={HandleReset}>Tiếp Tục</Button>
            </form>

        </>
    );
};

export default FormForgotPassWord;
