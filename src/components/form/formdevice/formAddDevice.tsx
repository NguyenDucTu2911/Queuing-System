import React, { useEffect, useState } from 'react';
import "./FormAddDevice.scss"
import { Input } from '../../container/Input/Input';
import Header from '../../container/Header/Header';
import Navbar from '../../container/nav/navbar';
import { Button } from '../../container/Button/Button';
import { useNavigate } from 'react-router-dom';
import { AddDevices, AddDevice } from '../../../redux/Slices/deviceSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
interface FormAddDeviceProps { }
const FormAddDevice: React.FC<FormAddDeviceProps> = (props) => {

    const [formData, setFormData] = useState<Partial<AddDevice>>({});
    const [formErrors, setFormErrors] = useState<Partial<AddDevice>>({});

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const error = useAppSelector((state: RootState) => state.device.error)
    console.log("check", error)

    useEffect(() => {
        checkData()
    }, [error, navigate]);

    const checkData = () => {
        if (formData.MaID && formData.Name && formData.Address && formData.Service
            && formData.TypeDevice && formData.NameLogin && formData.pass) {
            if (!error) {
                navigate("/device")
            }
        }
    }

    // onchange form
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const errors: Partial<AddDevice> = {};

        switch (name) {
            case "idMa":
                errors.MaID = value.length < 5 ? "Mã Thiết bị ít nhất 5 ký tự" : undefined;
                break;
            case "name":
                errors.Name = value.length < 5 ? "Tên ít nhất 5 ký tự" : undefined;
                break;
            case "address":
                errors.Address = value.length < 5 ? "Vui lòng nhập lại ip" : undefined;
                break;
            case "service":
                errors.Service = value.length < 1 ? ["Nhập dịch vụ"] : undefined;
                break;
            case "TypeDevice":
                errors.TypeDevice = !value ? "Chọn thiết bị" : undefined;
                break;
            case "nameLogin":
                errors.NameLogin =
                    value.length < 7 ? "Tên Đăng NHập ít nhất 7 ký tự" : undefined;
                break;
            case "password":
                errors.pass =
                    value.length < 8 ? "Mật khẩu phải có ít nhất 8 ký tự" : undefined;
                break;
            default:
                break;
        }

        setFormErrors(errors);

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const changeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setFormData({
            ...formData,
            TypeDevice: value,
            Active: "Đang Hoạt Động",
            Connect: "Kết Nối"
        })
    }

    // submit form 
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors: Partial<AddDevice> = {};

        if (!formData.MaID) {
            errors.MaID = "Bạn chưa nhập mã Thiết bị";
        }
        if (!formData.Name) {
            errors.Name = "Bạn chưa nhập tên Thiết bị";
        }
        if (!formData.Address) {
            errors.Address = "Bạn chưa nhập Địa Chỉ IP";
        }
        if (!formData.Service) {
            errors.Service = ["Bạn chưa nhập dịch vụ"];
        }
        if (!formData.TypeDevice) {
            errors.TypeDevice = "Bạn chưa chọn gói";
        }
        if (!formData.NameLogin) {
            errors.NameLogin = "Bạn chưa nhập tên Đăng Nhập";
        }
        if (!formData.pass) {
            errors.pass = "Bạn chưa nhập Mật khẩu";
        }

        setFormErrors(errors);

        if (!errors.MaID && !errors.Name && !errors.Address && !errors.Service
            && !errors.TypeDevice && !errors.NameLogin && !errors.pass) {
            try {
                console.log(formData)
                dispatch(AddDevices(formData as AddDevice))
                // navigate("/device")
            } catch (error) {
                console.log(error)
            }

        } else {
            console.log("lỗi")
        }

    }

    const handleInputChangeArray = (service: string[]) => {
        setFormData((prevDevice) => ({
            ...prevDevice,
            Service: service,
        }));
    };

    return (
        <>
            <div className="FormAddDevice">
                <Header />
                <Navbar />
                <div className="FormAddDevice-title">Quản lý thiết bị</div>
                <div className="FormAddDevice-form">
                    <div className="Form-title">Thông tin thiết bị</div>
                    <form onSubmit={handleSubmit}>
                        <div className="FormAddDevice-ma">
                            <label className='FormAddDevice-Lb' htmlFor="MaID">Mã Thiết bị:<span style={{ color: "red", paddingLeft: "1px" }}>*</span></label>
                            <Input className={formErrors.MaID ? "input-error" : 'FormAddDevice-ip'} name='MaID' id='MaID' placeholder='Nhập Mã Thiết Bị'
                                handleChange={handleInputChange} />
                            {formErrors.MaID && <span className='textError'>{formErrors.MaID}</span>}
                        </div>
                        <div className="FormAddDevice-name">
                            <label className='FormAddDevice-Lb' htmlFor="Name">Tên Thiết bị:<span style={{ color: "red", paddingLeft: "1px" }}>*</span></label>
                            <Input className={formErrors.Name ? "input-error" : 'FormAddDevice-ip'} name='Name' id='Name' placeholder='Nhập Tên Thiết Bị'
                                handleChange={handleInputChange} />
                            {formErrors.Name && <span className='textError'>{formErrors.Name}</span>}

                        </div>
                        <div className="FormAddDevice-address">
                            <label className='FormAddDevice-Lb' htmlFor="Address">Địa Chỉ Ip:<span style={{ color: "red", paddingLeft: "1px" }}>*</span></label>
                            <Input className={formErrors.Address ? "input-error" : 'FormAddDevice-ip'} name='Address' id='Address' placeholder='Nhập Địa Chỉ IP'
                                handleChange={handleInputChange} />
                            {formErrors.Address && <span className='textError'>{formErrors.Address}</span>}

                        </div>

                        <div className="FormAddDevice-service">
                            <label className='FormAddDevice-Lb' htmlFor="Service">Dịch vụ sử dụng:<span style={{ color: "red", paddingLeft: "1px" }}>*</span></label>
                            <Input className={formErrors.Service ? "input-error-dv" : 'FormAddDevice-ip_DV'} name='Service' id='Service' placeholder='Nhập Dịch Vụ Sử dụng'
                                handleChange={(e) => {
                                    const inputArray: string[] = e.target.value.split(",").map((value) => value.trim());
                                    handleInputChangeArray(inputArray);
                                }} />

                            {formErrors.Service && <span className='textError'>{formErrors.Service}</span>}

                        </div>
                        <div className="FormAddDevice-type">
                            <label className='FormAddDevice-Lb' htmlFor="TypeDevice">Loại Thiết Bị:<span style={{ color: "red", paddingLeft: "1px" }}>*</span></label>
                            <select className={formErrors.TypeDevice ? "input-error" : 'FormAddDevice-ip'} name='TypeDevice' id='TypeDevice' placeholder='chọn toại thiết bị'
                                onChange={changeSelect}>
                                <option value="">---vui lòng chọn gói---</option>
                                <option value="kiosk">Kiosk </option>
                                <option value="DisplayCounter">Display counter</option>
                            </select>
                            {formErrors.TypeDevice && <span className='textError'>{formErrors.TypeDevice}</span>}

                        </div>
                        <div className="FormAddDevice-NameLogin">
                            <label className='FormAddDevice-Lb' htmlFor="NameLogin">Tên Đăng Nhập:<span style={{ color: "red", paddingLeft: "1px" }}>*</span></label>
                            <Input className={formErrors.NameLogin || error !== null ? "input-error" : 'FormAddDevice-ip'} name='NameLogin' id='NameLogin' placeholder='Nhập Tên Đăng Nhập'
                                handleChange={handleInputChange} />
                            {formErrors.NameLogin && <span className='textError'>{formErrors.NameLogin}</span>}
                            {error !== undefined && <span className='textError'>{error}</span>}

                        </div>
                        <div className="FormAddDevice-pass">
                            <label className='FormAddDevice-Lb' htmlFor="pass">Mật khẩu:<span style={{ color: "red", paddingLeft: "1px" }}>*</span></label>
                            <Input className={formErrors.pass ? "input-error" : 'FormAddDevice-ip'} name='pass' id='pass' placeholder='Nhập Mật Khẩu'
                                handleChange={handleInputChange} />
                            {formErrors.pass && <span className='textError'>{formErrors.pass}</span>}
                        </div>
                        <Button className='btn-exit' onclick={() => navigate("/device")}>Hủy Bỏ</Button>
                        <Button type='submit' className='btn-add'>Thêm thiết bị</Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default FormAddDevice;
