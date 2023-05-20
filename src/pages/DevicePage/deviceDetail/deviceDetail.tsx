import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { AddDevice } from '../../../redux/Slices/deviceSlice';
import "./DeviceDetail.scss"
import Navbar from '../../../components/container/nav/navbar';
import Header from '../../../components/container/Header/Header';
import useLocalStorage from '../../../components/customHook/useLocalStorage';

const DeviceDetail: React.FC = () => {
    const { id } = useParams();
    const data = useAppSelector((state: RootState) => state.device.Device)
    const targetElement = data.find((item) => item.id === id);
    const [device, setdevice] = useLocalStorage<Partial<AddDevice>>("device", {})
    const navigate = useNavigate()

    useEffect(() => {
        if (targetElement) {
            setdevice(targetElement as AddDevice)
        }
    }, [id, data])

    console.log(device)
    return (
        <>
            <div className="DeviceDetail">
                <Header />
                <Navbar />
                <div className="deviceDetail-form">
                    <div className="deviceDetail-textForm">
                        Thông tin thiết bị
                    </div>

                    <div className="deviceDetail-maid">
                        <label className="deviceDetail_lable">
                            loại thiết bị:
                        </label>
                        <b className='deviceDetail-b'>{device?.MaID}</b>
                    </div>

                    <div className="deviceDetail-name">
                        <label className="deviceDetail_lable">
                            Tên thiết bị:
                        </label>
                        <b className='deviceDetail-b'>{device?.Name}</b>
                    </div>

                    <div className="deviceDetail-address">
                        <label className="deviceDetail_lable">
                            Địa Chỉ IP:
                        </label>
                        <b className='deviceDetail-b'>{device?.Address}</b>
                    </div>

                    <div className="deviceDetail-service">
                        <label className="deviceDetail_lable">
                            Dịch Vụ Sử Dụng:
                        </label>
                        <b className='deviceDetail-b_DV'>{device?.Service}</b>
                    </div>

                    <div className="deviceDetail-typeDevice">
                        <label className="deviceDetail_lable">
                            loại thiết bị:
                        </label>
                        <b className='deviceDetail-b'>{device?.TypeDevice}</b>
                    </div>

                    <div className="deviceDetail-userLogin">
                        <label className="deviceDetail_lable">
                            Tên Đăng Nhập:
                        </label>
                        <b className='deviceDetail-b'>{device?.NameLogin}</b>
                    </div>

                    <div className="deviceDetail-pass">
                        <label className="deviceDetail_lable">
                            Mật khẩu
                        </label>
                        <b className='deviceDetail-b'>{device?.pass}</b>
                    </div>

                </div>
                <div className="btn-update" onClick={() => navigate(`/device/Edit/${id}`)}>
                    <i className="fa-solid fa-square-pen btn-icon"></i>
                    <b className='btn-text'>Cập Nhật Thiết Bị</b>
                </div>
            </div>
        </>
    );
};

export default DeviceDetail;
