import React, { useEffect, useState } from 'react';
import Header from '../../../components/container/Header/Header';
import Navbar from '../../../components/container/nav/navbar';
import { Input } from '../../../components/container/Input/Input';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { useParams, useNavigate } from 'react-router-dom';
import { Services } from '../../../redux/Slices/serviceSlice';
import "./ServiceDetail.scss"
import useSessionStorage from '../../../components/customHook/useSessionStorage';


interface ServiceDetailProps { }

const ServiceDetail: React.FC<ServiceDetailProps> = (props) => {

    const DetailDataSelector = useAppSelector((state: RootState) => state.service.Service)
    const [DetailData, setDetailData] = useSessionStorage<Partial<Services>>("Service", {})
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(id)
    }, [id, DetailDataSelector])

    const fetchData = (id: any) => {
        const DetailData = DetailDataSelector.find((item) => item.id === id)
        if (DetailData) {
            setDetailData(DetailData as Services)
        }
        return DetailData;
    }

    const changeSelectActive = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        // console.log(value)
        // if (value === "Đang Hoạt Động" || value === "Ngưng Hoạt Động") {
        //     const filteredData = devicessss.filter(
        //         (item) => item && item.Active && item.Active === value
        //     );
        //     setFilteredData(filteredData);
        // } else {
        //     setFilteredData([]);
        // }
        // setCurrentPage(1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = event.target.value;
        // setSearchKeyword(keyword);
        // if (keyword.length > 0) {
        //     const filteredData = data.filter((item) =>
        //         item && item && item.Maid.toLowerCase().includes(keyword.toLowerCase())
        //     );
        //     setFilteredData(filteredData);
        //     setCurrentPage(1);
        // } else {
        //     setSearchKeyword('');
        //     setSearchErrorMessage(false)
        //     setFilteredData([])
        //     setCurrentPage(1);
        // }
    };

    const handleSearchBtn = () => {
        // if (searchKeyword.length > 0) {
        //     const filteredData = data.filter((item) =>
        //         item && item.Maid && item.Maid.toLowerCase().includes(searchKeyword.toLowerCase())
        //     );
        //     if (filteredData.length === 0) {
        //         setSearchErrorMessage(true)
        //     } else {
        //         setSearchErrorMessage(false)
        //         setFilteredData(filteredData);
        //         setCurrentPage(1);
        //     }
        // } else {
        //     setSearchKeyword('');
        //     setFilteredData([])
        //     setCurrentPage(1);
        // }
    }

    return (
        <>
            <div className="ServiceDetail">
                <Header />
                <Navbar />
                <div className="ServiceDetail-title">
                    Quản lý dịch vụ
                </div>
                <div className="ServiceDetail-formLeft">
                    <b className="ServiceDetail-formLeft_title">
                        Thông Tin Dịch Vụ
                    </b>
                    <div className="ServiceDetail-formLef_maid">
                        <p className='ServiceDetail-formLef_lb'>Mã Dịch Vụ:</p>
                        <p className='ServiceDetail-formLef_text'>{DetailData.Maid}</p>

                    </div>
                    <div className="ServiceDetail-formLef_NAME">
                        <p className='ServiceDetail-formLef_lb'>Tên Dịch Vụ:</p>
                        <p className='ServiceDetail-formLef_text'>{DetailData.Name}</p>

                    </div>
                    <div className="ServiceDetail-formLef_Des">
                        <p className='ServiceDetail-formLef_lb'>Mô Tả:</p>
                        <p className='ServiceDetail-formLef_text'>{DetailData.description}</p>
                    </div>
                    <div className="ServiceDetail-formLeft_titleNumber">
                        Quy tắc cấp số
                    </div>
                    <div className="ServiceDetail-formLeft_AutoNumber">
                        <p className='ServiceDetail-formLef_lb'>Tăng tự động:</p>
                        <div className="ServiceDetail-formLeft_item">
                            <Input className='ServiceAdd-numbernext_IP' value={DetailData.increaseStart} disabled />
                            <p>Đến</p>
                            <Input className='ServiceAdd-numbernext_IP' value={DetailData.increaseEnd} disabled />
                        </div>
                    </div>

                    <div className="ServiceDetail-formLeft_Prefix">
                        <p className='ServiceDetail-formLef_lb'>Prefix:</p>
                        <div className="ServiceDetail-formLeft_item">
                            <Input className='ServiceAdd-numbernext_IP' value={DetailData.Prefix} disabled />
                        </div>

                    </div>
                    <div className="ServiceDetail-formLeft_Reset">
                        <p className='ServiceDetail-formLef_lb'>Reset mỗi ngày:</p>
                        <p className='ServiceDetail-formLef_ResetIp'>{DetailData.reset}</p>
                    </div>
                </div>

                <div className="ServiceDetail-form-right">
                    <div className="ServiceDetail-active">
                        <label className='Services-lb' htmlFor='TypeDevice'>Trạng Thái</label>
                        <select className='ServiceDetail-formLeft_IP' name='TypeDevice' id='TypeDevice' placeholder='chọn toại thiết bị'
                            onChange={changeSelectActive}>
                            <option value="ALL">Tất Cả</option>
                            <option value="D">Đã Hoàn Thành</option>
                            <option value="A">Đã Thực Hiện</option>
                            <option value="V">Vắng</option>
                        </select>
                    </div>
                    <div className="ServiceDetail-time">
                        <label className='Services-lb' htmlFor="action">Chọn thời gian</label>
                        <Input className='ServiceDetail-formLeft_timeip' type='date' />
                        <i className="fa-solid fa-caret-right ServiceDetail-next"></i>
                        <Input className='ServiceDetail-formLeft_timeip' type='date' />
                    </div>
                    <div className="ServiceDetail-search">
                        <label className='Services-lb' htmlFor="search">Từ Khóa</label>
                        <Input name='search' className='ServiceDetail-search_item' handleChange={handleSearchChange} placeholder='Tìm Kiếm'></Input>
                        <div className="btn-search" onClick={handleSearchBtn}>
                            <i className="fa-solid fa-magnifying-glass search-icon" style={{ color: "#FF7506" }}></i>
                        </div>
                    </div>

                    <div className="ServiceDetail-table">
                        <table className="Table">
                            <thead className='Table-title'>
                                <tr >
                                    <th>Số Thứ Tự</th>
                                    <th >Trạng Thái</th>
                                </tr>
                            </thead>
                            {
                                // searchErrorMessage ?
                                <tbody>
                                    <tr>
                                        <td colSpan={18} style={{ textAlign: "center", fontSize: "24px" }}>Không có Dữ Liệu
                                            <i className="fa-regular fa-calendar-xmark" style={{ color: "#d12e2e", paddingLeft: "5px" }}></i>
                                        </td>
                                    </tr>
                                </tbody>
                                // :
                                // <tbody>
                                //     {getCurrentPageData().map((item: any, index: number) => (
                                //         <tr key={index}>
                                //             <td>{item.Maid}</td>
                                //             <td>{item.Name}</td>
                                //             <td>{item.description}</td>
                                //             {item && item.Active === "Đang Hoạt Động" ? <td><b className='tickGreen'>.</b>{item.Active}</td>
                                //                 : <td><b className='tickRed'>.</b> {item.Active}</td>}
                                //             <td><a onClick={() => navigate(`/Service/${item.id}`)}>Chi Tiết</a></td>
                                //             <td><a onClick={() => navigate(`/device/Edit/${item.id}`)} >Cập Nhật</a></td>
                                //         </tr>
                                //     ))}
                                // </tbody>
                            }


                        </table>
                    </div>
                </div>

                <div className="ServiceDetail-form_btn">
                    <div className="btn-update" onClick={() => navigate(`/Service/edit/${id}`)}>
                        <i className="fa-regular fa-pen-to-square  btn-iconUpdate"></i>
                        <b className='btn-text'>Cập Nhật Thiết Bị</b>
                    </div>
                    <div className="btn-Back" onClick={() => navigate(`/Service`)}>
                        <i className="fa-solid fa-arrow-rotate-left btn-icon"></i>
                        <b className='btn-text'>Quay Lại</b>
                    </div>
                </div>

            </div>
        </>
    );
};

export default ServiceDetail;
