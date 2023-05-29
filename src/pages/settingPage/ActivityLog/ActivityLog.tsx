import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/container/nav/navbar';
import Header from '../../../components/container/Header/Header';
import "./ActivityLog.scss"
import { Input } from '../../../components/container/Input/Input';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { Account, User, ActivityLogs, fetchActivityLog } from '../../../redux/Slices/accountSlice';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
interface ActivityLogProps { }

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';

const ActivityLog: React.FC<ActivityLogProps> = (props) => {
    const navigate = useNavigate()
    const [searchErrorMessage, setSearchErrorMessage] = useState(false)
    const ActivityLogData = useAppSelector((state: RootState) => state.account.Account)
    const [filteredData, setFilteredData] = useState<(Account | User | ActivityLogs)[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [size, setSize] = useState<SizeType>("large");
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchActivityLog())
    }, [])


    const itemsPerPage = 5;
    // Tính số lượng trang dựa trên dữ liệu và số lượng dòng mỗi trang
    const totalPages =
        filteredData && filteredData.length > 0
            ? Math.ceil(filteredData.length / itemsPerPage)
            : Math.ceil(ActivityLogData.length / itemsPerPage);

    // Lấy dữ liệu của trang hiện tại
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        if (filteredData && filteredData.length >= endIndex) {
            return filteredData.slice(startIndex, endIndex);
        }

        return ActivityLogData.slice(startIndex, endIndex);
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
            const filteredData = ActivityLogData.filter((item) =>
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
    }

    const handleSearchBtn = () => {
        if (searchKeyword.length > 0) {
            const filteredData = ActivityLogData.filter((item) =>
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
    return (
        <>
            <div className="ActivityLog">
                <Navbar />
                <Header />
                <div className="ActivityLog-time">
                    <label htmlFor="Time" className='ActivityLog-LB'>Chọn thời gian</label>
                    <div className="ActivityLog-time_date">
                        <RangePicker
                            size={size}
                            defaultValue={[dayjs('2023-09-03', dateFormat), dayjs('2023-11-22', dateFormat)]}
                            disabled={[false, true]}
                        />
                    </div>

                </div>
                <div className="ActivityLog-search">
                    <label htmlFor="search" className='ActivityLog-LB'>Từ Khóa</label>
                    <Input id='search' className='ActivityLog-IP' handleChange={handleSearchChange} />
                    <div className="icon-search" onClick={handleSearchBtn}>
                        <i className="fa-solid fa-magnifying-glass "></i>
                    </div>
                </div>
                <div className="ActivityLog-form">
                    <table className="Table">
                        <thead className='Table-title'>
                            <tr >
                                <th>Tên Đăng Nhập</th>
                                <th >Thời Gian Tác Động</th>
                                <th >IP thực hiện</th>
                                <th >Thao tác thực hiện</th>
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
                                            <td>{item.Name}</td>
                                            <td>{item.Time}</td>
                                            <td>{item.IP}</td>
                                            <td>{item.Active}</td>
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

export default ActivityLog;
