import React, { useEffect, useState } from 'react';
import "./DeviceEdit.scss"

import Navbar from '../../../components/container/nav/navbar';
import Header from '../../../components/container/Header/Header';
import { Input } from '../../../components/container/Input/Input';
import { Button } from '../../../components/container/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import useLocalStorage from '../../../components/customHook/useLocalStorage';
import { AddDevice, UpdateDevices } from '../../../redux/Slices/deviceSlice';

interface DeviceEditProps { }

const DeviceEdit: React.FC<DeviceEditProps> = (props) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { id } = useParams();
    const data = useAppSelector((state: RootState) => state.device.Device)
    const targetElement = data.find((item) => item.id === id);
    const [device, setdevice] = useLocalStorage<Partial<AddDevice>>("device", {})
    const [formErrors, setFormErrors] = useState<Partial<AddDevice>>({});

    console.log(device)
    useEffect(() => {
        if (targetElement) {
            setdevice(targetElement as AddDevice)
        }
    }, [id, data])

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
                errors.Service = value.length < 1 ? "Nhập dịch vụ" : undefined;
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

        setdevice({
            ...device,
            [name]: value
        });
    };

    const options = [
        { value: '', label: '---Gói Của Bạn---' },
        { value: "kiosk", label: 'kiosk' },
        { value: 'DisplayCounter', label: 'DisplayCounter' },
    ];

    const changeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setdevice({ ...device, TypeDevice: value })
    }

    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors: Partial<AddDevice> = {};

        if (!device.MaID) {
            errors.MaID = "Bạn chưa nhập mã Thiết bị";
        }
        if (!device.Name) {
            errors.Name = "Bạn chưa nhập tên Thiết bị";
        }
        if (!device.Address) {
            errors.Address = "Bạn chưa nhập Địa Chỉ IP";
        }
        if (!device.Service) {
            errors.Service = "Bạn chưa nhập dịch vụ";
        }
        if (!device.TypeDevice) {
            errors.TypeDevice = "Bạn chưa chọn gói";
        }
        if (!device.NameLogin) {
            errors.NameLogin = "Bạn chưa nhập tên Đăng Nhập";
        }
        if (!device.pass) {
            errors.pass = "Bạn chưa nhập Mật khẩu";
        }

        setFormErrors(errors);

        if (!errors.MaID && !errors.Name && !errors.Address && !errors.Service
            && !errors.TypeDevice && !errors.NameLogin && !errors.pass) {
            try {
                dispatch(UpdateDevices(device as AddDevice))
                navigate("/device")
            } catch (error) {
                console.log(error)
            }

        } else {
            console.log("lỗi")
        }

    }

    return (
        <>
            <div className="DeviceEdit">
                <Header />
                <Navbar />
                <div className="DeviceEdit-title">Quản lý thiết bị</div>
                <div className="DeviceEdit-form">
                    <div className="DeviceEdit-text">Thông tin thiết bị</div>
                    <form onSubmit={handleUpdate}>
                        <div className="DeviceEdit-maid">
                            <label className='DeviceEdit-Lb' htmlFor="MaID">Mã Thiết bị:<span style={{ color: "red", paddingLeft: "1px" }}>*</span></label>
                            <Input className={formErrors.MaID ? "input-error" : 'DeviceEdit-ip'} name='MaID' id='MaID' placeholder='Nhập Mã Thiết Bị'
                                value={device.MaID} handleChange={handleInputChange} />
                        </div>

                        <div className="DeviceEdit-name">
                            <label className='DeviceEdit-Lb' htmlFor="Name">Tên Thiết bị:<span style={{ color: "red", paddingLeft: "1px" }}>*</span></label>
                            <Input className={formErrors.Name ? "input-error" : 'DeviceEdit-ip'} name='Name' id='Name' placeholder='Nhập Tên Thiết Bị'
                                value={device.Name} handleChange={handleInputChange} />
                        </div>
                        <div className="DeviceEdit-address">
                            <label className='DeviceEdit-Lb' htmlFor="Address">Địa Chỉ Ip:<span style={{ color: "red", paddingLeft: "1px" }}>*</span></label>
                            <Input className={formErrors.Address ? "input-error" : 'DeviceEdit-ip'} name='Address' id='Address' placeholder='Nhập Địa Chỉ IP'
                                value={device.Address} handleChange={handleInputChange} />
                        </div>
                        <div className="DeviceEdit-service">
                            <label className='DeviceEdit-Lb' htmlFor="Service">Dịch vụ sử dụng:<span style={{ color: "red", paddingLeft: "1px" }}>*</span></label>
                            <Input className={formErrors.Service ? "input-error-dv" : 'DeviceEdit-ip_DV'} name='Service' id='Service' placeholder='Nhập Dịch Vụ Sử dụng'
                                value={device.Service} handleChange={handleInputChange} />
                        </div>
                        <div className="DeviceEdit-type">
                            <label className='DeviceEdit-Lb' htmlFor="TypeDevice">Loại Thiết Bị:<span style={{ color: "red", paddingLeft: "1px" }}>*</span></label>
                            <select className='DeviceEdit-ip' name='TypeDevice' id='TypeDevice' placeholder='chọn toại thiết bị'
                                value={device.TypeDevice} key={device.TypeDevice} onChange={changeSelect}>
                                <option value="">---vui lòng chọn gói---</option>
                                <option value="kiosk">Kiosk </option>
                                <option value="DisplayCounter">Display counter</option>
                            </select>
                        </div>
                        <div className="DeviceEdit-namelogin">
                            <label className='DeviceEdit-Lb' htmlFor="NameLogin">Tên Đăng Nhập:<span style={{ color: "red", paddingLeft: "1px" }}>*</span></label>
                            <Input className={formErrors.NameLogin ? "input-error" : 'DeviceEdit-ip'} name='NameLogin' id='NameLogin' placeholder='Nhập Tên Đăng Nhập'
                                value={device.NameLogin} handleChange={handleInputChange} />
                        </div>
                        <div className="DeviceEdit-pass">
                            <label className='DeviceEdit-Lb' htmlFor="pass">Mật khẩu:<span style={{ color: "red", paddingLeft: "1px" }}>*</span></label>
                            <Input className={formErrors.pass ? "input-error" : 'DeviceEdit-ip'} name='pass' id='pass' placeholder='Nhập Mật Khẩu'
                                value={device.pass} handleChange={handleInputChange} />
                        </div>
                        <Button className='btn-closes' onclick={() => navigate("/device")}>Hủy Bỏ</Button>
                        <Button type='submit' className='btn-update'>Cập Nhật</Button>
                    </form>
                </div>
            </div>

        </>
    );
};

export default DeviceEdit;
