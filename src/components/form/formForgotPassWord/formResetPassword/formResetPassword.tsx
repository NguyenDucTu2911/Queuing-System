import React, { useState } from 'react';
import "./FormResetPassword.css"
import { Input } from '../../../container/Input/Input';
import { Button } from '../../../container/Button/Button';
import { forgotPass } from '../../../../redux/Slices/authSlice';

interface FormResetPasswordProps { }



const FormResetPassword: React.FC<FormResetPasswordProps> = (props) => {
    const [showpass, setShowpass] = useState(false)
    const [Password, setPassword] = useState<Partial<forgotPass>>({});
    const [PasswordError, setPasswordError] = useState<Partial<forgotPass>>({});
    console.log(Password)

    const togglePassword = () => {
        setShowpass(!showpass)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPassword({ ...Password, [name]: value });

    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const minLength = 8;
        const specialChars = /[!@#$%^&*()\-+=\[\]{}|\\:;"'<>,.?/]/;
        const uppercaseChars = /[A-Z]/;
        const lowercaseChars = /[a-z]/;
        const numbers = /[0-9]/;

        const errors: Partial<forgotPass> = {};

        if (!Password.NewPassword) {
            errors.NewPassword = "Vui lòng nhập mật khẩu"
        } else if (Password.NewPassword.length < minLength
            && !specialChars.test(Password.NewPassword.trim())
            && !uppercaseChars.test(Password.NewPassword.trim())
            && !lowercaseChars.test(Password.NewPassword.trim())
            && !numbers.test(Password.NewPassword.trim())
        ) {
            errors.NewPassword = "mật khẩu chứ ký tự hoa thường ít nhất 8 ký tự "
        }
        if (Password.NewPassword !== Password.password) {
            errors.NewPassword = "mật khẩu khác nhau"
            errors.password = "mật khẩu khác nhau"
        }

        console.log("ádiasd", Password.NewPassword)

        setPasswordError(errors)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p className='ResetPassWord-title'>Đặt lại mật khẩu mới</p>
                <div className="ResetPassWord">
                    <label htmlFor="NewPassword" className='ResetPassWord-LB'>Mật khẩu </label>
                    {PasswordError.NewPassword && <span className='error-sp'>{PasswordError.NewPassword}</span>}
                    <Input type={showpass ? 'text' : 'password'} className='ResetPassWord-IP' name='NewPassword' id='NewPassword' placeholder='Mật Khẩu'
                        handleChange={handleInputChange}
                    ></Input>
                    <div className="show" onClick={togglePassword}>
                        {
                            showpass ? <i className={`fa-regular fa-eye`} /> :
                                <i className="fa-regular fa-eye-slash"></i>
                        }
                    </div>
                </div>
                <div className="EnterPassWord">
                    <label htmlFor="reviewPassword" className='ResetPassWord-LB'>Nhập lại mật khẩu </label>
                    {PasswordError.password && <span className='error-sp'>{PasswordError.password}</span>}
                    <Input type={showpass ? 'text' : 'password'} className='ResetPassWord-IP' name='reviewPassword' id='reviewPassword' placeholder='Nhập lại mật khẩu'
                        handleChange={handleInputChange}
                    ></Input>
                    <div className="show" onClick={togglePassword}>
                        {

                            showpass ? <i className={`fa-regular fa-eye`} /> :
                                <i className="fa-regular fa-eye-slash"></i>
                        }
                    </div>
                </div>
                <Button type='submit' className="btn-confirm">Xác nhận</Button>
            </form>
        </>
    );
};

export default FormResetPassword;
