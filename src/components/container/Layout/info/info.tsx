import React from 'react';
import Header from '../../Header/Header';
import Navbar from '../../nav/navbar';
import "./info.scss"
import { Input } from '../../Input/Input';
import useLocalStorage from '../../../customHook/useLocalStorage';
import { SignInData } from '../../../../redux/Slices/authSlice';
import intro from "../../../../assets/image/intro.png"
interface InfoProps { }

const Info: React.FC<InfoProps> = (props) => {

    const [user, setUser] = useLocalStorage<Partial<SignInData>>("user", {})

    return (
        <>
            <div className="info">
                <Header />
                <Navbar />


                <div className="formUser">
                    <div className="profile">
                        <div className="profile-avata" style={{ backgroundImage: `url(${intro})` }} />
                        <div className="profile-name">{user.name}</div>
                    </div>

                    <div className="formUser-Detail">
                        <div className="detail-userName">
                            <label htmlFor="userName" className='formUser-Lb'>Tên người dùng</label>
                            <Input type="text" className='formUser-Ip form-text' name='userName' id='userName'
                                value={user.name} disabled
                            />
                        </div>

                        <div className="detail-phone">
                            <label htmlFor="Phone" className='formUser-Lb'>Số điện thoại</label>
                            <Input type="text" className='formUser-Ip form-text' name='phone' id='phone'
                                value={"12132423"} disabled
                            />
                        </div>

                        <div className="detail-Email">
                            <label htmlFor="Email" className='formUser-Lb'>Email</label>
                            <Input type="text" className='formUser-Ip form-text' name='Email' id='Email'
                                value={user.email} disabled
                            />
                        </div>

                        <div className="detail-nameLogin">
                            <label htmlFor="nameLogin" className='formUser-Lb'>Tên Đăng Nhập</label>
                            <Input type="text" className='formUser-Ip form-text' name='nameLogin' id='nameLogin'
                                value={user.email} disabled
                            />
                        </div>

                        <div className="detail-pass">
                            <label htmlFor="nameLogin" className='formUser-Lb'>Mật Khẩu</label>
                            <Input type="text" className='formUser-Ip form-text' name='nameLogin' id='nameLogin'
                                value={'Ductu@7890'} disabled
                            />
                        </div>

                        <div className="detail-position">
                            <label htmlFor="position" className='formUser-Lb'>Mật Khẩu</label>
                            <Input type="text" className='formUser-Ip form-text' name='position' id='position'
                                value={'Kế Toán'} disabled
                            />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Info;
