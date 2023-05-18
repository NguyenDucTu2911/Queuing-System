import React, { useEffect, useState } from 'react';
import Navbar from '../../components/container/nav/navbar';
import "./device.scss"
import Header from '../../components/container/Header/Header';
import { Input } from '../../components/container/Input/Input';
import Dropdown from '../../components/container/dropdown/Dropdown';
import { addReport, fetchDevice } from '../../redux/Slices/deviceSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

interface DeviceProps { }

const Device: React.FC<DeviceProps> = (props) => {

    const dispatch = useAppDispatch()
    const device = useAppSelector((state: RootState) => state.device.Device)
    const handleSelect = (value: string) => {

    }

    useEffect(() => {
        addReport(device)
        dispatch(fetchDevice())
    }, [])

    const options = [
        { value: 'N', label: 'Tất Cả' },
        { value: 'T', label: 'Đang Hoạt Động' },
        { value: 'TT', label: 'Ngưng Hoạt Động' },
    ];

    return (
        <>
            <div className="devices">
                <Navbar />
                <Header />
                <b className="title">
                    Quản lý dịch vụ
                </b>
                <div className="devices-action">
                    <label htmlFor="action">Trạng Thái Hoạt động</label>
                    <Dropdown options={options} onSelect={handleSelect} />
                </div>
                <div className="device-Time">
                    <label htmlFor="Time">Trạng Thái Kết nối</label>
                    <Dropdown options={options} onSelect={handleSelect} />
                </div>
                <div className="device-search">
                    <label htmlFor="search">Từ Khóa</label>
                    <Input name='search' className='search-item'></Input>
                    <div className="btn-search">
                        <i className="fa-solid fa-magnifying-glass search-icon" style={{ color: "#FF7506" }}></i>
                    </div>
                </div>

                <table className="Table">
                    <tr className='Table-title'>
                        <th>Mã Thiết Bị</th>
                        <th>Tên Thiết Bị</th>
                        <th>Địa chỉ Ip</th>
                        <th>Trạng Thái Hoạt Động</th>
                        <th>Trạng Thái Kết Nối</th>
                        <th>Dịch Vụ Sủ Dụng</th>
                        <th></th>
                        <th></th>
                    </tr>

                    {device.concat(device).concat(device).concat(device).concat(device).map((item, index) => {
                        return (
                            <tr>
                                <td key={index}>{item.MaID}</td>
                                <td>{item.Name}</td>
                                <td>{item.Active}</td>
                                <td>{item.Address}</td>
                                <td>{item.Connect}</td>
                                <td>{item.Sevice}</td>
                                <td><a href=''>Chi Tiết</a></td>
                                <td><a href=''>Cập Nhật</a></td>
                            </tr>

                        )
                    })}

                </table>
            </div>
        </>
    );
};

export default Device;
