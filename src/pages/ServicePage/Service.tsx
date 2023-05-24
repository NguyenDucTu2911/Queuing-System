import React, { useEffect, useState } from 'react';
import Navbar from '../../components/container/nav/navbar';
import Header from '../../components/container/Header/Header';
import "./Service.scss"
import { Input } from '../../components/container/Input/Input';
import { useNavigate } from 'react-router-dom';
import { fetchService, Services } from '../../redux/Slices/serviceSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
interface ServiceProps { }

const Service: React.FC<ServiceProps> = (props) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const ServiceData = useAppSelector((state: RootState) => state.service.Service)
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredData, setFilteredData] = useState<Services[]>([]);
    const [searchErrorMessage, setSearchErrorMessage] = useState(false)
    const handleAddDevice = (e: any) => {
        navigate("/Service/Add");
    }

    useEffect(() => {
        dispatch(fetchService())
    }, [])

    //fake data
    const data = ServiceData.concat(ServiceData).concat(ServiceData).concat(ServiceData).concat(ServiceData).concat(ServiceData).concat(ServiceData)
        .concat(ServiceData).concat(ServiceData).concat(ServiceData).concat(ServiceData).concat(ServiceData).concat(ServiceData)

    // table
    const itemsPerPage = 5;
    // Tính số lượng trang dựa trên dữ liệu và số lượng dòng mỗi trang
    const totalPages =
        filteredData && filteredData.length > 0
            ? Math.ceil(filteredData.length / itemsPerPage)
            : Math.ceil(data.length / itemsPerPage);

    // Lấy dữ liệu của trang hiện tại
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        if (filteredData && filteredData.length >= endIndex) {
            return filteredData.slice(startIndex, endIndex);
        }

        return data.slice(startIndex, endIndex);
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

    const changeSelectActive = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        console.log(value)
        if (value === "Đang Hoạt Động" || value === "Ngưng Hoạt Động" || value === "ALL") {
            const filteredData = data.filter(
                (item) => item && item.Active && item.Active === value
            );
            if (filteredData.length !== 0 || value === "ALL") {
                setFilteredData(filteredData);
                setSearchErrorMessage(false)
            } else {
                setSearchErrorMessage(true)
                setFilteredData([]);
            }
        } else {
            setFilteredData([]);
        }
        setCurrentPage(1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = event.target.value;
        setSearchKeyword(keyword);
        if (keyword.length > 0) {
            const filteredData = data.filter((item) =>
                item && item && item.Maid.toLowerCase().includes(keyword.toLowerCase())
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
            const filteredData = data.filter((item) =>
                item && item.Maid && item.Maid.toLowerCase().includes(searchKeyword.toLowerCase())
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
    return (
        <>
            <div className="Services">
                <Header />
                <Navbar />
                <div className="Services-Title">Quản lý dịch vụ</div>
                <div className="Services-add" onClick={handleAddDevice}>
                    <i className="fa-solid fa-plus icon-add"></i>
                    <b className='textAdd'>Thêm dịch vụ</b>
                </div>
                <div className="Services-active">
                    <label className='Services-lb' htmlFor="action">Trạng Thái Hoạt động</label>
                    {/* <Dropdown options={options} onSelect={handleSelect} /> */}
                    <select className='devices-ip' name='TypeDevice' id='TypeDevice' placeholder='chọn toại thiết bị'
                        onChange={changeSelectActive}>
                        <option value="ALL">Tất Cả</option>
                        <option value="Đang Hoạt Động">Hoạt Động </option>
                        <option value="Ngưng Hoạt Động">Ngưng Hoạt Động</option>
                    </select>
                </div>
                <div className="Services-Time">
                    <label className='Services-lb' htmlFor="action">Chọn thời gian</label>
                    <Input className='Services-date-start' type='date' />
                    <i className="fa-solid fa-caret-right Services-next"></i>
                    <Input className='Services-date-end' type='date' />
                </div>
                <div className="Services-search">
                    <label htmlFor="search">Từ Khóa</label>
                    <Input name='search' className='search-item' handleChange={handleSearchChange} placeholder='Tìm Kiếm'></Input>
                    <div className="btn-search" onClick={handleSearchBtn}>
                        <i className="fa-solid fa-magnifying-glass search-icon" style={{ color: "#FF7506" }}></i>
                    </div>
                </div>
                <div className="Services-form">
                    <table className="Table">
                        <thead className='Table-title'>
                            <tr >
                                <th>Mã Dịch Vụ</th>
                                <th >Tên Dịch Vụ</th>
                                <th >Mô Tả</th>
                                <th >Trạng Thái Hoạt Động</th>
                                <th ></th>
                                <th ></th>
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
                                            <td>{item.Maid}</td>
                                            <td>{item.Name}</td>
                                            <td>{item.description}</td>
                                            {item && item.Active === "Đang Hoạt Động" ? <td><b className='tickGreen'>.</b>{item.Active}</td>
                                                : <td><b className='tickRed'>.</b> {item.Active}</td>}
                                            <td><a onClick={() => navigate(`/Service/${item.id}`)}>Chi Tiết</a></td>
                                            <td><a onClick={() => navigate(`/Service/edit/${item.id}`)} >Cập Nhật</a></td>
                                        </tr>
                                    ))}
                                </tbody>
                        }


                    </table>
                </div>
                <div className="nextPage-device">
                    <button className='btn-device-back' onClick={handlePrevPage} disabled={currentPage === 1}>
                        <i className="fa-solid fa-caret-left"></i>
                    </button>
                    <div>
                        {generatePageNumbers().map((pageNumber, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(pageNumber)}
                                className={currentPage === pageNumber ? "active" : "btn-device"}
                                disabled={currentPage === pageNumber}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </div>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}
                        className='btn-device-next'>
                        <i className="fa-solid fa-caret-right"></i>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Service;
