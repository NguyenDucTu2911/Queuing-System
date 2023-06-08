import React, { useEffect, useState } from 'react';
import { Input } from '../../container/Input/Input';
import { Button } from '../../container/button/Button';

import "./FormLogin.css"
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks';
import { DataState, login } from '../../../redux/slices/AuthSlice';

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import { RootState } from '../../../redux/Store';
import useLocalStorage from '../../customHook/useLocalStorage';

interface ILoginState {
    username: string;
    password: string;
    errors: {
        username?: string;
        password?: string;
        message?: string;
    };
};

const FormLogin: React.FC = () => {
    const [showpass, setShowpass] = useState(false)
    const [loginState, setLoginState] = useState<ILoginState>({
        username: "",
        password: "",
        errors: {},
    });
    const authenticated = useAppSelector((state: RootState) => state.auth.authenticated);
    const error = useAppSelector((state: RootState) => state.auth.error);
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    console.log(error)
    // console.log("hello", checkAuth)

    useEffect(() => {
        LoginSuccess()
    }, [authenticated])

    const LoginSuccess = () => {
        authenticated ? navigate("/Dashboard") : navigate("/")
    }

    const handleForgotPassWord = () => {
        navigate("/ForgotPassWord")
    }

    const togglePassword = () => {
        setShowpass(!showpass)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // const { name, value } = event.target;

        const { name, value } = event.target;

        // Validate input
        let errors = { ...loginState.errors };
        switch (name) {
            case "username":
                errors.username =
                    value.length < 5 ? "Tên đăng nhập ít nhất 5 ký tự" : undefined;
                break;
            case "password":
                errors.password =
                    value.length < 8
                        ? "Mật khẩu phải có ít nhất 8 ký tự"
                        : undefined;
                break;
            default:
                break;
        }

        setLoginState({
            ...loginState,
            [name]: value,
            errors,
        });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let errors = { ...loginState.errors };
        if (!loginState.username) {
            errors.username = "Bạn chưa nhập tên đăng nhập";
        }
        if (!loginState.password) {
            errors.password = "Bạn chưa nhập mật khẩu";
        }

        // Submit form if there are no errors
        if (!errors.username && !errors.password) {
            try {
                const email = loginState.username;
                const password = loginState.password
                await dispatch(login({ email, password }))
            } catch (error) {
                errors.password = "sai tai khoan mat khau"
            }

        } else {
            setLoginState({ ...loginState, errors });
        }
    }

    return (

        <>
            <form onSubmit={handleSubmit}>
                <div className="LoginName">
                    <label htmlFor="username" className='LB'>Tên đăng nhập *</label>
                    {loginState.errors.username && <span className='error-sp'>{loginState.errors.username}</span>}
                    <Input type='text' className={loginState.errors.username || error ? "input-errorLogin" : 'IP'} placeholder='Tên Đăng Nhập' name='username' id='username'
                        handleChange={handleInputChange}
                    />
                </div>
                <div className="LoginPass">
                    <label htmlFor="password" className='LB'>Mật khẩu *</label>
                    {loginState.errors.password && <span className='error-sp'>{loginState.errors.password}</span>}
                    <Input type={showpass ? 'text' : 'password'}
                        className={loginState.errors.password || error ? "input-errorLogin" : 'IP'}
                        placeholder='Mật Khẩu' name='password' id='password'
                        handleChange={handleInputChange}
                    />
                    <div className="show" onClick={togglePassword}>
                        {

                            showpass ? <i className={`fa-regular fa-eye`} /> :
                                <i className="fa-regular fa-eye-slash"></i>
                        }
                    </div>
                    {error && <span className='error-message'>{error}</span>}
                </div>
                <div className="ForgotPassWord" onClick={handleForgotPassWord}>
                    Quên mật khẩu?
                </div>
                <Button type='submit' className='Button-Login'>Đăng nhập </Button>
            </form>
        </>
    );
};

export default FormLogin;
