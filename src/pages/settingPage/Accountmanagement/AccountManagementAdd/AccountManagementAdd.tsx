import React, { useEffect, useState } from 'react';
import { User, fetchPosition, newUser, position } from '../../../../redux/Slices/accountSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import Navbar from '../../../../components/container/nav/navbar';
import Header from '../../../../components/container/Header/Header';
import { Input } from '../../../../components/container/Input/Input';
import { Button } from '../../../../components/container/Button/Button';
import { RootState } from '../../../../redux/store';
import { Select } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';

interface AccountManagementAddProps { }
interface OptionType {
  value: string;
  label: string;
}

const AccountManagementAdd: React.FC<AccountManagementAddProps> = (props) => {
  const [showpass, setShowpass] = useState(false)
  const [UserData, setUserData] = useState<Partial<User>>({})
  const [errors, setErrors] = useState<Partial<User>>({})
  const Position = useAppSelector((state: RootState) => state.account.Account)
  const error = useAppSelector((state: RootState) => state.account.error)
  const [size, setSize] = useState<SizeType>("large");

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  console.log(error)
  // console.log(Position)

  // useEffect(() => {
  //   dispatch(fetchPosition())
  //   let dataSelected = buildData(Position);
  //   setDataPosition({
  //     Name: dataSelected,
  //   });
  // }, [])

  useEffect(() => {
    dispatch(fetchPosition());
    // fetchData();
  }, []);

  useEffect(() => {
    checkData()
  }, [error, navigate]);

  const checkData = () => {
    if (UserData && UserData.Name && UserData.Action && UserData.Role &&
      UserData.SDT && UserData.UserName && UserData.email &&
      UserData.password
    ) {
      if (!error) {
        navigate("/AccountManagement")
      }
    }
  }
  // const fetchData = async () => {
  //   try {
  //     await dispatch(fetchPosition());
  //     Position.map((item) => {
  //       setRole({
  //         value: item.Name,
  //         label: item.Name
  //       });
  //     })

  //   } catch (error) {
  //     // Handle error if needed
  //   }
  // };

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
      }))
      if (!/^\d{10}$/.test(value)) {
        setErrors((prevState) => ({
          ...prevState,
          SDT: 'Số Điện Thoại không hợp lệ',
        }));
      };
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

  const changeSelectActive = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;
    setUserData({
      ...UserData,
      [name]: value
    })

    if (name === "Action") {
      setErrors(prevErrors => ({
        ...prevErrors,
        Action: value.trim() ? "" : 'Vui lòng chọn trạng thái',
      }));
    }
  };


  const isFormValid = (): boolean => {
    const { Name, SDT, email, UserName, password, reviewPassword, Action, Role } = UserData;
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

    if (!Action?.trim()) {
      setErrors((prevState) => ({
        ...prevState,
        Action: 'Vui lòng chọn trạng thái',
      }));
      isValid = false;
    }

    if (!Role) {
      setErrors((prevState) => ({
        ...prevState,
        Role: "Vui lòng chọn vai trò.",
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
    if (isFormValid()) {
      try {
        dispatch(newUser(UserData as User))
        // if (!error) {
        //   navigate("/AccountManagement")
        // }
        console.log("check", error)
      } catch (e) {
        console.log(e)
      }

    } else {
      console.log("Thêm Không Thành Công")
    }
  };

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    setUserData({
      ...UserData,
      Role: value.value
    })
    setErrors({ ...errors, Role: "" });
  };

  // const buildData = (input: any[]): { label: string, value: string }[] => {
  //   let result: { label: string, value: string }[] = [];
  //   if (input && input.length > 0) {
  //     result = input.map((item, index) => {
  //       let object: { label: string, value: string } = {
  //         label: `${item.Name}`,
  //         value: item.Name,
  //       };
  //       return object;
  //     });
  //   }
  //   return result;
  // };

  console.log(UserData)

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
              <Input className={errors.email || error !== null ? "errorIp" : 'AccountManagementUpdate-form_Ip'} placeholder='Nhập Email' name='email'
                value={UserData.email}
                handleChange={handleInputChange}
              />
              {errors.email && <p className='errorMessage'>{errors.email}</p>}
              {error !== undefined && <span className='errorMessage'>{error}</span>}

            </div>
            <div className="AccountManagementUpdate-form_Role">
              <label className='AccountManagementUpdate-form_LB'>Vai trò
                <p className='errorStart'>*</p>
              </label>
              {/* <Input data={position}/> */}
              <Select
                className={errors.Role ? "errorIp" : ''}
                labelInValue
                // defaultValue={{ value: Object.values(Position)[0].Name, label: Object.values(Position)[0].Name }}
                style={{ width: 560 }}
                size={size}
                onChange={handleChange}
                options={Position}
              />
              {errors.Role && <p className='errorMessage'>{errors.Role}</p>}
            </div>

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

            <div className="AccountManagementUpdate-form_Action">
              <label className='AccountManagementUpdate-form_LB' htmlFor="Action">Tình trạng
                <p className='errorStart'>*</p>
              </label>

              <select className={errors.Action ? "errorIp" : 'AccountManagementUpdate-form_Ip'} name='Action' id='Action'
                onChange={changeSelectActive}>
                <option value="">Tất Cả</option>
                <option value="Hoạt Động">Hoạt Động</option>
                <option value="Ngưng Hoạt Động">Ngưng Hoạt Động</option>
              </select>
              {errors.Action && <p className='errorMessage'>{errors.Action}</p>}
            </div>
            <Button className='btnform-exit' onclick={() => navigate("/AccountManagement")}>Hủy Bỏ</Button>
            <Button type='submit' className='btnform-add'>Thêm</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AccountManagementAdd;
