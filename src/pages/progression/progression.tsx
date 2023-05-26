import React, { useEffect, useState } from 'react';
import Navbar from '../../components/container/nav/navbar';
import Header from '../../components/container/Header/Header';
import "./Progression.scss"
import { Input } from '../../components/container/Input/Input';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProgressions, Progressions } from '../../redux/Slices/ProgressionSlice';
import { RootState } from '../../redux/store';


const Progression: React.FC = () => {
    const { Progression } = useAppSelector((state: RootState) => state.Progression)
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredData, setFilteredData] = useState<Progressions[]>([]);
    const [searchErrorMessage, setSearchErrorMessage] = useState(false)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(fetchProgressions())
    }, [])

    let data = Progression.concat(Progression).concat(Progression).concat(Progression).concat(Progression)

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


    const handleAddProgression = () => {
        navigate("/Progression/ProgressionAdd")
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = event.target.value;
        setSearchKeyword(keyword);
        if (keyword.length > 0) {
            const filteredData = data.filter((item) =>
                item && item.Name && item.Name.toLowerCase().includes(keyword.toLowerCase())
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
                item && item.Name && item.Name.toLowerCase().includes(searchKeyword.toLowerCase())
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

    const changeSelectDV = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // const value = event.target.value;
        const { value, name } = event.target;
        let searchErrorMessage = false;
        let filteredData: Progressions[] = [];
        console.log(name)

        if (name === "NameDV") {
            const validValues = [
                "Khám sản Phụ khoa",
                "Khám răng hàm mặt",
                "Khám tai mũi họng",
                "Khám Tim Mạch",
                "ALL"
            ];

            if (validValues.includes(value)) {
                filteredData = data.filter(item => item?.NameDV === value);
                searchErrorMessage = filteredData.length === 0 && value !== "ALL";
            }
        } else if (name === "Active") {
            const validValues = ["Đang chờ", "Đã Sử Dụng", "Bỏ Qua", "ALL"];

            if (validValues.includes(value)) {
                filteredData = data.filter(item => item?.Active === value);
                searchErrorMessage = filteredData.length === 0 && value !== "ALL";
            }
        } else if (value === "Kiosk" || value === "Hệ Thống" || value === "ALL") {
            filteredData = data.filter(item => item?.power === value);
            searchErrorMessage = filteredData.length === 0 && value !== "ALL";
        }

        console.log(searchErrorMessage)
        setFilteredData(filteredData);
        setSearchErrorMessage(searchErrorMessage);
        setCurrentPage(1);
    };

    return (
        <>
            <div className="Progression">
                <Header />
                <Navbar />
                <div className="Progression-name">
                    <label className='Progression-LB'>Tên Dịch Vụ</label>
                    <select className='Progression-ip' name='NameDV' id='NameDV' placeholder='chọn toại thiết bị'
                        onChange={changeSelectDV}
                    >
                        <option value="ALL">Tất Cả</option>
                        <option value="Khám sản Phụ khoa">Khám sản - Phụ khoa</option>
                        <option value="Khám răng hàm mặt">Khám răng hàm mặt</option>
                        <option value="Khám tai mũi họng">Khám tai mũi họng</option>
                        <option value="Khám Tim Mạch">Khám Tim Mạch</option>
                    </select>
                </div>
                <div className="Progression-active">
                    <label className='Progression-LB'>Tình Trạng</label>
                    <select className='Progression-ip' name='Active' id='Active' placeholder='chọn toại thiết bị'
                        onChange={changeSelectDV}
                    >
                        <option value="ALL">Tất Cả</option>
                        <option value="Đang chờ">Đang chờ</option>
                        <option value="Đã Sử Dụng">Đã Sử Dụng</option>
                        <option value="Bỏ Qua">Bỏ Qua</option>
                    </select>
                </div>
                <div className="Progression-power">
                    <label className='Progression-LB'>Nguồn Cấp</label>
                    <select className='Progression-ip' name='power' id='power' placeholder='chọn toại thiết bị'
                        onChange={changeSelectDV}
                    >
                        <option value="ALL">Tất Cả</option>
                        <option value="Kiosk">Kiosk</option>
                        <option value="Hệ Thống">Hệ Thống</option>
                    </select>
                </div>
                <div className="Progression-Time">
                    <label className='Progression-LB'>Chọn Thời Gian</label>
                    <Input className='Progression-date-Start Progression-ip' type='date' />
                    <i className="fa-solid fa-caret-right Progression-next"></i>
                    <Input className='Progression-date-end Progression-ip' type='date' />
                </div>
                <div className="Progression-Search">
                    <label className='Progression-LB'>Từ Khóa</label>
                    <Input name='search' className='Progression-item' handleChange={handleSearchChange} placeholder='Nhập Từ Khóa'></Input>
                    <div className="btn-search" onClick={handleSearchBtn}>
                        <i className="fa-solid fa-magnifying-glass search-icon" style={{ color: "#FF7506" }}></i>
                    </div>
                </div>

                <div className="Progression-add"
                    onClick={handleAddProgression}
                >
                    <i className="fa-solid fa-plus icon-add"></i>
                    <b className='textAdd'>Cấp Số Mới</b>

                </div>

                <table className="Table">
                    <thead className='Table-title'>
                        <tr >
                            <th>STT</th>
                            <th >Tên Khách Hàng</th>
                            <th >Tên Dịch Vụ</th>
                            <th >Thời Gian Cấp</th>
                            <th >Hạn Sử Dụng</th>
                            <th >Trạng Thái</th>
                            <th >Nguồn Cấp</th>
                            <th ></th>
                        </tr>
                    </thead>
                    {
                        searchErrorMessage ?
                            <tbody className='table-body'>
                                <tr>
                                    <td colSpan={18} style={{ textAlign: "center", fontSize: "24px" }}>Không có Dữ Liệu
                                        <i className="fa-regular fa-calendar-xmark" style={{ color: "#d12e2e", paddingLeft: "5px" }}></i>
                                    </td>
                                </tr>
                            </tbody>
                            :
                            <tbody className='table-body'>
                                {getCurrentPageData().map((item: any, index: number) => (
                                    <tr key={index}>
                                        <td>{item.STT}</td>
                                        <td>{item.Name}</td>
                                        <td>{item.NameDV}</td>
                                        <td>{item.Time}</td>
                                        <td>{item.HSD}</td>
                                        {item && item.Active === "Đang chờ" ? <td><b className='tickBlue'>.</b>{item.Active}</td>
                                            : item.Active === "Đã sử dụng" ? <td><b className='tickGray'>.</b> {item.Active}</td> :
                                                <td><b className='tickRed'>.</b> {item.Active}</td>
                                        }
                                        <td>{item.power}</td>
                                        <td><a onClick={() => navigate(`/Progression/ProgressionDetail/${item.id}`)}>Chi Tiết</a></td>
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

export default Progression;
