import React, { useEffect, useState } from 'react';
import Navbar from '../../components/container/nav/navbar';
import "./device.scss"
import Header from '../../components/container/header/Header';
import { Input } from '../../components/container/Input/Input';
import { Devices, fetchDevice } from '../../redux/slices/DeviceSlice';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { RootState } from '../../redux/Store';
import { useNavigate } from 'react-router-dom';




interface DeviceProps {
}

const Device: React.FC<DeviceProps> = (props) => {

    const device = useAppSelector((state: RootState) => state.device.Device)
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredData, setFilteredData] = useState<Devices[]>([]);
    const [searchErrorMessage, setSearchErrorMessage] = useState(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        getCurrentPageData()
        dispatch(fetchDevice())
    }, [])

    const handleAddDevice = () => {
        navigate('/device/add');
    }

    const devicessss = device.concat(device).concat(device).concat(device).concat(device).concat(device).concat(device).concat(device).concat(device)
        .concat(device).concat(device).concat(device).concat(device).concat(device).concat(device).concat(device).concat(device)

    // table
    const itemsPerPage = 5;
    // Tính số lượng trang dựa trên dữ liệu và số lượng dòng mỗi trang
    const totalPages =
        filteredData && filteredData.length > 0
            ? Math.ceil(filteredData.length / itemsPerPage)
            : Math.ceil(devicessss.length / itemsPerPage);

    // Lấy dữ liệu của trang hiện tại
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        if (filteredData && filteredData.length >= endIndex) {
            return filteredData.slice(startIndex, endIndex);
        }

        return devicessss.slice(startIndex, endIndex);
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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = event.target.value;
        setSearchKeyword(keyword);
        if (keyword.length > 0) {
            const filteredData = devicessss.filter((item) =>
                item && item.MaID && item.MaID.toLowerCase().includes(keyword.toLowerCase())
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
            const filteredData = devicessss.filter((item) =>
                item && item.MaID && item.MaID.toLowerCase().includes(searchKeyword.toLowerCase())
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

    const changeSelectActive = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value, name } = event.target;
        let searchErrorMessage = false;
        let filteredData: Devices[] = [];
        if (name === "Active") {
            const validValues = ["Đang Hoạt Động", "Ngưng Hoạt Động", "ALL"];

            if (validValues.includes(value)) {
                filteredData = devicessss.filter(item => item.Active === value);
                searchErrorMessage = filteredData.length === 0 && value !== "ALL";
            }
        } else {
            const validValues = ["Kết Nối", "Mất Kết Nối", "ALL"];

            if (validValues.includes(value)) {
                filteredData = devicessss.filter(item => item.Connect === value);
                searchErrorMessage = filteredData.length === 0 && value !== "ALL";
            }
        }
        console.log(searchErrorMessage)

        setFilteredData(filteredData);
        setSearchErrorMessage(searchErrorMessage);
        setCurrentPage(1);
    };

    return (
        <>
            <div className="devices">
                <Navbar />
                <Header />
                <b className="title">
                    Danh sách thiết bị
                </b>
                <div className="device-add" onClick={handleAddDevice}>
                    <i className="fa-solid fa-plus icon-add"></i>
                    <b className='textAdd'>Thêm Thiết Bị</b>

                </div>
                <div className="devices-action">
                    <label className='devices-lb' htmlFor="Active">Trạng Thái Hoạt động</label>
                    {/* <Dropdown options={options} onSelect={handleSelect} /> */}
                    <select className='devices-ip' name='Active' id='Active' placeholder='chọn toại thiết bị'
                        onChange={changeSelectActive}>
                        <option value="ALL">Tất Cả</option>
                        <option value="Đang Hoạt Động">Đang Hoạt Động </option>
                        <option value="Ngưng Hoạt Động">Ngưng Hoạt Động</option>
                    </select>
                </div>
                <div className="device-Time">
                    <label htmlFor="Connect">Trạng Thái Kết nối</label>
                    {/* <Dropdown options={options} onSelect={handleSelect} /> */}
                    <select className='devices-ip' name='Connect' id='Connect' placeholder='chọn toại thiết bị'
                        onChange={changeSelectActive}>
                        <option value="ALL">Tất Cả</option>
                        <option value="Kết Nối">Kết Nối </option>
                        <option value="Mất Kết Nối">Mất Kết Nối</option>
                    </select>
                </div>
                <div className="device-search">
                    <label htmlFor="search">Từ Khóa</label>
                    <Input name='search' className='search-item' handleChange={handleSearchChange} placeholder='Tìm Kiếm'></Input>
                    <div className="btn-search" onClick={handleSearchBtn}>
                        <i className="fa-solid fa-magnifying-glass search-icon" style={{ color: "#FF7506" }}></i>
                    </div>
                </div>
                <table className="Table">
                    <thead className='Table-title'>
                        <tr >
                            <th>Mã Thiết Bị</th>
                            <th >Tên Thiết Bị</th>
                            <th >Địa chỉ Ip</th>
                            <th >Trạng Thái Hoạt Động</th>
                            <th >Trạng Thái Kết Nối</th>
                            <th >Dịch Vụ Sủ Dụng</th>
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
                                        <td>{item.MaID}</td>
                                        <td>{item.Name}</td>
                                        <td>{item.Address}</td>
                                        {item && item.Active === "Đang Hoạt Động" ? <td><b className='tickGreen'>.</b>{item.Active}</td>
                                            : <td><b className='tickRed'>.</b> {item.Active}</td>}
                                        {item && item.Connect === "Kết Nối" ? <td><b className='tickGreen'>.</b>{item.Connect}</td>
                                            : <td><b className='tickRed'>.</b> {item.Connect}</td>}
                                        <td>{item.Service ? item.Service.join(", ") : ""}</td>
                                        <td><a onClick={() => navigate(`/device/${item.id}`)}>Chi Tiết</a></td>
                                        <td><a onClick={() => navigate(`/device/Edit/${item.id}`)} >Cập Nhật</a></td>
                                    </tr>
                                ))}
                            </tbody>
                    }


                </table>
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

export default Device;
