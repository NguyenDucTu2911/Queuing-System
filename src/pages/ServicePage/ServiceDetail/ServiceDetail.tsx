import React, { useEffect, useState } from 'react';
import Header from '../../../components/container/header/Header';
import Navbar from '../../../components/container/nav/navbar';
import { Input } from '../../../components/container/Input/Input';
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks';
import { RootState } from '../../../redux/Store';
import { useParams, useNavigate, useActionData } from 'react-router-dom';
import { Services } from '../../../redux/slices/ServiceSlice';
import "./ServiceDetail.scss"
import useSessionStorage from '../../../components/customHook/useSessionStorage';
import { Progressions, fetchProgressionsId } from '../../../redux/slices/ProgressionSlice';


interface ServiceDetailProps { }

const ServiceDetail: React.FC<ServiceDetailProps> = (props) => {

    const DetailDataSelector = useAppSelector((state: RootState) => state.service.Service)
    const [DetailData, setDetailData] = useSessionStorage<Partial<Services>>("Service", {})
    const Progression = useAppSelector((state: RootState) => state.Progression.Progression)
    const [filteredData, setFilteredData] = useState<Progressions[]>([]);
    const [searchErrorMessage, setSearchErrorMessage] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');

    const { id } = useParams()
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    console.log("check", Progression)
    useEffect(() => {
        fetchData(id)
    }, [id, DetailDataSelector])

    useEffect(() => {
        const MaDV = DetailData.MaDV
        if (MaDV) {
            dispatch(fetchProgressionsId(MaDV))
        }
    }, [DetailData.MaDV])

    const fetchData = (id: any) => {
        const DetailData = DetailDataSelector.find((item) => item.id === id)
        if (DetailData) {
            setDetailData(DetailData as Services)
        }
        return DetailData;
    }

    const changeSelectActive = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        let searchErrorMessage = false;
        let filteredData: Progressions[] = [];
        const validValues = ["Đang chờ", "Đã Sử Dụng", "Bỏ Qua", "ALL"];

        if (validValues.includes(value)) {
            console.log(value)
            filteredData = Progression.filter(item => item?.Active === value);
            searchErrorMessage = filteredData.length === 0 && value !== "ALL";
        }
        console.log(searchErrorMessage)
        setFilteredData(filteredData);
        setSearchErrorMessage(searchErrorMessage);
        setCurrentPage(1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = event.target.value;
        setSearchKeyword(keyword);
        if (keyword.length > 0) {
            const filteredData = Progression.filter((item) =>
                item && item.STT && item.STT.toString().toLowerCase().includes(keyword.toLowerCase())
            );
            setFilteredData(filteredData);
            setCurrentPage(1);
        } else {
            setSearchKeyword('');
            setSearchErrorMessage(false)
            setFilteredData([])
            setCurrentPage(1);
        }
    };

    const handleSearchBtn = () => {
        if (searchKeyword.length > 0) {
            const filteredData = Progression.filter((item) =>
                item && item.STT && item.STT.toString().includes(searchKeyword.toLowerCase())
            );
            if (filteredData.length === 0) {
                setSearchErrorMessage(true)
            } else {
                setSearchErrorMessage(false)
                setFilteredData(filteredData);
                setCurrentPage(1);
            }
        } else {
            setSearchKeyword('');
            setFilteredData([])
            setCurrentPage(1);
        }
    }

    // table
    const itemsPerPage = 5;
    // Tính số lượng trang dựa trên dữ liệu và số lượng dòng mỗi trang
    const totalPages =
        filteredData && filteredData.length > 0
            ? Math.ceil(filteredData.length / itemsPerPage)
            : Math.ceil(Progression.length / itemsPerPage);

    // Lấy dữ liệu của trang hiện tại
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        if (filteredData && filteredData.length >= endIndex) {
            return filteredData.slice(startIndex, endIndex);
        }

        return Progression.slice(startIndex, endIndex);
    };
    // Xử lý sự kiện khi nhấn nút chuyển trang
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Xử lý sự kiện khi nhấn nút quay lại
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    // Xử lý sự kiện khi nhấn nút tiếp theo
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const generatePageNumbers = () => {
        const pageNumbers = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) {
                    pageNumbers.push(i);
                }
            } else if (currentPage >= totalPages - 2) {
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pageNumbers.push(i);
                }
            }
        }

        return pageNumbers;
    };

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
                            <option value="Đang chờ">Đang chờ</option>
                            <option value="Đã Sử Dụng">Đã Sử Dụng</option>
                            <option value="Bỏ Qua">Bỏ Qua</option>
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
                                searchErrorMessage ?
                                    <tbody>
                                        <tr>
                                            <td colSpan={18} style={{ textAlign: "center", fontSize: "24px" }}>Không có Dữ Liệu
                                                <i className="fa-regular fa-calendar-xmark" style={{ color: "#d12e2e", paddingLeft: "5px" }}></i>
                                            </td>
                                        </tr>
                                    </tbody>
                                    :
                                    <tbody>
                                        {getCurrentPageData().map((item: any, index: number) => (
                                            <tr key={index}>
                                                <td>{item.STT}</td>
                                                {item && item.Active === "Đang chờ" ? <td><b className='tickBlue'>.</b>{item.Active}</td>
                                                    : item.Active === "Đã sử dụng" ? <td><b className='tickGray'>.</b> {item.Active}</td> :
                                                        <td><b className='tickRed'>.</b> {item.Active}</td>
                                                }
                                            </tr>
                                        ))}
                                    </tbody>
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
