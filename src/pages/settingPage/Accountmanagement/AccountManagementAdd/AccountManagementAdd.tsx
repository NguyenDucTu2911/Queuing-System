import React, { useState } from 'react';
import { User, newUser } from '../../../../redux/Slices/accountSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../redux/hooks';
import Navbar from '../../../../components/container/nav/navbar';
import Header from '../../../../components/container/Header/Header';
import { Input } from '../../../../components/container/Input/Input';
import { Button } from '../../../../components/container/Button/Button';

interface AccountManagementAddProps { }

const AccountManagementAdd: React.FC<AccountManagementAddProps> = (props) => {
  const [showpass, setShowpass] = useState(false)
  const [UserData, setUserData] = useState<Partial<User>>({})
  const [errors, setErrors] = useState<Partial<User>>({})
  const navigate = useNavigate()
  const dispatch = useAppDispatch()


  const togglePassword = () => {
    setShowpass(!showpass)
  }

  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserData({
      ...UserData,
      [name]: value
    })

    if (name === 'Name') {
      setErrors((prevState) => ({
        ...prevState,
        Name: value.trim() ? '' : 'Vui lòng nhập Họ Tên',
      }));
    } else if (name === 'SDT') {
      setErrors((prevState) => ({
        ...prevState,
        SDT: value.trim() ? '' : 'Vui lòng nhập Số Điện Thoại',
      }));
    } else if (name === 'email') {
      setErrors((prevState) => ({
        ...prevState,
        email: value.trim() ? (validateEmail(value) ? '' : 'Email không hợp lệ') : 'Vui lòng nhập Email',
      }));
    } else if (name === 'UserName') {
      setErrors((prevState) => ({
        ...prevState,
        UserName: value.trim() ? '' : 'Vui lòng nhập Tên Đăng Nhập',
      }));
    } else if (name === 'password') {
      setErrors((prevState) => ({
        ...prevState,
        password: value.trim() ? '' : 'Vui lòng nhập Mật khẩu',
      }));
    } else if (name === 'reviewPassword') {
      setErrors((prevState) => ({
        ...prevState,
        reviewPassword: value.trim() ? '' : 'Vui lòng nhập lại Mật khẩu',
      }));
    }
  }

  const isFormValid = (): boolean => {
    const { Name, SDT, email, UserName, password, reviewPassword } = UserData;
    let isValid = true;

    // Kiểm tra tính hợp lệ của các trường
    if (!Name?.trim()) {
      setErrors((prevState) => ({
        ...prevState,
        Name: 'Vui lòng nhập Họ Tên',
      }));
      isValid = false;
    }

    if (!SDT?.trim()) {
      setErrors((prevState) => ({
        ...prevState,
        SDT: 'Vui lòng nhập Số Điện Thoại',
      }));
      isValid = false;
    }

    if (email !== undefined) {
      if (!email.trim()) {
        setErrors((prevState) => ({
          ...prevState,
          email: 'Vui lòng nhập Email',
        }));
        isValid = false;
      } else if (!validateEmail(email)) {
        setErrors((prevState) => ({
          ...prevState,
          email: 'Email không hợp lệ',
        }));
        isValid = false;
      }
    } else {
      setErrors((prevState) => ({
        ...prevState,
        email: 'Vui lòng nhập Email',
      }));
      isValid = false;
    }


    if (!UserName?.trim()) {
      setErrors((prevState) => ({
        ...prevState,
        UserName: 'Vui lòng nhập Tên Đăng Nhập',
      }));
      isValid = false;
    }

    if (!password?.trim()) {
      setErrors((prevState) => ({
        ...prevState,
        password: 'Vui lòng nhập Mật khẩu',
      }));
      isValid = false;
    }

    // if (!reviewPassword?.trim()) {
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     reviewPassword: 'Vui lòng nhập lại Mật khẩu',
    //   }));
    //   isValid = false;
    // }

    return isValid;
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(isFormValid())
    console.log(errors)
    if (isFormValid()) {
      dispatch(newUser(UserData as User))
      navigate("/AccountManagement")
    } else {
      throw new Error("Thêm Không Thành Công")
    }
  };
  return (
    <>
      <div className="AccountManagementUpdate">
        <Navbar />
        <Header />
        <div className="AccountManagementUpdate-title">
          Quản lý tài khoản
        </div>
        <form onSubmit={handleSubmit}>
          <div className="AccountManagementUpdate-form">
            <div className="AccountManagementUpdate-form_title">Thông tin tài khoản</div>
            <div className="AccountManagementUpdate-form_name">
              <label className='AccountManagementUpdate-form_LB'>Họ Tên
                <p className='errorStart'>*</p>
              </label>
              <Input className={errors.Name ? "errorIp" : 'AccountManagementUpdate-form_Ip'} placeholder='Nhập Họ Tên' name='Name' id='Name'
                value={UserData.Name}
                handleChange={handleInputChange}
              />
              {errors.Name && <p className='errorMessage'>{errors.Name}</p>}
            </div>
            <div className="AccountManagementUpdate-form_SDT">
              <label className='AccountManagementUpdate-form_LB'>Số Điện Thoại
                <p className='errorStart'>*</p>
              </label>
              <Input className={errors.SDT ? "errorIp" : 'AccountManagementUpdate-form_Ip'} placeholder='Nhập số Điện Thoại' name='SDT'
                value={UserData.SDT}
                handleChange={handleInputChange}
              />
              {errors.SDT && <p className='errorMessage'>{errors.SDT}</p>}

            </div>
            <div className="AccountManagementUpdate-form_email">
              <label className='AccountManagementUpdate-form_LB'>Email
                <p className='errorStart'>*</p>
              </label>
              <Input className={errors.email ? "errorIp" : 'AccountManagementUpdate-form_Ip'} placeholder='Nhập Email' name='email'
                value={UserData.email}
                handleChange={handleInputChange}
              />
              {errors.email && <p className='errorMessage'>{errors.email}</p>}
            </div>
            <div className="AccountManagementUpdate-form_Role"></div>
            <div className="AccountManagementUpdate-form_userName">
              <label className='AccountManagementUpdate-form_LB'>Tên Đăng Nhập
                <p className='errorStart'>*</p>
              </label>
              <Input className={errors.UserName ? "errorIp" : 'AccountManagementUpdate-form_Ip'} placeholder='Nhập Tên Đăng Nhập' name='UserName'
                value={UserData.UserName}
                handleChange={handleInputChange}
              />
              {errors.UserName && <p className='errorMessage'>{errors.UserName}</p>}

            </div>
            <div className="AccountManagementUpdate-form_password">
              <label htmlFor="NewPassword" className='AccountManagementUpdate-form_LB'>Mật khẩu
                <p className='errorStart'>*</p>
              </label>
              <Input type={showpass ? 'text' : 'password'} className={errors.password ? "errorIp" : 'AccountManagementUpdate-form_Ip'} name='password' id='password' placeholder='Mật Khẩu'
                handleChange={handleInputChange}
                value={UserData.password}
              ></Input>
              {errors.password && <p className='errorMessage'>{errors.password}</p>}
              <div className="show" onClick={togglePassword}>
                {
                  showpass ? <i className={`fa-regular fa-eye`} /> :
                    <i className="fa-regular fa-eye-slash"></i>
                }
              </div>
            </div>
            <div className="AccountManagementUpdate-form_password1">
              <label htmlFor="NewPassword" className='AccountManagementUpdate-form_LB'>Nhập lại mật khẩu
                <p className='errorStart'>*</p>
              </label>
              <Input type={showpass ? 'text' : 'password'} className={errors.password ? "errorIp" : 'AccountManagementUpdate-form_Ip'} name='reviewPassword' id='reviewPassword' placeholder='Mật Khẩu'
                handleChange={handleInputChange}
                value={UserData.password}
              ></Input>
              {errors.password && <p className='errorMessage'>{errors.password}</p>}

              <div className="show" onClick={togglePassword}>
                {
                  showpass ? <i className={`fa-regular fa-eye`} /> :
                    <i className="fa-regular fa-eye-slash"></i>
                }
              </div>
            </div>
            <div className="AccountManagementUpdate-form_Action"></div>
            <Button className='btnform-exit' onclick={() => navigate("/AccountManagement")}>Hủy Bỏ</Button>
            <Button type='submit' className='btnform-add'>Thêm</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AccountManagementAdd;
